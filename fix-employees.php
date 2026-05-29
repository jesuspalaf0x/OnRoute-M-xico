<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once(__DIR__ . '/../subdomains/holybakery/public_html/wp-load.php');
global $wpdb;

$wpdb->query("CREATE TABLE IF NOT EXISTS employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  role varchar(255) DEFAULT NULL,
  active tinyint(1) DEFAULT 1,
  shift_start time DEFAULT NULL,
  shift_end time DEFAULT NULL,
  PRIMARY KEY (id)
)");

$wpdb->query("INSERT IGNORE INTO employees (id, name, role, active, shift_start, shift_end) VALUES 
(1, 'Ramiro Carbajal', 'Cajero', 1, '08:00:00', '15:00:00'),
(2, 'Diana Domínguez', 'Repostería', 1, '15:00:00', '20:30:00'),
(3, 'Lucía Hernandez', 'Apoyo', 1, '10:00:00', '16:00:00')
ON DUPLICATE KEY UPDATE name=VALUES(name);");

echo "Employees inserted.";
