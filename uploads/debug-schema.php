<?php
// Load WordPress environment
define('WP_USE_THEMES', false);
require_once('../wp-load.php');

global $wpdb;
$table_name = 'deliveries';

$columns = $wpdb->get_results("DESCRIBE $table_name", ARRAY_A);

header('Content-Type: application/json');
echo json_encode([
    'table' => $table_name,
    'columns' => $columns
], JSON_PRETTY_PRINT);
?>
