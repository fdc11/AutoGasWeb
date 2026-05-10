<?php
/* =============================================
   guardar_comentario.php — AutoGas
   Mejoras v2:
   - Credenciales desde variables de entorno
   - Rate limiting por IP en BD (más robusto que sesiones)
   - Límite de longitud máxima en nombre y comentario
   - Headers de seguridad (nosniff, no-frame)
   - Invalida el cache de get_comentarios al insertar
============================================= */

// ─── Headers ─────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');

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
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// ─── Credenciales desde variables de entorno ──────────────────────────────────
$host = getenv('AUTOGAS_DB_HOST') ?: 'localhost';
$db   = getenv('AUTOGAS_DB_NAME') ?: 'autogas_db';
$user = getenv('AUTOGAS_DB_USER') ?: 'root';
$pass = getenv('AUTOGAS_DB_PASS') ?: '';

// ─── Leer y validar JSON ──────────────────────────────────────────────────────
$raw   = file_get_contents('php://input');
$input = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'JSON inválido o vacío']);
    exit;
}

// ─── Campos requeridos ────────────────────────────────────────────────────────
foreach (['nombre', 'sede', 'servicio', 'calificacion', 'comentario'] as $campo) {
    if (!isset($input[$campo]) || $input[$campo] === '' || $input[$campo] === null) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => "Campo requerido faltante: $campo"]);
        exit;
    }
}

// ─── Sanitizar ────────────────────────────────────────────────────────────────
$nombre       = htmlspecialchars(strip_tags(trim($input['nombre'])), ENT_QUOTES, 'UTF-8');
$sede_nombre  = trim($input['sede']);
$servicio_nom = trim($input['servicio']);
$calificacion = (int) $input['calificacion'];
$comentario   = htmlspecialchars(strip_tags(trim($input['comentario'])), ENT_QUOTES, 'UTF-8');

// ─── Validaciones de longitud ─────────────────────────────────────────────────
if ($calificacion < 1 || $calificacion > 5) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'La calificación debe ser entre 1 y 5']);
    exit;
}

if (mb_strlen($nombre) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El nombre es muy corto']);
    exit;
}

if (mb_strlen($nombre) > 120) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El nombre no puede superar 120 caracteres']);
    exit;
}

if (mb_strlen($comentario) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El comentario es muy corto (mínimo 10 caracteres)']);
    exit;
}

if (mb_strlen($comentario) > 1000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El comentario no puede superar 1000 caracteres']);
    exit;
}

// ─── Sentimiento automático ───────────────────────────────────────────────────
if ($calificacion >= 4)     $sentimiento = 'positivo';
elseif ($calificacion === 3) $sentimiento = 'neutro';
else                         $sentimiento = 'negativo';

// ─── IP del cliente ───────────────────────────────────────────────────────────
// Obtener IP real (considerando proxies/CDN)
$ip = $_SERVER['HTTP_CF_CONNECTING_IP']
   ?? $_SERVER['HTTP_X_FORWARDED_FOR']
   ?? $_SERVER['REMOTE_ADDR']
   ?? '0.0.0.0';
// Si hay múltiples IPs (X-Forwarded-For puede ser lista), tomar la primera
$ip = trim(explode(',', $ip)[0]);

