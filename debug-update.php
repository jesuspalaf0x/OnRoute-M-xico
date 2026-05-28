<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
require_once($wp_load);
global $wpdb;

$wpdb->show_errors = true;

echo "Before update:\n";
$del = $wpdb->get_row("SELECT id, status FROM deliveries WHERE id = 10", ARRAY_A);
print_r($del);

$result = $wpdb->update('deliveries', ['status' => 'cancelada'], ['id' => 10]);

echo "Update result: ";
var_dump($result);

if ($result === false) {
    echo "DB Error: " . $wpdb->last_error . "\n";
}

echo "After update:\n";
$del = $wpdb->get_row("SELECT id, status FROM deliveries WHERE id = 10", ARRAY_A);
print_r($del);
?>
