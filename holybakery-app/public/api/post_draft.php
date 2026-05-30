<?php
// post_draft.php - Guardar o actualizar un borrador en la nube
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos inválidos o falta ID del borrador"]);
    exit();
}

$id = $data['id'];
$destination_name = $data['destinationName'] ?? '';
$zone_name = $data['zoneName'] ?? '';
$cost = $data['cost'] ?? 0;
$employee_name = $data['employee_name'] ?? '';
$quote_data = isset($data['quoteData']) ? json_encode($data['quoteData']) : json_encode([]);
$created_at = $data['created_at'] ?? date('Y-m-d H:i:s');

try {
    // Upsert (INSERT or UPDATE si ya existe)
    $stmt = $pdo->prepare("
        INSERT INTO holy_savings (draft_id, destination_name, zone_name, cost, employee_name, quote_data, created_at)
        VALUES (:id, :dest, :zone, :cost, :emp, :qdata, :created)
        ON DUPLICATE KEY UPDATE 
            destination_name = VALUES(destination_name),
            zone_name = VALUES(zone_name),
            cost = VALUES(cost),
            employee_name = VALUES(employee_name),
            quote_data = VALUES(quote_data)
    ");

    $stmt->execute([
        ':id' => $id,
        ':dest' => $destination_name,
        ':zone' => $zone_name,
        ':cost' => $cost,
        ':emp' => $employee_name,
        ':qdata' => $quote_data,
        ':created' => $created_at
    ]);

    echo json_encode(["status" => "success", "message" => "Borrador guardado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar el borrador", "detalle" => $e->getMessage()]);
}
?>
