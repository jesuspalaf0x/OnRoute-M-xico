<?php
// bank_data.php - Leer y guardar datos bancarios
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT setting_value FROM holy_settings WHERE setting_key = 'bank_data'");
        $row = $stmt->fetch();
        if ($row) {
            echo $row['setting_value'];
        } else {
            // Default fallback
            $default = [
                "banco" => "BBVA México",
                "titular" => "OnRoute México S.A. de C.V.",
                "clabe" => "012 180 01234567890 1",
                "cuenta" => "0123 4567 89",
                "concepto" => "Holy Bakery — Crédito entregas"
            ];
            echo json_encode($default);
        }
    } catch (Exception $e) {
        $default = [
            "banco" => "BBVA México",
            "titular" => "OnRoute México S.A. de C.V.",
            "clabe" => "012 180 01234567890 1",
            "cuenta" => "0123 4567 89",
            "concepto" => "Holy Bakery — Crédito entregas"
        ];
        echo json_encode($default);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Convert associative array to JSON string to store in DB
    $json_value = json_encode($data);

    try {
        $stmt = $pdo->prepare("INSERT INTO holy_settings (setting_key, setting_value) VALUES ('bank_data', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
        $stmt->execute([$json_value, $json_value]);
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar los datos bancarios", "detalle" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
