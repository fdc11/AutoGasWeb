<?php
/* =====================================================================
   api/resenas.php — Reseñas de Google de las sedes AutoGas
   ---------------------------------------------------------------------
   Uso:   GET ../api/resenas.php?sede=ica   (ica | lima | huancayo | trujillo)

   - La clave de Google NUNCA llega al navegador: vive en el servidor
     (variable de entorno GOOGLE_PLACES_API_KEY o api/config.local.php).
   - Solo acepta las sedes de la lista: nadie puede usar este archivo
     para consultar otros lugares con tu clave.
   - No guarda reseñas: las políticas de Google Places no permiten
     almacenarlas, por eso se piden en cada visita (Cache-Control: no-store).
   - TOPE DE GASTO: Google no ofrece tope diario para esta API, así que este
     archivo cuenta sus propias consultas (carpeta _uso/) y deja de llamar a
     Google al llegar a LIMITE_DIA o LIMITE_MES. Si no puede llevar la
     cuenta, NO llama (prefiere no mostrar reseñas antes que generar cobros).
   ===================================================================== */
declare(strict_types=1);
date_default_timezone_set('America/Lima'); // el contador diario se reinicia a medianoche de Perú

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/* Sede => ID de lugar en Google (place_id). Para añadir una sede,
   agrega su línea aquí y en SEDES_RESENAS de Inicio/inicio.js. */
const SEDES = [
    'ica'      => 'ChIJ-cH_FMDjEJERt0_WLrs4rQA',
    'lima'     => 'ChIJqxd8OJ_PBZERg-K0zRF7974',
    'huancayo' => 'ChIJ-RKreZmXDpERY0k7XdvJfQc',
    'trujillo' => 'ChIJQ3wZaak9rZERs4gU_sGumN0',
];
const ESTRELLAS_MINIMAS = 4;   // se muestran reseñas de 4 y 5 estrellas
const MAX_RESENAS = 5;         // Google devuelve como máximo 5 por lugar
/* Las reseñas usan la SKU "Place Details Enterprise + Atmosphere":
   1.000 consultas gratis al mes. Con 30/día y 950/mes nunca se pasa del gratis. */
const LIMITE_DIA = 30;
const LIMITE_MES = 950;

function responder(int $codigo, array $datos): void {
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* Acepta solo https:// (o //, que Google usa en las fotos) de dominios esperados */
function urlSegura($url, array $dominios): string {
    if (!is_string($url) || $url === '') return '';
    if (strpos($url, '//') === 0) $url = 'https:' . $url;
    $p = parse_url($url);
    if (!$p || ($p['scheme'] ?? '') !== 'https' || empty($p['host'])) return '';
    foreach ($dominios as $d) {
        if ($p['host'] === $d || substr($p['host'], -strlen('.' . $d)) === '.' . $d) return $url;
    }
    return '';
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    responder(405, ['error' => 'metodo']);
}

$sede = isset($_GET['sede']) ? strtolower((string) $_GET['sede']) : '';
if (!array_key_exists($sede, SEDES)) responder(400, ['error' => 'sede']);

/* ---------- Clave ---------- */
$clave = (string) getenv('GOOGLE_PLACES_API_KEY');
if ($clave === '' && is_file(__DIR__ . '/config.local.php')) {
    $config = require __DIR__ . '/config.local.php';
    $clave = is_array($config) ? (string) ($config['GOOGLE_PLACES_API_KEY'] ?? '') : '';
}
if ($clave === '') responder(200, ['disponible' => false, 'motivo' => 'sin_clave']); // estado esperado: la página muestra los enlaces a Google

/* ---------- Tope de gasto (contador propio, con bloqueo de archivo) ---------- */
function reservarConsulta(): string {
    $dir = __DIR__ . '/_uso';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return 'sin_contador';
    if (!is_file($dir . '/.htaccess')) @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    $fp = @fopen($dir . '/contador.json', 'c+');
    if (!$fp) return 'sin_contador';
    try {
        if (!flock($fp, LOCK_EX)) return 'sin_contador';
        $uso = json_decode((string) stream_get_contents($fp), true) ?: [];
        $hoy = date('Y-m-d'); $mes = date('Y-m');
        if (($uso['mes'] ?? '') !== $mes) $uso = ['mes' => $mes, 'total_mes' => 0];
        if (($uso['dia'] ?? '') !== $hoy) { $uso['dia'] = $hoy; $uso['total_dia'] = 0; }
        if ($uso['total_dia'] >= LIMITE_DIA || $uso['total_mes'] >= LIMITE_MES) return 'tope';
        $uso['total_dia']++; $uso['total_mes']++;
        ftruncate($fp, 0); rewind($fp);
        if (fwrite($fp, json_encode($uso)) === false) return 'sin_contador';
        fflush($fp);
        return 'ok';
    } finally {
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}
$reserva = reservarConsulta();
if ($reserva === 'tope') responder(200, ['disponible' => false, 'motivo' => 'tope']);
if ($reserva !== 'ok') responder(200, ['disponible' => false, 'motivo' => 'sin_contador']);

/* ---------- Petición a Google Places API (New) ---------- */
$base = getenv('AUTOGAS_PLACES_BASE') ?: 'https://places.googleapis.com/v1'; // la variable solo se usa en pruebas
$url = $base . '/places/' . rawurlencode(SEDES[$sede]) . '?languageCode=es&regionCode=PE';
$cabeceras = [
    'X-Goog-Api-Key: ' . $clave,
    'X-Goog-FieldMask: rating,userRatingCount,googleMapsUri,reviews',
    'Accept: application/json',
];

$cuerpo = false; $estado = 0;
if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => $cabeceras,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_TIMEOUT        => 8,
    ]);
    $cuerpo = curl_exec($ch);
    $estado = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $ctx = stream_context_create(['http' => [
        'method' => 'GET', 'header' => implode("\r\n", $cabeceras), 'timeout' => 8, 'ignore_errors' => true,
    ]]);
    $cuerpo = @file_get_contents($url, false, $ctx);
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) $estado = (int) $m[1];
}

