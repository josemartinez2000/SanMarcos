-- Noticias y campañas publicadas por la clínica
CREATE TABLE noticias (
    id                BIGINT       NOT NULL AUTO_INCREMENT,
    titulo            VARCHAR(150) NOT NULL,
    resumen           VARCHAR(500) NOT NULL,
    contenido         TEXT         NOT NULL,
    imagen            VARCHAR(255),
    fecha_publicacion DATE         NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
