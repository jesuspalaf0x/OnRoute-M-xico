<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
require_once($wp_load);
global $wpdb;

$columns = $wpdb->get_results("DESCRIBE deliveries", ARRAY_A);
print_r($columns);
?>