if ($cuerpo === false || $estado === 0) responder(502, ['error' => 'sin_conexion']);
$datos = json_decode((string) $cuerpo, true);
if ($estado !== 200 || !is_array($datos)) {
    // 429 de Google = se superó el límite por minuto configurado en Google Cloud
    responder($estado === 429 ? 429 : 502, ['error' => $estado === 429 ? 'limite_google' : 'google', 'estado' => $estado]);
}

/* ---------- Respuesta limpia: solo lo que muestra la página ---------- */
$resenas = [];
foreach (($datos['reviews'] ?? []) as $r) {
    $estrellas = (int) ($r['rating'] ?? 0);
    $texto = trim((string) ($r['text']['text'] ?? ''));
    if ($estrellas < ESTRELLAS_MINIMAS || $texto === '') continue;
    $autor = $r['authorAttribution'] ?? [];
    $idiomaTexto = (string) ($r['text']['languageCode'] ?? '');
    $idiomaOriginal = (string) ($r['originalText']['languageCode'] ?? $idiomaTexto);
    $resenas[] = [
        'autor'     => mb_substr(trim((string) ($autor['displayName'] ?? 'Cliente de Google')), 0, 80),
        'autorUrl'  => urlSegura($autor['uri'] ?? '', ['google.com']),
        'foto'      => urlSegura($autor['photoUri'] ?? '', ['googleusercontent.com']),
        'estrellas' => $estrellas,
        'texto'     => mb_substr($texto, 0, 1200),
        'traducida' => $idiomaOriginal !== '' && $idiomaTexto !== '' && $idiomaOriginal !== $idiomaTexto,
        'hace'      => (string) ($r['relativePublishTimeDescription'] ?? ''),
        'url'       => urlSegura($r['googleMapsUri'] ?? '', ['google.com']),
    ];
    if (count($resenas) >= MAX_RESENAS) break;
}

responder(200, [
    'disponible'=> true,
    'sede'      => $sede,
    'puntaje'   => isset($datos['rating']) ? round((float) $datos['rating'], 1) : null,
    'total'     => isset($datos['userRatingCount']) ? (int) $datos['userRatingCount'] : null,
    'mapsUrl'   => urlSegura($datos['googleMapsUri'] ?? '', ['google.com']),
    'resenarUrl'=> 'https://search.google.com/local/writereview?placeid=' . rawurlencode(SEDES[$sede]),
    'resenas'   => $resenas,
]);
