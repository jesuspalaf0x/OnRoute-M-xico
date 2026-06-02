<?php
// exchange_rate.php - Leer y guardar el tipo de cambio
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT setting_value FROM holy_settings WHERE setting_key = 'exchange_rate'");
        $row = $stmt->fetch();
        if ($row) {
            echo json_encode(["rate" => (float)$row['setting_value']]);
        } else {
            // Default fallback
            echo json_encode(["rate" => 17.50]);
        }
    } catch (Exception $e) {
        // En caso de que la tabla aún no exista, retornamos un default
        echo json_encode(["rate" => 17.50]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $rate = isset($data['rate']) ? (float)$data['rate'] : null;

    if (!$rate || $rate <= 0) {
        http_response_code(400);
        echo json_encode(["error" => "Tipo de cambio inválido"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO holy_settings (setting_key, setting_value) VALUES ('exchange_rate', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
        $stmt->execute([$rate, $rate]);
        echo json_encode(["success" => true, "rate" => $rate]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar el tipo de cambio", "detalle" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
