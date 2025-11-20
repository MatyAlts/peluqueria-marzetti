CREATE TABLE IF NOT EXISTS promotions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    code VARCHAR(100),
    image_url VARCHAR(1000),
    action_url VARCHAR(1000),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO promotions (title, description, code, image_url, action_url, active)
SELECT '20% OFF en tu primer corte',
       'Valido para nuevos clientes en cualquier servicio de corte.',
       'PRIMERCORTE20',
       'https://images.unsplash.com/photo-1597347343908-50a7dc97d518?q=80&w=2070&auto=format&fit=crop',
       '/turnos',
       true
WHERE NOT EXISTS (SELECT 1 FROM promotions);

INSERT INTO promotions (title, description, code, image_url, action_url, active)
SELECT 'Combo Color + Tratamiento',
       'Servicio de colorimetria con tratamiento capilar profundo con 15% de descuento.',
       'COLORCARE15',
       'https://images.unsplash.com/photo-1596465683128-f83dd29f717c?q=80&w=1974&auto=format&fit=crop',
       '/turnos',
       true
WHERE NOT EXISTS (SELECT 1 FROM promotions WHERE code = 'COLORCARE15');

INSERT INTO promotions (title, description, code, image_url, action_url, active)
SELECT 'Productos seleccionados al 3x2',
       'Lleva 3 productos de marcas seleccionadas y paga solo 2. El de menor valor es bonificado.',
       'PROMO3X2',
       'https://images.unsplash.com/photo-1626094020000-111499777780?q=80&w=1974&auto=format&fit=crop',
       '/catalogo',
       true
WHERE NOT EXISTS (SELECT 1 FROM promotions WHERE code = 'PROMO3X2');
