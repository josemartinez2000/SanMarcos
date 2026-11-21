package cl.sanmarcos.medicamentos.service;

import cl.sanmarcos.medicamentos.model.Medicamento;
import cl.sanmarcos.medicamentos.repository.MedicamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;

    public MedicamentoService(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }

    public List<Medicamento> listar() {
        return medicamentoRepository.findAll();
    }

    public Optional<Medicamento> buscarPorId(Long id) {
        return medicamentoRepository.findById(id);
    }

    // Indica si el código ya lo usa otro medicamento distinto al indicado (idActual puede ser null)
    public boolean codigoEnUso(String codigo, Long idActual) {
        return medicamentoRepository.findByCodigo(codigo.trim().toUpperCase())
                .filter(medicamento -> !medicamento.getId().equals(idActual))
                .isPresent();
    }

    public Medicamento guardar(Medicamento medicamento) {
        medicamento.setId(null);
        medicamento.setCodigo(medicamento.getCodigo().trim().toUpperCase());
        return medicamentoRepository.save(medicamento);
    }

    public Optional<Medicamento> actualizar(Long id, Medicamento datos) {
        return medicamentoRepository.findById(id).map(medicamento -> {
            medicamento.setCodigo(datos.getCodigo().trim().toUpperCase());
            medicamento.setNombre(datos.getNombre());
            medicamento.setCategoria(datos.getCategoria());
            medicamento.setPrecio(datos.getPrecio());
            medicamento.setStock(datos.getStock());
            medicamento.setImagen(datos.getImagen());
            medicamento.setDetalles(datos.getDetalles());
            return medicamentoRepository.save(medicamento);
        });
    }

    public boolean eliminar(Long id) {
        if (!medicamentoRepository.existsById(id)) {
            return false;
        }
        medicamentoRepository.deleteById(id);
        return true;
    }
}
