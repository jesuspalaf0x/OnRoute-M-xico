-- ==========================================
-- D-1: Auditoría y sincronización MySQL
-- ==========================================

-- 1. Verificación y Corrección de ENUMs
ALTER TABLE deliveries
MODIFY COLUMN status ENUM('borrador', 'confirmada', 'entregada', 'pagada', 'cancelacion_pendiente', 'cancelada') NOT NULL DEFAULT 'borrador',
MODIFY COLUMN cost_type ENUM('local', 'foreign', 'special', 'custom') NOT NULL DEFAULT 'foreign';

-- 2. Timestamps y fechas
ALTER TABLE deliveries
ADD COLUMN confirmed_at DATETIME NULL AFTER updated_at,
ADD COLUMN delivered_at DATETIME NULL AFTER confirmed_at,
ADD COLUMN paid_at DATETIME NULL AFTER delivered_at,
ADD COLUMN cancelled_at DATETIME NULL AFTER paid_at;

-- Si las columnas ya existen y se necesita forzar el tipo, usar MODIFY:
-- MODIFY COLUMN confirmed_at DATETIME NULL,
-- MODIFY COLUMN delivered_at DATETIME NULL,
-- MODIFY COLUMN paid_at DATETIME NULL,
-- MODIFY COLUMN cancelled_at DATETIME NULL;

-- 3. Índices de performance
CREATE INDEX idx_deliveries_dashboard ON deliveries (client_id, status, delivery_date);
CREATE INDEX idx_deliveries_employee ON deliveries (employee_id, status);

CREATE INDEX idx_cancellations_status ON cancellation_requests (delivery_id, status);
CREATE INDEX idx_tariff_changes_status ON tariff_change_requests (delivery_id, status);
