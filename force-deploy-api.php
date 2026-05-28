<?php
/**
 * Instalador manual para la API de Holy Bakery.
 * Este script copia el plugin a la carpeta correcta de WordPress y lo activa.
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Rutas
$source = __DIR__ . '/holybakery_api_confirm.php';
$dest = dirname(__DIR__) . '/public_html/wp-content/plugins/holybakery_api_confirm.php';
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';

echo "<h2>Holy Bakery API Deployer</h2>";
echo "<p>Copiando plugin desde: $source</p>";
echo "<p>Hacia: $dest</p>";

if (!file_exists($source)) {
    die("<h3 style='color:red;'>Error: No se encontró el archivo origen.</h3>");
}

$copied = @copy($source, $dest);

if ($copied) {
    echo "<h3 style='color:green;'>¡Plugin copiado exitosamente!</h3>";
    
    // Intentar activar el plugin automáticamente usando las funciones de WordPress
    if (file_exists($wp_load)) {
        echo "<p>Cargando WordPress para activar el plugin...</p>";
        require_once($wp_load);
        require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        
        $plugin_path = 'holybakery_api_confirm.php';
        $result = activate_plugin($plugin_path);
        
        if (is_wp_error($result)) {
            echo "<h3 style='color:orange;'>El archivo se copió, pero no se pudo activar automáticamente. Por favor entra a tu wp-admin > Plugins y activa 'OnRoute Holy Bakery - Gestión de Reservas y Estados'.</h3>";
        } else {
            echo "<h3 style='color:green;'>¡Plugin activado correctamente!</h3>";
        }
    } else {
        echo "<h3 style='color:orange;'>El archivo se copió, pero no se encontró wp-load.php. Entra a tu wp-admin > Plugins y actívalo manualmente.</h3>";
    }
} else {
    echo "<h3 style='color:red;'>Error al copiar el archivo. Problemas de permisos.</h3>";
}
?>
