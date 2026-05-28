<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
require_once($wp_load);
global $wpdb;

$wpdb->update('deliveries', ['status' => 'cancelada'], ['id' => 9]);
$wpdb->update('deliveries', ['status' => 'cancelada'], ['id' => 10]);

echo "Deliveries 9 and 10 updated to cancelada.\n";
?>
