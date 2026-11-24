package cl.sanmarcos.fichas.service;

import cl.sanmarcos.fichas.model.Mascota;
import cl.sanmarcos.fichas.repository.MascotaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MascotaServiceTest {

    @Mock
    private MascotaRepository mascotaRepository;

    @InjectMocks
    private MascotaService mascotaService;

    @Test
    void actualizarNoCambiaElDuenoDeLaMascota() {
        Mascota existente = new Mascota(1L, "cliente@gmail.com", "Firulais", "Perro", "Labrador", 5);
        Mascota datos = new Mascota(null, "otro@gmail.com", "Firulais", "Perro", "Labrador", 6);
        when(mascotaRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(mascotaRepository.save(any(Mascota.class))).thenAnswer(inv -> inv.getArgument(0));

        Mascota actualizada = mascotaService.actualizar(1L, datos).orElseThrow();

        assertEquals("cliente@gmail.com", actualizada.getCorreoCliente());
        assertEquals(6, actualizada.getEdad());
    }

    @Test
    void guardarNormalizaElCorreoDelDueno() {
        when(mascotaRepository.save(any(Mascota.class))).thenAnswer(inv -> inv.getArgument(0));

        Mascota guardada = mascotaService.guardar(new Mascota(null, " Cliente@Gmail.com ", "Michi", "Gato", null, 3));

        assertEquals("cliente@gmail.com", guardada.getCorreoCliente());
    }
}
