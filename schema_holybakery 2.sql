-- Holy Bakery Database Schema
-- Multi-tenant Architecture enabled (`client_id` added to all primary tables)

SET FOREIGN_KEY_CHECKS = 0;

-- 1. employees
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. zones
CREATE TABLE IF NOT EXISTS zones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    boundaries GEOMETRY NOT NULL COMMENT 'Prepared for 134 quadrants GeoJSON import',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. preferential_locations
CREATE TABLE IF NOT EXISTS preferential_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    zone_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. deliveries
CREATE TABLE IF NOT EXISTS deliveries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    driver_id INT,
    zone_id INT,
    tracking_code VARCHAR(100) NOT NULL,
    status ENUM('borrador', 'pendiente_envio', 'confirmada', 'entregada', 'pagada', 'cancelacion_pendiente', 'cancelada') DEFAULT 'borrador',
    scheduled_date DATETIME,
    delivered_at DATETIME,
    place_id VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    formatted_address TEXT,
    maps_link VARCHAR(500),
    cost DECIMAL(10, 2) DEFAULT 0.00,
    destination_name VARCHAR(255),
    employee_name VARCHAR(255),
    customer_name VARCHAR(255),
    phones VARCHAR(255),
    comments TEXT,
    tariff_type VARCHAR(50),
    cost_locked TINYINT(1) DEFAULT 0,
    admin_approval_requested TINYINT(1) DEFAULT 0,
    image_urls JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    UNIQUE INDEX idx_tracking_client (tracking_code, client_id),
    FOREIGN KEY (driver_id) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. extra_services
CREATE TABLE IF NOT EXISTS extra_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    delivery_id INT NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. payment_records
CREATE TABLE IF NOT EXISTS payment_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    delivery_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(100),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. cancellation_requests
CREATE TABLE IF NOT EXISTS cancellation_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    delivery_id INT NOT NULL,
    requested_by INT NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. tariff_change_requests
CREATE TABLE IF NOT EXISTS tariff_change_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    zone_id INT NOT NULL,
    requested_by INT NOT NULL,
    old_tariff DECIMAL(10, 2) NOT NULL,
    new_tariff DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. config
CREATE TABLE IF NOT EXISTS config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    key_name VARCHAR(100) NOT NULL,
    key_value JSON NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_client_id (client_id),
    UNIQUE KEY unique_client_key (client_id, key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dummy row for zones to hold one of the 134 quadrants (example preparation)
-- We use ST_GeomFromText to insert a simple MultiPolygon.
INSERT IGNORE INTO zones (id, client_id, name, boundaries, description, created_at, updated_at) 
VALUES (1, 1, 'Cuadrante 1 (Dummy)', ST_GeomFromText('MULTIPOLYGON(((0 0, 0 1, 1 1, 1 0, 0 0)))'), 'Dummy quadrant representing 1 of 134 for structural readiness', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
