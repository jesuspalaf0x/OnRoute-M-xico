<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
if (!file_exists($wp_load)) {
    $wp_load = __DIR__ . '/public_html/wp-load.php';
}
require_once($wp_load);
global $wpdb;

echo "<h3>Deliveries Table Check</h3>";
$items = $wpdb->get_results("SELECT id, tracking_code, destination_name, status, cost, employee_name, scheduled_date FROM deliveries ORDER BY id DESC LIMIT 20", ARRAY_A);
echo "<pre>";
print_r($items);
echo "</pre>";
?>
