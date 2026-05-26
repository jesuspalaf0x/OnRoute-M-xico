<?php
// Load WordPress
$paths = ['wp-load.php', '../wp-load.php', '../../wp-load.php', '../public_html/wp-load.php', '../../public_html/wp-load.php'];
foreach ($paths as $path) {
    if (file_exists($path)) {
        require_once($path);
        break;
    }
}
if (!defined('ABSPATH')) {
    exit;
}

global $wpdb;
$table = isset($_GET['t']) ? sanitize_text_field($_GET['t']) : '';
if (empty($table)) {
    echo "No table specified";
    exit;
}

$cols = $wpdb->get_col("DESCRIBE " . $wpdb->prefix . $table);
if (empty($cols)) {
    // try without prefix
    $cols = $wpdb->get_col("DESCRIBE " . $table);
}

echo base64_encode(json_encode($cols));
?>
