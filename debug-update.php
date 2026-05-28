<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
require_once($wp_load);
global $wpdb;

$id = 2; // the ID of cancellation_requests
$req = $wpdb->get_row($wpdb->prepare("SELECT delivery_id FROM cancellation_requests WHERE id = %d", $id), ARRAY_A);
if (!$req) {
    echo "Request not found\n";
    exit;
}

echo "delivery_id: " . $req['delivery_id'] . "\n";

$result1 = $wpdb->update('cancellation_requests', ['status' => 'approved', 'reviewed_by_admin_id' => 1, 'reviewed_at' => current_time('mysql')], ['id' => $id]);
echo "Update cancellation: "; var_dump($result1);

$result2 = $wpdb->update('deliveries', ['status' => 'cancelada'], ['id' => $req['delivery_id']]);
echo "Update deliveries: "; var_dump($result2);

echo "DB Error: " . $wpdb->last_error . "\n";

$del = $wpdb->get_row("SELECT id, status FROM deliveries WHERE id = " . $req['delivery_id'], ARRAY_A);
print_r($del);
?>
