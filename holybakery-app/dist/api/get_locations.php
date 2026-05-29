<?php
require_once 'db.php';

header("Content-Type: application/json");

try {
    $stmt = $pdo->prepare("SELECT * FROM holy_locations ORDER BY created_at DESC LIMIT 50");
    $stmt->execute();
    
    $results = $stmt->fetchAll();
    
    // Formatear para el dashboard (igual a MOCK.INCOMING_LOCATIONS)
    $formatted = [];
    foreach ($results as $row) {
        $formatted[] = [
            "id" => $row['short_id'],
            "client" => $row['client_name'],
            "ref" => $row['reference'],
            "addr" => $row['address'],
            "zone" => $row['zone'],
            "cost" => $row['cost'] ? (float)$row['cost'] : null,
            "km" => $row['km'] ? (float)$row['km'] : 0,
            "eta" => $row['eta'],
            "time" => date("h:i a", strtotime($row['created_at'])),
            "created_at" => $row['created_at'],
            "status" => $row['status'],
            "x" => (float)$row['lng'],
            "y" => (float)$row['lat']
        ];
    }
    
    echo json_encode($formatted);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al consultar la base de datos", "detalle" => $e->getMessage()]);
}
?>
