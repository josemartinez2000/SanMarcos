package cl.sanmarcos.noticias.service;

import cl.sanmarcos.noticias.model.Noticia;
import cl.sanmarcos.noticias.repository.NoticiaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NoticiaServiceTest {

    @Mock
    private NoticiaRepository noticiaRepository;

    @InjectMocks
    private NoticiaService noticiaService;

    @Test
    void guardarAsignaFechaDeHoySiNoViene() {
        Noticia noticia = new Noticia(null, "Operativo de microchip", "Resumen", "Contenido", "/img/noticia1.jpg", null);
        when(noticiaRepository.save(any(Noticia.class))).thenAnswer(inv -> inv.getArgument(0));

        Noticia guardada = noticiaService.guardar(noticia);

        assertEquals(LocalDate.now(), guardada.getFechaPublicacion());
    }

    @Test
    void eliminarDevuelveFalseSiNoExiste() {
        when(noticiaRepository.existsById(50L)).thenReturn(false);

        assertFalse(noticiaService.eliminar(50L));
    }
}
