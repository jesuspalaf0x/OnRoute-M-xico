<?php
require_once 'db.php';

header("Content-Type: application/json");

// Obtener datos del body (JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "No se recibieron datos JSON válidos"]);
    exit();
}

$tracking_code = $data['id'] ?? "DLV-" . str_pad(rand(0, 999), 3, "0", STR_PAD_LEFT);
$address = $data['addr'] ?? "";
// Si la tabla no tiene columnas para nombre/referencia, lo concatenamos a la dirección para no perderlo
$client_name = $data['client'] ?? "";
$ref = $data['ref'] ?? "";
$full_address = $address . " | Cliente: " . $client_name . " | Ref: " . $ref;

$cost = $data['cost'] ?? 0;
$lat = $data['y'] ?? null;
$lng = $data['x'] ?? null;
$status = "confirmada"; // según captura
$client_id = 1; // según captura
$scheduled_date = date("Y-m-d H:i:s");

try {
    $stmt = $pdo->prepare("INSERT INTO deliveries (tracking_code, formatted_address, cost, latitude, longitude, status, client_id, scheduled_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $tracking_code,
        $full_address,
        $cost,
        $lat,
        $lng,
        $status,
        $client_id,
        $scheduled_date
    ]);
    
    echo json_encode(["success" => true, "message" => "Ubicación insertada correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al insertar en la base de datos", "detalle" => $e->getMessage()]);
}
?>
