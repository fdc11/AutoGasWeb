<?php
/* =============================================
   get_comentarios.php — AutoGas
   Devuelve reseñas verificadas desde la BD
   para mostrar en servicios.html
============================================= */

header('Content-Type: application/json; charset=utf-8');

// Restricción de origen
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

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$host = 'localhost';
$db   = 'autogas_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8",
        $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Solo reseñas positivas/neutras con calificación >= 4
    // Mostramos nombre_publico si es visita web,
    // o nombre del cliente registrado si tiene cliente_id
    $stmt = $pdo->query("
        SELECT
            cc.id,
            COALESCE(
                cc.nombre_publico,
                CONCAT(c.nombres, ' ', SUBSTRING(c.apellidos, 1, 1), '.')
            )                        AS nombre,
            s.nombre                 AS sede,
            sc.nombre                AS servicio,
            cc.calificacion,
            cc.sentimiento,
            cc.comentario,
            cc.fecha
        FROM comentarios_clientes cc
        LEFT JOIN clientes         c  ON c.id  = cc.cliente_id
        LEFT JOIN sedes            s  ON s.id  = cc.sede_id
        LEFT JOIN servicios_catalogo sc ON sc.id = cc.servicio_id
        WHERE cc.calificacion >= 4
          AND cc.sentimiento IN ('positivo', 'neutro')
        ORDER BY cc.calificacion DESC, cc.fecha DESC
        LIMIT 20
    ");

    $resenas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Normalizar para el slider
    $resultado = array_map(function($r) {
        return [
            'nombre'      => $r['nombre']     ?? 'Cliente AutoGas',
            'sede'        => $r['sede']        ?? 'AutoGas',
            'servicio'    => $r['servicio']    ?? 'Servicio AutoGas',
            'calificacion'=> (int)($r['calificacion'] ?? 5),
            'sentimiento' => $r['sentimiento'] ?? 'positivo',
            'comentario'  => $r['comentario']  ?? '',
            'fecha'       => $r['fecha']       ?? '',
        ];
    }, $resenas);

    echo json_encode($resultado, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // No exponer detalles internos de la BD al cliente
    error_log('[AutoGas] get_comentarios error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'No se pudieron cargar las reseñas. Intenta más tarde.']);
}