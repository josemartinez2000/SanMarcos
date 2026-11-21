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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
    @Column(name = "correo_cliente", nullable = false, length = 100)
    private String correoCliente;

    @NotBlank(message = "El nombre de la mascota es obligatorio")
    @Column(nullable = false, length = 60)
    private String nombre;

    @NotBlank(message = "La especie es obligatoria")
    @Column(nullable = false, length = 40)
    private String especie;

    @Column(length = 60)
    private String raza;

    @Min(value = 0, message = "La edad no puede ser negativa")
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