// ─── Conexión PDO ─────────────────────────────────────────────────────────────
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

    // ─── Rate limiting por IP en BD (máx 3 reseñas por hora por IP) ──────────
    // Requiere tabla rate_limit_resenas:
    //   CREATE TABLE IF NOT EXISTS rate_limit_resenas (
    //       ip VARCHAR(45) NOT NULL,
    //       creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //       INDEX idx_ip_creado (ip, creado_en)
    //   );
    $stmtRL = $pdo->prepare("
        SELECT COUNT(*) AS total
        FROM rate_limit_resenas
        WHERE ip = ? AND creado_en >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    ");
    $stmtRL->execute([$ip]);
    $rlRow = $stmtRL->fetch();

    if ((int)($rlRow['total'] ?? 0) >= 3) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Demasiadas reseñas enviadas. Espera un momento antes de intentar de nuevo.'
        ]);
        exit;
    }

    // ─── Resolver sede_id ─────────────────────────────────────────────────────
    $stmtSede = $pdo->prepare("SELECT id FROM sedes WHERE nombre = ? LIMIT 1");
    $stmtSede->execute([$sede_nombre]);
    $sede = $stmtSede->fetch();

    if (!$sede) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Sede no encontrada: ' . $sede_nombre]);
        exit;
    }

    $sede_id = (int) $sede['id'];

    // ─── Resolver servicio_id ─────────────────────────────────────────────────
    $stmtServ = $pdo->prepare("
        SELECT id FROM servicios_catalogo
        WHERE activo = 1 AND nombre LIKE ?
        LIMIT 1
    ");
    $stmtServ->execute(['%' . $servicio_nom . '%']);
    $servicio    = $stmtServ->fetch();
    $servicio_id = $servicio ? (int) $servicio['id'] : null;

    // ─── Detectar columnas opcionales ─────────────────────────────────────────
    $stmtCols    = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'nombre_publico'");
    $tieneNombre = ($stmtCols->rowCount() > 0);

    // ─── Insertar comentario ──────────────────────────────────────────────────
    if ($tieneNombre) {
        $stmtEstado  = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'estado'");
        $tieneEstado = ($stmtEstado->rowCount() > 0);

        if ($tieneEstado) {
            $stmtInsert = $pdo->prepare("
                INSERT INTO comentarios_clientes
                    (cliente_id, nombre_publico, sede_id, servicio_id,
                     comentario, calificacion, sentimiento, fuente, fecha, estado)
                VALUES (NULL, ?, ?, ?, ?, ?, ?, 'web', CURDATE(), 'Pendiente')
            ");
        } else {
            $stmtInsert = $pdo->prepare("
                INSERT INTO comentarios_clientes
                    (cliente_id, nombre_publico, sede_id, servicio_id,
                     comentario, calificacion, sentimiento, fuente, fecha)
                VALUES (NULL, ?, ?, ?, ?, ?, ?, 'web', CURDATE())
            ");
        }
        $stmtInsert->execute([
            $nombre, $sede_id, $servicio_id,
            $comentario, $calificacion, $sentimiento
        ]);
    } else {
        $stmtInsert = $pdo->prepare("
            INSERT INTO comentarios_clientes
                (cliente_id, sede_id, servicio_id,
                 comentario, calificacion, sentimiento, fuente, fecha)
            VALUES (NULL, ?, ?, ?, ?, ?, 'web', CURDATE())
        ");
        $stmtInsert->execute([
            $sede_id, $servicio_id,
            $comentario, $calificacion, $sentimiento
        ]);
    }

    $comentarioId = (int) $pdo->lastInsertId();

    // ─── Registrar IP para rate limiting ──────────────────────────────────────
    $pdo->prepare("INSERT INTO rate_limit_resenas (ip) VALUES (?)")->execute([$ip]);

    // ─── Limpiar registros viejos de rate_limit (> 2 horas) — mantenimiento ──
    $pdo->exec("DELETE FROM rate_limit_resenas WHERE creado_en < DATE_SUB(NOW(), INTERVAL 2 HOUR)");

    // ─── Invalidar cache de get_comentarios ───────────────────────────────────
    $cacheFile = sys_get_temp_dir() . '/autogas_resenas_cache.json';
    if (file_exists($cacheFile)) {
        @unlink($cacheFile);
    }

    http_response_code(201);
    echo json_encode([
        'success'     => true,
        'id'          => $comentarioId,
        'sentimiento' => $sentimiento,
        'mensaje'     => '¡Gracias por tu reseña! Tu opinión nos ayuda a mejorar.'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    error_log('[AutoGas] guardar_comentario error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error interno al guardar la reseña']);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('[AutoGas] guardar_comentario unexpected: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error inesperado']);
}