package cl.sanmarcos.fichas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Referencia lógica al correo del dueño registrado en clientes-service
    @NotBlank(message = "El correo del dueño es obligatorio")
    @Email(message = "El correo del dueño no es válido")
    @Size(max = 100, message = "El correo del dueño no puede superar los 100 caracteres")
    @Column(name = "correo_cliente", nullable = false, length = 100)
    private String correoCliente;

    @NotBlank(message = "El nombre de la mascota es obligatorio")
    @Size(max = 60, message = "El nombre no puede superar los 60 caracteres")
    @Column(nullable = false, length = 60)
    private String nombre;

    @NotBlank(message = "La especie es obligatoria")
    @Size(max = 40, message = "La especie no puede superar los 40 caracteres")
    @Column(nullable = false, length = 40)
    private String especie;

    @Size(max = 60, message = "La raza no puede superar los 60 caracteres")
    @Column(length = 60)
    private String raza;

    @Min(value = 0, message = "La edad no puede ser negativa")
    @Max(value = 60, message = "La edad no es válida")
    private Integer edad;

    // Lado "uno" de la relación 1 a N: una mascota tiene muchas fichas médicas
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<FichaMedica> fichas = new ArrayList<>();

    public Mascota(Long id, String correoCliente, String nombre, String especie, String raza, Integer edad) {
        this.id = id;
        this.correoCliente = correoCliente;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
    }
}
