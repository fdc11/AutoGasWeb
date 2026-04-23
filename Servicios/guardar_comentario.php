<?php
// ─── CORS & Headers ───────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');

// Permitir solo el origen propio del sitio (no acceso desde otros dominios)
$allowed_origins = [
    'http://localhost',
    'http://localhost:80',
    'http://127.0.0.1',
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

// ─── Rate limiting por sesión (máx 3 comentarios por hora) ───────────────────
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$ahora = time();
if (!isset($_SESSION['resena_timestamps'])) {
    $_SESSION['resena_timestamps'] = [];
}
// Eliminar registros de hace más de 1 hora
$_SESSION['resena_timestamps'] = array_filter(
    $_SESSION['resena_timestamps'],
    fn($t) => ($ahora - $t) < 3600
);
if (count($_SESSION['resena_timestamps']) >= 3) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Demasiadas reseñas enviadas. Espera un momento antes de intentar de nuevo.']);
    exit;
}

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
$nombre       = trim($input['nombre']);
$sede_nombre  = trim($input['sede']);
$servicio_nom = trim($input['servicio']);
$calificacion = (int) $input['calificacion'];
$comentario   = trim($input['comentario']);

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

if (mb_strlen($comentario) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El comentario es muy corto (mínimo 10 caracteres)']);
    exit;
}

// ─── Sentimiento automático (alimenta al programa de IA) ─────────────────────
if ($calificacion >= 4) {
    $sentimiento = 'positivo';
} elseif ($calificacion === 3) {
    $sentimiento = 'neutro';
} else {
    $sentimiento = 'negativo';
}

// ─── Conexión PDO ─────────────────────────────────────────────────────────────
$host = 'localhost';
$db   = 'autogas_db';
$user = 'root';
$pass = '';

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

    // ─── Resolver sede_id desde el nombre ────────────────────────────────────
    $stmtSede = $pdo->prepare("SELECT id FROM sedes WHERE nombre = ? LIMIT 1");
    $stmtSede->execute([$sede_nombre]);
    $sede = $stmtSede->fetch();

    if (!$sede) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Sede no encontrada: ' . $sede_nombre]);
        exit;
    }

    $sede_id = (int) $sede['id'];

    // ─── Resolver servicio_id desde el nombre (búsqueda parcial) ─────────────
    $stmtServ = $pdo->prepare("
        SELECT id FROM servicios_catalogo
        WHERE activo = 1 AND nombre LIKE ?
        LIMIT 1
    ");
    $stmtServ->execute(['%' . $servicio_nom . '%']);
    $servicio    = $stmtServ->fetch();
    $servicio_id = $servicio ? (int) $servicio['id'] : null;

    // ─── Detectar si la BD ya tiene columna nombre_publico ───────────────────
    // Compatible tanto ANTES como DESPUÉS de ejecutar autogas_fixes.sql
    $stmtCols    = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'nombre_publico'");
    $tieneNombre = ($stmtCols->rowCount() > 0);

    // ─── Insertar comentario ─────────────────────────────────────────────────
    if ($tieneNombre) {
        // Verificar si la tabla tiene columna 'estado'
        $stmtEstado   = $pdo->query("SHOW COLUMNS FROM comentarios_clientes LIKE 'estado'");
        $tieneEstado  = ($stmtEstado->rowCount() > 0);

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
        // Sin columna nombre_publico todavía — sigue funcionando igual
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

    // Registrar timestamp para rate limiting
    $_SESSION['resena_timestamps'][] = time();

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
?>