<?php
/**
 * fix-wp-plugin.php
 * Script de emergencia para eliminar el plugin de holybakery que fue copiado
 * accidentalmente al WordPress de onroutemx.com
 * 
 * Ejecutar en: https://onroutemx.com/fix-wp-plugin.php
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

$base = dirname(__FILE__);

echo "<h2>🔧 Diagnóstico y reparación de WordPress - onroutemx.com</h2>";
echo "<pre>";

// 1. Verificar si el plugin de holybakery está en este WordPress
$plugin_path = $base . '/wp-content/plugins/holybakery_api_confirm.php';
$plugin_dir_path = $base . '/wp-content/plugins/holybakery_api_confirm';

echo "\n--- Verificando plugin de holybakery ---\n";
if (file_exists($plugin_path)) {
    echo "⚠️  ENCONTRADO: holybakery_api_confirm.php en wp-content/plugins/\n";
    echo "   Este plugin NO pertenece a onroutemx.com, pertenece al subdominio holybakery.\n";
    if (unlink($plugin_path)) {
        echo "✅ ELIMINADO: holybakery_api_confirm.php del plugins de onroutemx.com\n";
    } else {
        echo "❌ ERROR al eliminar. Elimínalo manualmente desde File Manager.\n";
    }
} else {
    echo "✅ holybakery_api_confirm.php NO está en este WordPress (correcto)\n";
}

if (is_dir($plugin_dir_path)) {
    echo "⚠️  ENCONTRADO directorio: holybakery_api_confirm/ en plugins\n";
}

// 2. Verificar archivos de la app en la raíz
echo "\n--- Verificando archivos de la app holybakery en raíz ---\n";
$app_files = ['index.html', 'favicon.svg', 'delete-index.php', 'debug-schema.php', 'deploy-plugin.php', 'schema-info.php'];
foreach ($app_files as $f) {
    $path = $base . '/' . $f;
    if (file_exists($path)) {
        if (unlink($path)) {
            echo "✅ ELIMINADO: $f\n";
        } else {
            echo "❌ No se pudo eliminar: $f\n";
        }
    } else {
        echo "⚪ No existe: $f\n";
    }
}

// 3. Verificar y eliminar directorios de la app
echo "\n--- Verificando directorios de la app ---\n";
$app_dirs = ['assets', 'pages', 'shared', 'variations'];
foreach ($app_dirs as $dir) {
    $path = $base . '/' . $dir;
    if (is_dir($path)) {
        if (rrmdir($path)) {
            echo "✅ DIRECTORIO ELIMINADO: $dir/\n";
        } else {
            echo "❌ No se pudo eliminar directorio: $dir/\n";
        }
    } else {
        echo "⚪ No existe: $dir/\n";
    }
}

// 4. Verificar WordPress
echo "\n--- Estado de WordPress ---\n";
if (file_exists($base . '/wp-config.php')) {
    echo "✅ wp-config.php existe\n";
}
if (file_exists($base . '/index.php')) {
    $idx = file_get_contents($base . '/index.php');
    if (strpos($idx, 'wp-blog-header') !== false) {
        echo "✅ index.php de WordPress está correcto\n";
    } else {
        echo "⚠️  index.php no parece ser de WordPress: " . htmlspecialchars(substr($idx, 0, 100)) . "\n";
    }
} else {
    echo "❌ index.php NO encontrado\n";
}

// 5. Listar plugins activos
echo "\n--- Plugins en wp-content/plugins/ ---\n";
$plugins_dir = $base . '/wp-content/plugins';
if (is_dir($plugins_dir)) {
    $plugins = scandir($plugins_dir);
    foreach ($plugins as $p) {
        if ($p === '.' || $p === '..') continue;
        echo "  - $p\n";
    }
} else {
    echo "No se encontró directorio de plugins\n";
}

// 6. Verificar .htaccess
echo "\n--- Verificando .htaccess ---\n";
$htaccess = $base . '/.htaccess';
if (file_exists($htaccess)) {
    $content = file_get_contents($htaccess);
    echo htmlspecialchars(substr($content, 0, 500)) . "\n";
} else {
    echo "No existe .htaccess\n";
}

echo "</pre>";
echo "<p><strong>⚠️ Elimina este archivo después de usarlo: <a href='?selfdelete=1'>Eliminar este script</a></strong></p>";

if (isset($_GET['selfdelete'])) {
    unlink(__FILE__);
    echo "<strong>✅ Script eliminado.</strong>";
}

function rrmdir($dir) {
    if (!is_dir($dir)) return false;
    $files = array_diff(scandir($dir), ['.', '..']);
    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        is_dir($path) ? rrmdir($path) : unlink($path);
    }
    return rmdir($dir);
}
