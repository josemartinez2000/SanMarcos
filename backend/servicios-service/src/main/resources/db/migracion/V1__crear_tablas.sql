-- Catálogo de servicios clínicos de la veterinaria
CREATE TABLE servicios (
    id        BIGINT       NOT NULL AUTO_INCREMENT,
    codigo    VARCHAR(10)  NOT NULL,
    nombre    VARCHAR(100) NOT NULL,
    categoria VARCHAR(50)  NOT NULL,
    precio    INT          NOT NULL,
    duracion  VARCHAR(30)  NOT NULL,
    imagen    VARCHAR(255),
    detalles  TEXT,
    PRIMARY KEY (id),
    CONSTRAINT uk_servicios_codigo UNIQUE (codigo),
    CONSTRAINT chk_servicios_precio CHECK (precio >= 0)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
