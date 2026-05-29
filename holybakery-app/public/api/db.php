<?php
// db.php - Conexión a MySQL PDO
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost'; // Normalmente localhost en cPanel
$dbname = 'TU_BASE_DE_DATOS'; // REEMPLAZAR
$username = 'TU_USUARIO'; // REEMPLAZAR
$password = 'TU_CONTRASEÑA'; // REEMPLAZAR

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configurar PDO para que lance excepciones en errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos", "detalle" => $e->getMessage()]);
    exit();
}
?>
