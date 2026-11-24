package cl.sanmarcos.clientes.service;

import cl.sanmarcos.clientes.dto.ActualizarRequest;
import cl.sanmarcos.clientes.dto.RegistroRequest;
import cl.sanmarcos.clientes.exception.CorreoDuplicadoException;
import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.repository.ClienteRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
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

    // Todo registro público se crea con rol CLIENTE y la contraseña se guarda con BCrypt
    public Cliente registrar(RegistroRequest datos) {
        String correo = normalizarCorreo(datos.correo());
        if (clienteRepository.existsByCorreo(correo)) {
            throw new CorreoDuplicadoException();
        }
        Cliente cliente = new Cliente();
        cliente.setNombreCompleto(datos.nombreCompleto().trim());
        cliente.setCorreo(correo);
        cliente.setTelefono(datos.telefono());
        cliente.setPassword(passwordEncoder.encode(datos.password()));
        cliente.setRol("CLIENTE");
        cliente.setFechaRegistro(LocalDateTime.now());
        try {
            return clienteRepository.save(cliente);
        } catch (DataIntegrityViolationException e) {
            // Dos registros simultáneos con el mismo correo
            throw new CorreoDuplicadoException();
        }
    }

    public Optional<Cliente> login(String correo, String password) {
        if (correo == null || password == null) {
            return Optional.empty();
        }
        return clienteRepository.findByCorreo(normalizarCorreo(correo))
                .filter(cliente -> passwordEncoder.matches(password, cliente.getPassword()));
    }

    public Optional<Cliente> actualizar(Long id, ActualizarRequest datos, boolean quienEditaEsAdmin) {
        return clienteRepository.findById(id).map(cliente -> {
            if (datos.nombreCompleto() != null && !datos.nombreCompleto().isBlank()) {
                cliente.setNombreCompleto(datos.nombreCompleto().trim());
            }
            if (datos.telefono() != null) {
                cliente.setTelefono(datos.telefono());
            }
            if (datos.password() != null && !datos.password().isBlank()) {
                cliente.setPassword(passwordEncoder.encode(datos.password()));
            }
            // Solo un administrador puede cambiar roles
            if (quienEditaEsAdmin && ("ADMIN".equals(datos.rol()) || "CLIENTE".equals(datos.rol()))) {
                cliente.setRol(datos.rol());
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
