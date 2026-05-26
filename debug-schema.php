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

$base_dir = dirname($found_path);
$plugin_file = $base_dir . '/wp-content/plugins/holybakery_api_confirm.php';

// Let's search for the repository folder to find the new holybakery_api_confirm.php
$repo_paths = [
    '../repositories/OnRoute-M-xico/holybakery_api_confirm.php',
    '../../repositories/OnRoute-M-xico/holybakery_api_confirm.php',
    '../OnRoute-M-xico/holybakery_api_confirm.php',
    '../../OnRoute-M-xico/holybakery_api_confirm.php',
    '../../../repositories/OnRoute-M-xico/holybakery_api_confirm.php',
];

$source_file = '';
foreach ($repo_paths as $rp) {
    if (file_exists($rp)) {
        $source_file = $rp;
        break;
    }
}

if (empty($source_file)) {
    // If not found in relative paths, let's try to search recursively one level up
    $parent_dir = dirname($base_dir);
    try {
        $dir_iterator = new RecursiveDirectoryIterator($parent_dir);
        $iterator = new RecursiveIteratorIterator($dir_iterator, RecursiveIteratorIterator::SELF_FIRST);
        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getFilename() === 'holybakery_api_confirm.php') {
                // Check if it has our Version 3.1 header
                $header = file_get_contents($file->getPathname(), false, null, 0, 500);
                if (strpos($header, 'Version: 3.1') !== false) {
                    $source_file = $file->getPathname();
                    break;
                }
            }
        }
    } catch (Exception $e) {
        // Fallback if scanning throws permission errors
    }
}

$copied = false;
$message = '';
if (!empty($source_file)) {
    // Copy the file using web server permissions (which always has write access to its own plugins folder)
    $copied = copy($source_file, $plugin_file);
    if ($copied) {
        $message = "Successfully copied fixed plugin from $source_file to $plugin_file!";
    } else {
        $message = "Failed to copy from $source_file to $plugin_file despite finding it.";
    }
} else {
    $message = "Could not find a valid holybakery_api_confirm.php source file with Version 3.1 header.";
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
