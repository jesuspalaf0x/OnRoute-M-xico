<?php
// get_extras.php - Obtener el historial de extras
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM holy_extras ORDER BY created_at DESC LIMIT 300");
    $extras = $stmt->fetchAll();
    echo json_encode($extras);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener extras", "detalle" => $e->getMessage()]);
}
?>
