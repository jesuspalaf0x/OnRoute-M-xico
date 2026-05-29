<?php
/**
 * Script para crear las tablas faltantes de solicitudes de cancelación y cambio de tarifa.
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Rutas
$wp_load = dirname(__DIR__) . '/public_html/wp-load.php';

echo "<h2>Holy Bakery Database Migration</h2>";

if (!file_exists($wp_load)) {
    die("<h3 style='color:red;'>Error: No se encontró wp-load.php.</h3>");
}

require_once($wp_load);
require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
global $wpdb;

$charset_collate = $wpdb->get_charset_collate();

// 1. Tabla de cancellation_requests
$sql_cancellations = "CREATE TABLE cancellation_requests (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  client_id bigint(20) unsigned DEFAULT 1,
  requested_by bigint(20) unsigned NOT NULL,
  delivery_id bigint(20) unsigned NOT NULL,
  reason text NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'pending',
  reviewed_by_admin_id bigint(20) unsigned DEFAULT NULL,
  reviewed_at datetime DEFAULT NULL,
  created_at datetime NOT NULL,
  PRIMARY KEY  (id),
  KEY delivery_id (delivery_id)
) $charset_collate;";

dbDelta($sql_cancellations);
echo "<p>Tabla <strong>cancellation_requests</strong> creada o actualizada.</p>";

// 2. Tabla de tariff_change_requests
$sql_tariffs = "CREATE TABLE tariff_change_requests (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  client_id bigint(20) unsigned DEFAULT 1,
  requested_by bigint(20) unsigned NOT NULL,
  delivery_id bigint(20) unsigned NOT NULL,
  reason text NOT NULL,
  requested_cost decimal(10,2) NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'pending',
  reviewed_by_admin_id bigint(20) unsigned DEFAULT NULL,
  reviewed_at datetime DEFAULT NULL,
  created_at datetime NOT NULL,
  PRIMARY KEY  (id),
  KEY delivery_id (delivery_id)
) $charset_collate;";

dbDelta($sql_tariffs);
echo "<p>Tabla <strong>tariff_change_requests</strong> creada o actualizada.</p>";

// 3. Modificar enum de status en la tabla deliveries para admitir cambio_tarifa_pendiente y cambio_tarifa
$wpdb->query("ALTER TABLE deliveries MODIFY COLUMN status ENUM('borrador', 'pendiente_envio', 'confirmada', 'entregada', 'pagada', 'cancelacion_pendiente', 'cancelada', 'cambio_tarifa_pendiente', 'cambio_tarifa') DEFAULT 'borrador';");
echo "<p>Columna <strong>status</strong> de la tabla <strong>deliveries</strong> actualizada para admitir estados de cambio de tarifa.</p>";


// Limpiar la caché si hay alguna
$wpdb->flush();

echo "<h3 style='color:green;'>¡Migración completada exitosamente!</h3>";
?>
