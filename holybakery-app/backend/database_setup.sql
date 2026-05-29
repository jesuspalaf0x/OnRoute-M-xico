-- Tabla de Ubicaciones (Entregas)
CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_id` varchar(20) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `reference` text,
  `address` text,
  `zone` varchar(100) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `km` decimal(10,2) DEFAULT NULL,
  `eta` varchar(50) DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'nueva', -- nueva, revisar, convertida
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Si se necesita multi-tenant en el futuro, añadir columna client_id
-- ALTER TABLE `deliveries` ADD COLUMN `client_id` int(11) DEFAULT 1;
