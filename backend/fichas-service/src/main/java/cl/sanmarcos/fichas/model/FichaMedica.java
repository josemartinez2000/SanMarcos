package cl.sanmarcos.fichas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fichas_medicas")
public class FichaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Lado "muchos" de la relación: cada ficha pertenece a una mascota
    @NotNull(message = "Debe indicar la mascota")
    @ManyToOne(optional = false)
    @JoinColumn(name = "mascota_id", nullable = false)
    private Mascota mascota;

    @NotBlank(message = "El motivo de consulta es obligatorio")
    @Column(name = "motivo_consulta", nullable = false, length = 150)
    private String motivoConsulta;

    @Column(columnDefinition = "TEXT")
    private String diagnostico;

    @Column(columnDefinition = "TEXT")
    private String tratamiento;

    @NotBlank(message = "El veterinario es obligatorio")
    @Column(nullable = false, length = 100)
    private String veterinario;

    // Valores permitidos: EN_ATENCION o ALTA
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "EN_ATENCION|ALTA", message = "El estado debe ser EN_ATENCION o ALTA")
    @Column(nullable = false, length = 20)
    private String estado;

    @NotNull(message = "La fecha de atención es obligatoria")
    @Column(name = "fecha_atencion", nullable = false)
    private LocalDate fechaAtencion;
}
