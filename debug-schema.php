<?php
// Load WordPress environment
define('WP_USE_THEMES', false);
require_once('wp-load.php');

global $wpdb;
$table_name = 'deliveries';

// Check if table exists
$table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name;

if (!$table_exists) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => "Table '$table_name' does not exist."
    ], JSON_PRETTY_PRINT);
    exit;
}

$columns = $wpdb->get_results("DESCRIBE $table_name", ARRAY_A);

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'table' => $table_name,
    'columns' => $columns
], JSON_PRETTY_PRINT);
?>
