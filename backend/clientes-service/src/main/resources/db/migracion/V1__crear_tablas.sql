-- Tabla de usuarios del sistema (administradores y clientes)
CREATE TABLE clientes (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    correo          VARCHAR(100) NOT NULL,
    telefono        VARCHAR(20),
    password        VARCHAR(100) NOT NULL,
    rol             VARCHAR(20)  NOT NULL DEFAULT 'CLIENTE',
    fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_clientes_correo UNIQUE (correo),
    CONSTRAINT chk_clientes_rol CHECK (rol IN ('ADMIN', 'CLIENTE'))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
