package cl.sanmarcos.fichas.service;

import cl.sanmarcos.fichas.model.FichaMedica;
import cl.sanmarcos.fichas.model.Mascota;
import cl.sanmarcos.fichas.repository.FichaMedicaRepository;
import cl.sanmarcos.fichas.repository.MascotaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FichaMedicaServiceTest {

    @Mock
    private FichaMedicaRepository fichaMedicaRepository;

    @Mock
    private MascotaRepository mascotaRepository;

    @InjectMocks
    private FichaMedicaService fichaMedicaService;

    private FichaMedica crearFicha(Long mascotaId) {
        Mascota referencia = new Mascota();
        referencia.setId(mascotaId);
        return new FichaMedica(null, referencia, "Control anual", "Sano", "Vacuna sextuple",
                "Dra. Fernanda Muñoz", "EN_ATENCION", LocalDate.of(2026, 11, 20));
    }

    @Test
    void crearAsociaLaFichaALaMascotaExistente() {
        Mascota firulais = new Mascota(1L, "cliente@gmail.com", "Firulais", "Perro", "Labrador", 5);
        when(mascotaRepository.findById(1L)).thenReturn(Optional.of(firulais));
        when(fichaMedicaRepository.save(any(FichaMedica.class))).thenAnswer(inv -> inv.getArgument(0));

        FichaMedica creada = fichaMedicaService.crear(crearFicha(1L)).orElseThrow();

        assertEquals("Firulais", creada.getMascota().getNombre());
    }

    @Test
    void crearFallaSiLaMascotaNoExiste() {
        when(mascotaRepository.findById(99L)).thenReturn(Optional.empty());

        assertTrue(fichaMedicaService.crear(crearFicha(99L)).isEmpty());
    }

    @Test
    void actualizarCambiaEstadoADeAlta() {
        FichaMedica existente = crearFicha(1L);
        existente.setId(10L);
        FichaMedica datos = crearFicha(1L);
        datos.setEstado("ALTA");
        datos.setDiagnostico("Recuperado");
        when(fichaMedicaRepository.findById(10L)).thenReturn(Optional.of(existente));
        when(mascotaRepository.findById(1L)).thenReturn(Optional.of(new Mascota(1L, "cliente@gmail.com", "Firulais", "Perro", "Labrador", 5)));
        when(fichaMedicaRepository.save(any(FichaMedica.class))).thenAnswer(inv -> inv.getArgument(0));

        FichaMedica actualizada = fichaMedicaService.actualizar(10L, datos).orElseThrow();

        assertEquals("ALTA", actualizada.getEstado());
        assertEquals("Recuperado", actualizada.getDiagnostico());
    }
}
