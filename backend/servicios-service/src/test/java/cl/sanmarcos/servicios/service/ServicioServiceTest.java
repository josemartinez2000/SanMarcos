package cl.sanmarcos.servicios.service;

import cl.sanmarcos.servicios.model.Servicio;
import cl.sanmarcos.servicios.repository.ServicioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServicioServiceTest {

    @Mock
    private ServicioRepository servicioRepository;

    @InjectMocks
    private ServicioService servicioService;

    private Servicio crearServicio() {
        return new Servicio(4L, "SV001", "Consulta general", "Consultas", 15000, "30 min",
                "/img/Consulta general.jpg", "Evaluación clínica completa");
    }

    @Test
    void codigoEnUsoDetectaDuplicadoDeOtroRegistro() {
        when(servicioRepository.findByCodigo("SV001")).thenReturn(Optional.of(crearServicio()));

        assertTrue(servicioService.codigoEnUso("sv001", null));
        assertFalse(servicioService.codigoEnUso("SV001", 4L));
    }

    @Test
    void actualizarModificaPrecioYDuracion() {
        Servicio datos = crearServicio();
        datos.setPrecio(18000);
        datos.setDuracion("45 min");
        when(servicioRepository.findById(4L)).thenReturn(Optional.of(crearServicio()));
        when(servicioRepository.save(any(Servicio.class))).thenAnswer(inv -> inv.getArgument(0));

        Servicio actualizado = servicioService.actualizar(4L, datos).orElseThrow();

        assertEquals(18000, actualizado.getPrecio());
        assertEquals("45 min", actualizado.getDuracion());
    }

    @Test
    void eliminarDevuelveFalseSiNoExiste() {
        when(servicioRepository.existsById(99L)).thenReturn(false);

        assertFalse(servicioService.eliminar(99L));
    }
}
