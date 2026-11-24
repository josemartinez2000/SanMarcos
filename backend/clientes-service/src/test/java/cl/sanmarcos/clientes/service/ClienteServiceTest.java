package cl.sanmarcos.clientes.service;

import cl.sanmarcos.clientes.dto.ActualizarRequest;
import cl.sanmarcos.clientes.dto.RegistroRequest;
import cl.sanmarcos.clientes.exception.CorreoDuplicadoException;
import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.repository.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente crearCliente() {
        return new Cliente(1L, "Camila Rojas", "cliente@gmail.com", "+56 9 1111 2222",
                "HASH", "CLIENTE", LocalDateTime.now());
    }

    @Test
    void loginCorrectoDevuelveCliente() {
        when(clienteRepository.findByCorreo("cliente@gmail.com")).thenReturn(Optional.of(crearCliente()));
        when(passwordEncoder.matches("123456", "HASH")).thenReturn(true);

        Optional<Cliente> resultado = clienteService.login(" Cliente@Gmail.com ", "123456");

        assertTrue(resultado.isPresent());
        assertEquals("CLIENTE", resultado.get().getRol());
    }

    @Test
    void loginConContrasenaIncorrectaNoDevuelveCliente() {
        when(clienteRepository.findByCorreo("cliente@gmail.com")).thenReturn(Optional.of(crearCliente()));
        when(passwordEncoder.matches("otra", "HASH")).thenReturn(false);

        assertTrue(clienteService.login("cliente@gmail.com", "otra").isEmpty());
    }

    @Test
    void registrarAsignaRolClienteHasheaLaClaveYNormalizaElCorreo() {
        when(clienteRepository.existsByCorreo("nuevo@gmail.com")).thenReturn(false);
        when(passwordEncoder.encode("clave1234")).thenReturn("HASH");
        when(clienteRepository.save(any(Cliente.class))).thenAnswer(inv -> inv.getArgument(0));

        Cliente guardado = clienteService.registrar(
                new RegistroRequest("Pedro González", "NUEVO@Gmail.com", null, "clave1234"));

        assertEquals("CLIENTE", guardado.getRol());
        assertEquals("nuevo@gmail.com", guardado.getCorreo());
        assertEquals("HASH", guardado.getPassword());
    }

    @Test
    void registrarFallaSiElCorreoYaExiste() {
        when(clienteRepository.existsByCorreo("cliente@gmail.com")).thenReturn(true);

        assertThrows(CorreoDuplicadoException.class, () -> clienteService.registrar(
                new RegistroRequest("Camila", "cliente@gmail.com", null, "clave1234")));
        verify(clienteRepository, never()).save(any());
    }

    @Test
    void soloUnAdminPuedeCambiarElRol() {
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(crearCliente()));
        when(clienteRepository.save(any(Cliente.class))).thenAnswer(inv -> inv.getArgument(0));
        ActualizarRequest datos = new ActualizarRequest(null, null, null, "ADMIN");

        assertEquals("CLIENTE", clienteService.actualizar(1L, datos, false).orElseThrow().getRol());
        assertEquals("ADMIN", clienteService.actualizar(1L, datos, true).orElseThrow().getRol());
    }
}
