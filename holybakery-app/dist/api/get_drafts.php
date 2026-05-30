<?php
// get_drafts.php - Obtener todos los borradores de la nube
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM holy_savings ORDER BY created_at DESC");
    $results = $stmt->fetchAll();

    $drafts = [];
    foreach ($results as $row) {
        $drafts[] = [
            "id" => $row['draft_id'],
            "status" => "borrador",
            "destinationName" => $row['destination_name'],
            "zoneName" => $row['zone_name'],
            "cost" => (float)$row['cost'],
            "employee_name" => $row['employee_name'],
            "created_at" => $row['created_at'],
            "quoteData" => json_decode($row['quote_data'], true)
        ];
    }

    echo json_encode($drafts);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener borradores", "detalle" => $e->getMessage()]);
}
?>
