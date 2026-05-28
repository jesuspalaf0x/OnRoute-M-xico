<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';
if (!file_exists($wp_load)) {
    die("No wp-load.php found.");
}
require_once($wp_load);
global $wpdb;

$tables = $wpdb->get_results("SHOW TABLES LIKE '%cancellation_requests%'", ARRAY_N);
if (count($tables) > 0) {
    echo "Table exists!\n";
} else {
    echo "Table does NOT exist!\n";
}

$tables = $wpdb->get_results("SHOW TABLES LIKE '%tariff_change_requests%'", ARRAY_N);
if (count($tables) > 0) {
    echo "Tariff table exists!\n";
} else {
    echo "Tariff table does NOT exist!\n";
}
?>
