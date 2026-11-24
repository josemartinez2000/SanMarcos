package cl.sanmarcos.medicamentos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medicamentos")
public class Medicamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El código es obligatorio")
    @Size(max = 10, message = "El código no puede superar los 10 caracteres")
    @Column(nullable = false, unique = true, length = 10)
    private String codigo;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotBlank(message = "La categoría es obligatoria")
    @Size(max = 50, message = "La categoría no puede superar los 50 caracteres")
    @Column(nullable = false, length = 50)
    private String categoria;

    @NotNull(message = "El precio es obligatorio")
    @Min(value = 0, message = "El precio no puede ser negativo")
    @Max(value = 100000000, message = "El precio es demasiado alto")
    @Column(nullable = false)
    private Integer precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Max(value = 1000000, message = "El stock es demasiado alto")
    @Column(nullable = false)
    private Integer stock;

    @Size(max = 255, message = "La ruta de la imagen no puede superar los 255 caracteres")
    @Column(length = 255)
    private String imagen;

    @Column(columnDefinition = "TEXT")
    private String detalles;
}
