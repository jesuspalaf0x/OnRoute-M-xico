<?php
// delete_draft.php - Eliminar un borrador de la nube
require_once 'db.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Falta ID del borrador a eliminar"]);
    exit();
}

try {
    $stmt = $pdo->prepare("DELETE FROM holy_savings WHERE draft_id = :id");
    $stmt->execute([':id' => $id]);

    echo json_encode(["status" => "success", "message" => "Borrador eliminado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al eliminar el borrador", "detalle" => $e->getMessage()]);
}
?>
