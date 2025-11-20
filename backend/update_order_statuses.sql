-- Script para actualizar los estados permitidos en la tabla orders
-- Esto permite los nuevos estados PAID y REJECTED

-- Eliminar la restricción antigua
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Agregar la nueva restricción con todos los estados
ALTER TABLE orders ADD CONSTRAINT orders_status_check 
CHECK (status IN ('PENDING', 'PAID', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REJECTED'));

-- Verificar que la restricción se aplicó correctamente
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'orders'::regclass AND conname = 'orders_status_check';
