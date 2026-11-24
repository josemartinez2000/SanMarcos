package cl.sanmarcos.medicamentos.service;

import cl.sanmarcos.medicamentos.model.Medicamento;
import cl.sanmarcos.medicamentos.repository.MedicamentoRepository;
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
class MedicamentoServiceTest {

    @Mock
    private MedicamentoRepository medicamentoRepository;

    @InjectMocks
    private MedicamentoService medicamentoService;

    private Medicamento crearMedicamento() {
        return new Medicamento(4L, "ME004", "Nexgard", "Antiparasitarios", 9500, 60,
                "/img/Nexgard.jpg", "Principio activo: Afoxolaner", 0L);
    }

    @Test
    void codigoEnUsoDetectaDuplicadoDeOtroRegistro() {
        when(medicamentoRepository.findByCodigo("ME004")).thenReturn(Optional.of(crearMedicamento()));

        assertTrue(medicamentoService.codigoEnUso("me004", null));
        assertFalse(medicamentoService.codigoEnUso("ME004", 4L));
    }

    @Test
    void actualizarModificaPrecioYStock() {
        Medicamento datos = crearMedicamento();
        datos.setPrecio(10000);
        datos.setStock(15);
        when(medicamentoRepository.findById(4L)).thenReturn(Optional.of(crearMedicamento()));
        when(medicamentoRepository.save(any(Medicamento.class))).thenAnswer(inv -> inv.getArgument(0));

        Medicamento actualizado = medicamentoService.actualizar(4L, datos).orElseThrow();

        assertEquals(10000, actualizado.getPrecio());
        assertEquals(15, actualizado.getStock());
    }

    @Test
    void eliminarDevuelveFalseSiNoExiste() {
        when(medicamentoRepository.existsById(99L)).thenReturn(false);

        assertFalse(medicamentoService.eliminar(99L));
    }
}
