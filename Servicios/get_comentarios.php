<?php
/* =============================================
   get_comentarios.php — AutoGas
   Carga reseñas desde BD con cache simple (5 min)
   Mejoras v2:
   - Cache en archivo JSON para evitar hammering
   - Headers de seguridad (nosniff, no-frame)
   - CORS configurable para producción
============================================= */

// ─── Headers ─────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// ─── CORS ────────────────────────────────────────────────────────────────────
$allowed_origins = [
    'http://localhost',
    'http://localhost:80',
    'http://127.0.0.1',
    // TODO: agregar dominio de producción aquí una vez definido
    // 'https://www.autogas.pe',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: http://localhost');
}
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Cache simple (5 minutos) ───────────────────────────────────────────────
$cacheFile = sys_get_temp_dir() . '/autogas_resenas_cache.json';
$cacheTTL = 300; // 5 minutos

if (file_exists($cacheFile)) {
    $cacheTime = filemtime($cacheFile);
    if (time() - $cacheTime < $cacheTTL) {
        echo file_get_contents($cacheFile);
        exit;
    }
}

// ─── Credenciales desde variables de entorno ──────────────────────────────────
$host = getenv('AUTOGAS_DB_HOST') ?: 'localhost';
$db   = getenv('AUTOGAS_DB_NAME') ?: 'autogas_db';
$user = getenv('AUTOGAS_DB_USER') ?: 'root';
$pass = getenv('AUTOGAS_DB_PASS') ?: '';

// ─── Consulta a BD ─────────────────────────────────────────────────────────────
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user, $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Detectar columnas opcionales dinámicamente
    $stmtNombre = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'nombre_publico'");
    $tieneNombre = ($stmtNombre->rowCount() > 0);

    $stmtEstado = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'estado'");
    $tieneEstado = ($stmtEstado->rowCount() > 0);

    // Construir query dinámico
    $sql = "SELECT cc.*, s.nombre as sede, sc.nombre as servicio
            FROM comentarios_clientes cc
            LEFT JOIN sedes s ON cc.sede_id = s.id
            LEFT JOIN servicios_catalogo sc ON cc.servicio_id = sc.id
            WHERE 1=1";

    if ($tieneEstado) {
        $sql .= " AND (cc.estado = 'Aprobado' OR cc.estado IS NULL)";
    }

    $sql .= " ORDER BY cc.fecha DESC LIMIT 50";

    $stmt = $pdo->query($sql);
    $comentarios = $stmt->fetchAll();

    // Formatear respuesta
    $result = [];
    foreach ($comentarios as $row) {
        $item = [
            'nombre'      => $tieneNombre ? ($row['nombre_publico'] ?? 'Anónimo') : 'Anónimo',
            'sede'        => $row['sede'] ?? 'No especificada',
            'servicio'    => $row['servicio'] ?? 'General',
            'calificacion' => (int)($row['calificacion'] ?? 5),
            'comentario'  => $row['comentario'] ?? '',
            'fecha'       => $row['fecha'] ?? date('Y-m-d')
        ];
        $result[] = $item;
    }

    // Guardar en cache
    file_put_contents($cacheFile, json_encode($result));

    echo json_encode($result);

} catch (PDOException $e) {
    http_response_code(500);
    error_log('[AutoGas] get_comentarios error: ' . $e->getMessage());
    echo json_encode([]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('[AutoGas] get_comentarios unexpected: ' . $e->getMessage());
    echo json_encode([]);
}
