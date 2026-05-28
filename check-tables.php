<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
require_once($wp_load);
global $wpdb;

$wpdb->show_errors = true;

$result = $wpdb->insert('cancellation_requests', [
    'client_id' => 1,
    'requested_by' => 1,
    'delivery_id' => 8,
    'reason' => 'Test reason direct',
    'status' => 'pending',
    'created_at' => current_time('mysql')
]);

if ($result === false) {
    echo "Insert Error: " . $wpdb->last_error . "\n";
} else {
    echo "Insert successful!\n";
}

$rows = $wpdb->get_results("SELECT * FROM cancellation_requests", ARRAY_A);
print_r($rows);

$joined = $wpdb->get_results("
    SELECT c.*, d.destination_name, d.customer_name, d.phones, d.cost, d.scheduled_date, d.employee_name, d.driver_id, d.tracking_code 
    FROM cancellation_requests c 
    JOIN deliveries d ON c.delivery_id = d.id 
    WHERE c.status = 'pending'
", ARRAY_A);
print_r($joined);
?>
