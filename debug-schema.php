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
$parent_dir = dirname($base_dir); // e.g. /home/user

// Let's find ALL files named holybakery_api_confirm.php in the parent directory
$found_files = [];

function find_plugin_files($dir, &$found_files) {
    if (!is_dir($dir)) return;
    $files = @scandir($dir);
    if (!$files) return;
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            // Avoid scanning standard heavy WP/Node folders to be fast and safe
            if ($file === 'wp-admin' || $file === 'wp-includes' || $file === 'node_modules' || $file === 'wp-content' || $file === '.git') {
                continue;
            }
            find_plugin_files($path, $found_files);
        } elseif ($file === 'holybakery_api_confirm.php') {
            $header = @file_get_contents($path, false, null, 0, 500);
            preg_match('/Version:\s*(.*)/i', $header, $matches);
            $version = isset($matches[1]) ? trim($matches[1]) : 'unknown';
            $found_files[] = [
                'path' => $path,
                'version' => $version
            ];
        }
    }
}

find_plugin_files($parent_dir, $found_files);

// Also look directly in wp-content/plugins just in case
$active_plugin = $base_dir . '/wp-content/plugins/holybakery_api_confirm.php';
$active_version = 'not_found';
if (file_exists($active_plugin)) {
    $header = @file_get_contents($active_plugin, false, null, 0, 500);
    preg_match('/Version:\s*(.*)/i', $header, $matches);
    $active_version = isset($matches[1]) ? trim($matches[1]) : 'unknown';
}

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'parent_dir' => $parent_dir,
    'found_files' => $found_files,
    'active_plugin_path' => $active_plugin,
    'active_version' => $active_version
], JSON_PRETTY_PRINT);
?>
