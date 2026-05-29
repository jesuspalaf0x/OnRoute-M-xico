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

$short_id = $data['id'] ?? "UBI-" . str_pad(rand(0, 999), 3, "0", STR_PAD_LEFT);
$client_name = $data['client'] ?? "Sin nombre";
$reference = $data['ref'] ?? "—";
$address = $data['addr'] ?? "";
$zone = $data['zone'] ?? "";
$cost = $data['cost'] ?? null;
$km = $data['km'] ?? null;
$eta = $data['eta'] ?? "";
$lat = $data['y'] ?? null;
$lng = $data['x'] ?? null;
$status = $data['status'] ?? "nueva";

try {
    $stmt = $pdo->prepare("INSERT INTO deliveries (short_id, client_name, reference, address, zone, cost, km, eta, lat, lng, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $short_id,
        $client_name,
        $reference,
        $address,
        $zone,
        $cost,
        $km,
        $eta,
        $lat,
        $lng,
        $status
    ]);
    
    echo json_encode(["success" => true, "message" => "Ubicación insertada correctamente", "id" => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al insertar en la base de datos", "detalle" => $e->getMessage()]);
}
?>
