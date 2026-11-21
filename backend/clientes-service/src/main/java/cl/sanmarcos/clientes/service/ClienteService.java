package cl.sanmarcos.clientes.service;

import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    public boolean existeCorreo(String correo) {
        return clienteRepository.existsByCorreo(normalizarCorreo(correo));
    }

    // Todo registro público se crea con rol CLIENTE
    public Cliente registrar(Cliente cliente) {
        cliente.setId(null);
        cliente.setCorreo(normalizarCorreo(cliente.getCorreo()));
        cliente.setRol("CLIENTE");
        cliente.setFechaRegistro(LocalDateTime.now());
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> login(String correo, String password) {
        if (correo == null || password == null) {
            return Optional.empty();
        }
        return clienteRepository.findByCorreo(normalizarCorreo(correo))
                .filter(cliente -> cliente.getPassword().equals(password));
    }

    public Optional<Cliente> actualizar(Long id, Cliente datos) {
        return clienteRepository.findById(id).map(cliente -> {
            if (datos.getNombreCompleto() != null && !datos.getNombreCompleto().isBlank()) {
                cliente.setNombreCompleto(datos.getNombreCompleto());
            }
            if (datos.getCorreo() != null && !datos.getCorreo().isBlank()) {
                cliente.setCorreo(normalizarCorreo(datos.getCorreo()));
            }
            if (datos.getTelefono() != null) {
                cliente.setTelefono(datos.getTelefono());
            }
            // La contraseña solo se cambia si viene informada
            if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
                cliente.setPassword(datos.getPassword());
            }
            if ("ADMIN".equals(datos.getRol()) || "CLIENTE".equals(datos.getRol())) {
                cliente.setRol(datos.getRol());
            }
            return clienteRepository.save(cliente);
        });
    }

    public boolean eliminar(Long id) {
        if (!clienteRepository.existsById(id)) {
            return false;
        }
        clienteRepository.deleteById(id);
        return true;
    }

    private String normalizarCorreo(String correo) {
        return correo == null ? null : correo.trim().toLowerCase();
    }
}
