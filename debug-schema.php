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
$found_path = '';
foreach ($paths as $path) {
    if (file_exists($path)) {
        require_once($path);
        $loaded = true;
        $found_path = $path;
        break;
    }
}

if (!$loaded) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'WordPress not found.'], JSON_PRETTY_PRINT);
    exit;
}

global $wpdb;
$cols_cancel = $wpdb->get_results("DESCRIBE cancellation_requests", ARRAY_A);
$cols_tariff = $wpdb->get_results("DESCRIBE tariff_change_requests", ARRAY_A);

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'cancellation_requests' => $cols_cancel,
    'tariff_change_requests' => $cols_tariff
], JSON_PRETTY_PRINT);
?>
