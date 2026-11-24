-- Control de concurrencia optimista: evita que dos administradores se pisen el stock
ALTER TABLE medicamentos ADD COLUMN version BIGINT NOT NULL DEFAULT 0;
