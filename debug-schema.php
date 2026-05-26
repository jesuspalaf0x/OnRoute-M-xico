<?php
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

$base_dir = dirname($found_path);
$plugin_file = $base_dir . '/wp-content/plugins/holybakery_api_confirm.php';

$content = '';
if (file_exists($plugin_file)) {
    $content = file_get_contents($plugin_file, false, null, 0, 500);
}

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'plugin_file' => $plugin_file,
    'exists' => file_exists($plugin_file),
    'header' => $content
], JSON_PRETTY_PRINT);
?>
