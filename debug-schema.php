<?php
// Try loading WordPress environment
$paths = [
    'wp-load.php',
    '../wp-load.php',
    '../public_html/wp-load.php',
    '../../public_html/wp-load.php',
    '../../../public_html/wp-load.php',
];

$loaded = false;
foreach ($paths as $path) {
    if (file_exists($path)) {
        require_once($path);
        $loaded = true;
        break;
    }
}

if (!$loaded) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => "WordPress wp-load.php not found. Checked: " . implode(', ', $paths)
    ], JSON_PRETTY_PRINT);
    exit;
}

global $wpdb;
$table_name = 'deliveries';

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
