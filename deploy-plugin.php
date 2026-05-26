<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$source = 'holybakery_api_confirm.php';
$dest = 'wp-content/plugins/holybakery_api_confirm.php';

if (!file_exists($source)) {
    echo "Source file $source does not exist!";
    exit;
}

echo "Source file size: " . filesize($source) . " bytes<br>";
echo "Destination file exists: " . (file_exists($dest) ? "Yes" : "No") . "<br>";
if (file_exists($dest)) {
    echo "Destination permissions: " . substr(sprintf('%o', fileperms($dest)), -4) . "<br>";
    echo "Destination owner: " . fileowner($dest) . "<br>";
    echo "Current script owner: " . getmyuid() . "<br>";
    
    // Attempt to delete it first if copying fails
    echo "Attempting direct copy...<br>";
    $copied = @copy($source, $dest);
    if (!$copied) {
        echo "Direct copy failed. Attempting to delete and copy...<br>";
        @unlink($dest);
        $copied = @copy($source, $dest);
    }
} else {
    $copied = @copy($source, $dest);
}

if ($copied) {
    echo "<strong>SUCCESSFULLY COPIED PLUGIN!</strong>";
} else {
    echo "<strong>FAILED TO COPY PLUGIN! Permissions error.</strong>";
}
?>
