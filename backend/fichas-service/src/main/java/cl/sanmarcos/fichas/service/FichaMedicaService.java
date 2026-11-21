package cl.sanmarcos.fichas.service;

import cl.sanmarcos.fichas.model.FichaMedica;
import cl.sanmarcos.fichas.model.Mascota;
import cl.sanmarcos.fichas.repository.FichaMedicaRepository;
import cl.sanmarcos.fichas.repository.MascotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FichaMedicaService {

    private final FichaMedicaRepository fichaMedicaRepository;
    private final MascotaRepository mascotaRepository;

    public FichaMedicaService(FichaMedicaRepository fichaMedicaRepository, MascotaRepository mascotaRepository) {
        this.fichaMedicaRepository = fichaMedicaRepository;
        this.mascotaRepository = mascotaRepository;
    }

    public List<FichaMedica> listar() {
        return fichaMedicaRepository.findAllByOrderByFechaAtencionDesc();
    }

    public Optional<FichaMedica> buscarPorId(Long id) {
        return fichaMedicaRepository.findById(id);
    }

    public List<FichaMedica> listarPorCliente(String correoCliente) {
        return fichaMedicaRepository.findByMascotaCorreoClienteOrderByFechaAtencionDesc(correoCliente.trim().toLowerCase());
    }

    public List<FichaMedica> listarPorMascota(Long mascotaId) {
        return fichaMedicaRepository.findByMascotaIdOrderByFechaAtencionDesc(mascotaId);
    }

    // Devuelve vacío si la mascota indicada no existe
    public Optional<FichaMedica> crear(FichaMedica ficha) {
        Optional<Mascota> mascota = buscarMascota(ficha);
        if (mascota.isEmpty()) {
            return Optional.empty();
        }
        ficha.setId(null);
        ficha.setMascota(mascota.get());
        return Optional.of(fichaMedicaRepository.save(ficha));
    }

    public Optional<FichaMedica> actualizar(Long id, FichaMedica datos) {
        return fichaMedicaRepository.findById(id).map(ficha -> {
            buscarMascota(datos).ifPresent(ficha::setMascota);
            ficha.setMotivoConsulta(datos.getMotivoConsulta());
            ficha.setDiagnostico(datos.getDiagnostico());
            ficha.setTratamiento(datos.getTratamiento());
            ficha.setVeterinario(datos.getVeterinario());
            ficha.setEstado(datos.getEstado());
            ficha.setFechaAtencion(datos.getFechaAtencion());
            return fichaMedicaRepository.save(ficha);
        });
    }

    public boolean eliminar(Long id) {
        if (!fichaMedicaRepository.existsById(id)) {
            return false;
        }
        fichaMedicaRepository.deleteById(id);
        return true;
    }

    private Optional<Mascota> buscarMascota(FichaMedica ficha) {
        if (ficha.getMascota() == null || ficha.getMascota().getId() == null) {
            return Optional.empty();
        }
        return mascotaRepository.findById(ficha.getMascota().getId());
    }
}
