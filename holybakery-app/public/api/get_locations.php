<?php
require_once 'db.php';

header("Content-Type: application/json");

try {
    $stmt = $pdo->prepare("SELECT * FROM deliveries ORDER BY scheduled_date DESC LIMIT 50");
    $stmt->execute();
    
    $results = $stmt->fetchAll();
    
    // Formatear para el dashboard (igual a MOCK.INCOMING_LOCATIONS)
    $formatted = [];
    foreach ($results as $row) {
        $formatted[] = [
            "id" => $row['tracking_code'],
            "client" => "Cliente App", // Ficticio ya que no hay columna
            "ref" => $row['formatted_address'], // Usamos la dirección/notas concatenadas aquí
            "addr" => $row['formatted_address'],
            "zone" => "Ver admin",
            "cost" => $row['cost'] ? (float)$row['cost'] : null,
            "km" => 0,
            "eta" => "Ver admin",
            "time" => date("h:i a", strtotime($row['scheduled_date'])), 
            "status" => $row['status'],
            "x" => (float)$row['longitude'],
            "y" => (float)$row['latitude']
        ];
    }
    
    echo json_encode($formatted);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al consultar la base de datos", "detalle" => $e->getMessage()]);
}
?>
