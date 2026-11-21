-- Usuarios iniciales: un administrador y clientes de prueba
INSERT INTO clientes (nombre_completo, correo, telefono, password, rol, fecha_registro) VALUES
('Administrador San Marcos', 'admin@sanmarcos.cl',    '+56 2 2345 6789', 'admin123',  'ADMIN',   '2026-03-01 09:00:00'),
('Camila Rojas Fuentes',     'cliente@gmail.com',     '+56 9 8765 4321', '123456',    'CLIENTE', '2026-03-15 10:30:00'),
('Juan Pérez Soto',          'juan.perez@email.com',  '+56 9 7123 4567', 'juan1234',  'CLIENTE', '2026-04-02 16:45:00'),
('María Silva Contreras',    'maria.silva@email.com', '+56 9 6234 5678', 'maria1234', 'CLIENTE', '2026-05-20 11:15:00');
