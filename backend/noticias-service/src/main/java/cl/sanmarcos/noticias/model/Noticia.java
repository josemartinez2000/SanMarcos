package cl.sanmarcos.noticias.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "noticias")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 150, message = "El título no puede superar los 150 caracteres")
    @Column(nullable = false, length = 150)
    private String titulo;

    @NotBlank(message = "El resumen es obligatorio")
    @Size(max = 500, message = "El resumen no puede superar los 500 caracteres")
    @Column(nullable = false, length = 500)
    private String resumen;

    @NotBlank(message = "El contenido es obligatorio")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Size(max = 255, message = "La ruta de la imagen no puede superar los 255 caracteres")
    @Column(length = 255)
    private String imagen;

    @Column(name = "fecha_publicacion", nullable = false)
    private LocalDate fechaPublicacion;
}
