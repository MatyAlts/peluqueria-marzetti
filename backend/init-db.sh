#!/bin/bash
set -e

# Script de inicialización para actualizar la base de datos con los nuevos estados

echo "Esperando a que PostgreSQL esté listo..."
until pg_isready -U postgres; do
  sleep 1
done

echo "Actualizando restricción de estados de órdenes..."

psql -U postgres -d peluqueria_marzetti <<-EOSQL
    -- Eliminar la restricción antigua si existe
    ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
    
    -- Agregar la nueva restricción con todos los estados
    ALTER TABLE orders ADD CONSTRAINT orders_status_check 
    CHECK (status IN ('PENDING', 'PAID', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REJECTED'));
    
    -- Verificar que la restricción se aplicó correctamente
    SELECT 'Restricción actualizada correctamente' as resultado;
EOSQL

echo "Base de datos actualizada exitosamente!"
