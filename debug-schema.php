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

$base_dir = dirname($found_path); // e.g. /home/user/public_html
$plugin_file = $base_dir . '/wp-content/plugins/holybakery_api_confirm.php';
$source_file = dirname($base_dir) . '/holybakery-live/holybakery_api_confirm.php';

$copied = false;
$message = '';
if (file_exists($source_file)) {
    $copied = copy($source_file, $plugin_file);
    if ($copied) {
        $message = "Successfully copied Version 3.1 fixed plugin from $source_file to $plugin_file!";
    } else {
        $message = "Failed to copy from $source_file to $plugin_file despite finding it.";
    }
} else {
    $message = "Source file $source_file not found.";
}

header('Content-Type: application/json');
echo json_encode([
    'success' => $copied,
    'message' => $message,
    'plugin_file' => $plugin_file,
    'source_file' => $source_file,
    'version' => file_exists($plugin_file) ? file_get_contents($plugin_file, false, null, 0, 500) : 'none'
], JSON_PRETTY_PRINT);
?>
