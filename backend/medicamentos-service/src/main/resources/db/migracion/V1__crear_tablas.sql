-- Inventario de farmacia: medicamentos y vacunas
CREATE TABLE medicamentos (
    id        BIGINT       NOT NULL AUTO_INCREMENT,
    codigo    VARCHAR(10)  NOT NULL,
    nombre    VARCHAR(100) NOT NULL,
    categoria VARCHAR(50)  NOT NULL,
    precio    INT          NOT NULL,
    stock     INT          NOT NULL DEFAULT 0,
    imagen    VARCHAR(255),
    detalles  TEXT,
    PRIMARY KEY (id),
    CONSTRAINT uk_medicamentos_codigo UNIQUE (codigo),
    CONSTRAINT chk_medicamentos_precio CHECK (precio >= 0),
    CONSTRAINT chk_medicamentos_stock CHECK (stock >= 0)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
