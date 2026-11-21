-- Mascotas de los clientes (correo_cliente es una referencia lógica al usuario de clientes-service)
CREATE TABLE mascotas (
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    correo_cliente VARCHAR(100) NOT NULL,
    nombre         VARCHAR(60)  NOT NULL,
    especie        VARCHAR(40)  NOT NULL,
    raza           VARCHAR(60),
    edad           INT,
    PRIMARY KEY (id),
    INDEX idx_mascotas_correo_cliente (correo_cliente)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Fichas médicas: una mascota tiene muchas fichas (relación 1 a N)
CREATE TABLE fichas_medicas (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    mascota_id      BIGINT       NOT NULL,
    motivo_consulta VARCHAR(150) NOT NULL,
    diagnostico     TEXT,
    tratamiento     TEXT,
    veterinario     VARCHAR(100) NOT NULL,
    estado          VARCHAR(20)  NOT NULL DEFAULT 'EN_ATENCION',
    fecha_atencion  DATE         NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_fichas_medicas_mascota FOREIGN KEY (mascota_id)
        REFERENCES mascotas (id) ON DELETE CASCADE,
    CONSTRAINT chk_fichas_medicas_estado CHECK (estado IN ('EN_ATENCION', 'ALTA'))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
