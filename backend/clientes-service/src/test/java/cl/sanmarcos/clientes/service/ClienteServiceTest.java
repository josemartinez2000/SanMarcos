package cl.sanmarcos.clientes.service;

import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.repository.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente crearCliente() {
        return new Cliente(1L, "Camila Rojas", "cliente@gmail.com", "+56 9 1111 2222",
                "123456", "CLIENTE", LocalDateTime.now());
    }

    @Test
    void loginCorrectoDevuelveCliente() {
        when(clienteRepository.findByCorreo("cliente@gmail.com")).thenReturn(Optional.of(crearCliente()));

        Optional<Cliente> resultado = clienteService.login(" Cliente@Gmail.com ", "123456");

        assertTrue(resultado.isPresent());
        assertEquals("CLIENTE", resultado.get().getRol());
    }

    @Test
    void loginConContrasenaIncorrectaNoDevuelveCliente() {
        when(clienteRepository.findByCorreo("cliente@gmail.com")).thenReturn(Optional.of(crearCliente()));

        assertTrue(clienteService.login("cliente@gmail.com", "otra").isEmpty());
    }

    @Test
    void registrarAsignaRolClienteYNormalizaCorreo() {
        Cliente nuevo = crearCliente();
        nuevo.setCorreo("NUEVO@Gmail.com");
        nuevo.setRol("ADMIN");
        when(clienteRepository.save(any(Cliente.class))).thenAnswer(inv -> inv.getArgument(0));

        Cliente guardado = clienteService.registrar(nuevo);

        assertEquals("CLIENTE", guardado.getRol());
        assertEquals("nuevo@gmail.com", guardado.getCorreo());
    }
}
