<?php
// post_extra.php - Guardar un nuevo extra y actualizar costo de entrega vinculada
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$delivery_id = isset($data['delivery_id']) ? trim($data['delivery_id']) : null;
$description = $data['description'] ?? '';
$date = $data['date'] ?? date('Y-m-d');
$cost = isset($data['cost']) ? (float)$data['cost'] : 0;

if (empty($description) || $cost <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Descripción y costo (mayor a 0) son obligatorios."]);
    exit();
}

try {
    $pdo->beginTransaction();

    // Guardar el extra en el historial
    $stmt = $pdo->prepare("INSERT INTO holy_extras (delivery_id, description, date, cost) VALUES (?, ?, ?, ?)");
    $stmt->execute([$delivery_id, $description, $date, $cost]);
    $extra_id = $pdo->lastInsertId();

    // Actualizar la entrega original en WordPress
    if (!empty($delivery_id)) {
        // Puede ser "DLV-029" o "29"
        $stmtUpdate = $pdo->prepare("UPDATE deliveries SET cost = cost + ? WHERE tracking_code = ? OR id = ?");
        $stmtUpdate->execute([$cost, $delivery_id, $delivery_id]);
    }

    $pdo->commit();
    echo json_encode(["success" => true, "extra_id" => $extra_id]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar el extra", "detalle" => $e->getMessage()]);
}
?>
