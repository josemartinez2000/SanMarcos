-- Mascotas de prueba (la mayoría pertenece al cliente de prueba cliente@gmail.com)
INSERT INTO mascotas (id, correo_cliente, nombre, especie, raza, edad) VALUES
(1, 'cliente@gmail.com',     'Firulais', 'Perro',  'Labrador retriever', 5),
(2, 'cliente@gmail.com',     'Michi',    'Gato',   'Siamés',             3),
(3, 'cliente@gmail.com',     'Kiwi',     'Conejo', 'Cabeza de león',     2),
(4, 'juan.perez@email.com',  'Rocky',    'Perro',  'Pastor alemán',      7),
(5, 'maria.silva@email.com', 'Luna',     'Gato',   'Mestizo',            4);

-- Fichas médicas asociadas a cada mascota
INSERT INTO fichas_medicas (mascota_id, motivo_consulta, diagnostico, tratamiento, veterinario, estado, fecha_atencion) VALUES
(1, 'Control anual y vacunación',
    'Paciente en buen estado general. Peso 31 kg, condición corporal 5/9, sin hallazgos patológicos.',
    'Se aplica vacuna sextuple canina y antirrábica. Próximo control en 12 meses.',
    'Dra. Fernanda Muñoz', 'ALTA', '2026-08-12'),
(1, 'Cojera en extremidad posterior derecha',
    'Esguince leve de rodilla derecha, sin compromiso de ligamento cruzado en la radiografía.',
    'Meloxicam 1mg cada 24 horas por 5 días, reposo y control en una semana.',
    'Dr. Rodrigo Pérez', 'EN_ATENCION', '2026-11-10'),
(2, 'Vómitos y decaimiento',
    'Gastroenteritis aguda de origen alimentario. Hidratación levemente disminuida.',
    'Omeprazol 10mg cada 24 horas por 7 días, Probifor y dieta blanda.',
    'Dra. Fernanda Muñoz', 'ALTA', '2026-09-03'),
(3, 'Corte de uñas y revisión dental',
    'Crecimiento dental normal, sin maloclusión. Uñas largas en extremidades posteriores.',
    'Corte de uñas realizado. Control preventivo en 6 meses.',
    'Dr. Rodrigo Pérez', 'ALTA', '2026-10-21'),
(4, 'Dermatitis alérgica',
    'Prurito intenso en zona abdominal y patas, compatible con dermatitis atópica.',
    'Apoquel 16mg cada 12 horas por 14 días y baños con Clorhexidina shampoo dos veces por semana.',
    'Dra. Fernanda Muñoz', 'EN_ATENCION', '2026-11-05'),
(5, 'Esterilización programada',
    'Cirugía de esterilización sin complicaciones. Herida limpia.',
    'Control postoperatorio en 10 días y uso de collar isabelino.',
    'Dr. Rodrigo Pérez', 'ALTA', '2026-07-15');
