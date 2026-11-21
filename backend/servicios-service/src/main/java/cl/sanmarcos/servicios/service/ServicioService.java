package cl.sanmarcos.servicios.service;

import cl.sanmarcos.servicios.model.Servicio;
import cl.sanmarcos.servicios.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> listar() {
        return servicioRepository.findAll();
    }

    public Optional<Servicio> buscarPorId(Long id) {
        return servicioRepository.findById(id);
    }

    // Indica si el código ya lo usa otro servicio distinto al indicado (idActual puede ser null)
    public boolean codigoEnUso(String codigo, Long idActual) {
        return servicioRepository.findByCodigo(codigo.trim().toUpperCase())
                .filter(servicio -> !servicio.getId().equals(idActual))
                .isPresent();
    }

    public Servicio guardar(Servicio servicio) {
        servicio.setId(null);
        servicio.setCodigo(servicio.getCodigo().trim().toUpperCase());
        return servicioRepository.save(servicio);
    }

    public Optional<Servicio> actualizar(Long id, Servicio datos) {
        return servicioRepository.findById(id).map(servicio -> {
            servicio.setCodigo(datos.getCodigo().trim().toUpperCase());
            servicio.setNombre(datos.getNombre());
            servicio.setCategoria(datos.getCategoria());
            servicio.setPrecio(datos.getPrecio());
            servicio.setDuracion(datos.getDuracion());
            servicio.setImagen(datos.getImagen());
            servicio.setDetalles(datos.getDetalles());
            return servicioRepository.save(servicio);
        });
    }

    public boolean eliminar(Long id) {
        if (!servicioRepository.existsById(id)) {
            return false;
        }
        servicioRepository.deleteById(id);
        return true;
    }
}
