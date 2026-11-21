package cl.sanmarcos.fichas.service;

import cl.sanmarcos.fichas.model.Mascota;
import cl.sanmarcos.fichas.repository.MascotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {

    private final MascotaRepository mascotaRepository;

    public MascotaService(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    public List<Mascota> listar() {
        return mascotaRepository.findAll();
    }

    public Optional<Mascota> buscarPorId(Long id) {
        return mascotaRepository.findById(id);
    }

    public List<Mascota> listarPorCliente(String correoCliente) {
        return mascotaRepository.findByCorreoClienteOrderByNombreAsc(correoCliente.trim().toLowerCase());
    }

    public Mascota guardar(Mascota mascota) {
        mascota.setId(null);
        mascota.setCorreoCliente(mascota.getCorreoCliente().trim().toLowerCase());
        return mascotaRepository.save(mascota);
    }

    public Optional<Mascota> actualizar(Long id, Mascota datos) {
        return mascotaRepository.findById(id).map(mascota -> {
            mascota.setCorreoCliente(datos.getCorreoCliente().trim().toLowerCase());
            mascota.setNombre(datos.getNombre());
            mascota.setEspecie(datos.getEspecie());
            mascota.setRaza(datos.getRaza());
            mascota.setEdad(datos.getEdad());
            return mascotaRepository.save(mascota);
        });
    }

    // Al eliminar la mascota también se eliminan sus fichas (cascade)
    public boolean eliminar(Long id) {
        if (!mascotaRepository.existsById(id)) {
            return false;
        }
        mascotaRepository.deleteById(id);
        return true;
    }
}
