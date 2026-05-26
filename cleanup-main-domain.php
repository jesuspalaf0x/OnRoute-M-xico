<?php
/**
 * cleanup-main-domain.php
 * Script de limpieza para eliminar archivos de la holybakery-app
 * que fueron copiados accidentalmente al public_html de onroutemx.com
 * 
 * INSTRUCCIONES: Sube este archivo al public_html de onroutemx.com
 * y ábrelo en el navegador UNA SOLA VEZ. Luego elimínalo.
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

$base = dirname(__FILE__);
$results = [];

// Archivos sueltos que se copiaron accidentalmente
$files_to_delete = [
    'index.html',          // El index de la app holybakery
    'delete-index.php',    // Script de borrado anterior
    'debug-schema.php',    // Script de debug de BD
    'deploy-plugin.php',   // Script de deploy del plugin
    'schema-info.php',     // Info del schema
    'favicon.svg',         // Favicon de la app
];

// Directorios que se copiaron accidentalmente
$dirs_to_delete = [
    'assets',    // JS/CSS de la app holybakery
    'pages',     // Páginas de la app
    'shared',    // Datos compartidos de la app
    'variations',// Variaciones (si existe)
    'uploads',   // Solo si no es el uploads de WordPress
];

echo "<h2>🔍 Limpieza de archivos de holybakery-app en onroutemx.com</h2>";
echo "<pre>";

// Eliminar archivos sueltos
echo "\n--- Eliminando archivos sueltos ---\n";
foreach ($files_to_delete as $file) {
    $path = $base . '/' . $file;
    if (file_exists($path)) {
        if (unlink($path)) {
            echo "✅ ELIMINADO: $file\n";
        } else {
            echo "❌ ERROR: No se pudo eliminar $file (verificar permisos)\n";
        }
    } else {
        echo "⚪ No encontrado (ya eliminado): $file\n";
    }
}

// Eliminar directorios (con precaución)
echo "\n--- Eliminando directorios de la app ---\n";
foreach ($dirs_to_delete as $dir) {
    $path = $base . '/' . $dir;
    
    // SEGURIDAD: No eliminar el directorio uploads si contiene subdirectorios de WordPress
    if ($dir === 'uploads') {
        // El uploads real de WordPress tiene subcarpetas como /uploads/2024/, /uploads/2025/, etc.
        // Si tiene esas carpetas, NO es el uploads de la app, es el de WordPress
        $wp_uploads_indicator = $path . '/2024';
        $wp_uploads_indicator2 = $path . '/2025';
        $wp_uploads_indicator3 = $path . '/sites';
        if (is_dir($wp_uploads_indicator) || is_dir($wp_uploads_indicator2) || is_dir($wp_uploads_indicator3)) {
            echo "⚠️  OMITIDO: uploads/ — parece ser el directorio de WordPress (contiene subdirectorios anuales)\n";
            continue;
        }
        // Si solo tiene schema-info.php (de la app), eliminar
    }
    
    if (is_dir($path)) {
        if (deleteDir($path)) {
            echo "✅ DIRECTORIO ELIMINADO: $dir/\n";
        } else {
            echo "❌ ERROR: No se pudo eliminar el directorio $dir/\n";
        }
    } else {
        echo "⚪ No encontrado: $dir/\n";
    }
}

// Verificar estado de WordPress
echo "\n--- Verificando estado de WordPress ---\n";
$wp_config = $base . '/wp-config.php';
$wp_index = $base . '/wp-index-backup.php'; // por si se guardó
$wp_real_index = $base . '/index.php';

if (file_exists($wp_config)) {
    echo "✅ wp-config.php encontrado — WordPress está instalado aquí\n";
} else {
    echo "⚠️  wp-config.php NO encontrado en este directorio\n";
}

if (file_exists($wp_real_index)) {
    $content = file_get_contents($wp_real_index);
    if (strpos($content, 'wp-blog-header') !== false) {
        echo "✅ index.php de WordPress está presente y parece correcto\n";
    } else {
        echo "⚠️  index.php existe pero no parece ser de WordPress\n";
        echo "   Contenido: " . htmlspecialchars(substr($content, 0, 200)) . "\n";
    }
} else {
    echo "❌ index.php de WordPress NO encontrado — puede que WordPress no esté en esta ruta\n";
}

// Listar archivos restantes en la raíz
echo "\n--- Archivos en la raíz después de la limpieza ---\n";
$files = scandir($base);
foreach ($files as $f) {
    if ($f === '.' || $f === '..') continue;
    $type = is_dir($base . '/' . $f) ? '[DIR]' : '[FILE]';
    echo "$type $f\n";
}

echo "</pre>";
echo "<p><strong>⚠️ IMPORTANTE: Una vez revisado el resultado, elimina este archivo del servidor.</strong></p>";
echo "<p>URL para eliminar este script: <a href='/cleanup-main-domain.php?selfdelete=1'>Eliminar este script</a></p>";

// Auto-eliminación
if (isset($_GET['selfdelete']) && $_GET['selfdelete'] === '1') {
    unlink(__FILE__);
    echo "<strong>✅ Script de limpieza eliminado del servidor.</strong>";
}

// Función recursiva para eliminar directorios
function deleteDir($dir) {
    if (!is_dir($dir)) return false;
    $files = array_diff(scandir($dir), ['.', '..']);
    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            deleteDir($path);
        } else {
            unlink($path);
        }
    }
    return rmdir($dir);
}
