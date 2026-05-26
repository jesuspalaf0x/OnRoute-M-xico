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
$plugins_dir = $base_dir . '/wp-content/plugins';

$files_found = [];
if (is_dir($plugins_dir)) {
    $files = scandir($plugins_dir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..' && !is_dir($plugins_dir . '/' . $file)) {
            $files_found[] = $file;
        }
    }
}

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'plugins_dir' => $plugins_dir,
    'single_file_plugins' => $files_found,
    'confirm_exists' => file_exists($plugins_dir . '/holybakery_api_confirm.php')
], JSON_PRETTY_PRINT);
?>
