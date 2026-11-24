package cl.sanmarcos.clientes.controller;

import cl.sanmarcos.clientes.config.SecurityConfig;
import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.security.JwtService;
import cl.sanmarcos.clientes.service.ClienteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ClienteController.class)
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "app.jwt.secret=0123456789012345678901234567890123456789",
        "app.cors.origins=http://localhost:5173"})
class ClienteControllerSecurityTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private ClienteService clienteService;

    @MockitoBean
    private JwtService jwtService;

    private Cliente cliente(Long id) {
        return new Cliente(id, "Camila Rojas", "cliente@gmail.com", "", "HASH", "CLIENTE", LocalDateTime.now());
    }

    @Test
    void listarSinTokenDevuelve401() throws Exception {
        mvc.perform(get("/api/clientes")).andExpect(status().isUnauthorized());
    }

    @Test
    void listarComoClienteDevuelve403() throws Exception {
        mvc.perform(get("/api/clientes").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_CLIENTE"))))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.mensaje").value("No tiene permisos para realizar esta acción"));
    }

    @Test
    void listarComoAdminDevuelve200() throws Exception {
        when(clienteService.listar()).thenReturn(List.of());
        mvc.perform(get("/api/clientes").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andExpect(status().isOk());
    }

    @Test
    void unClienteSoloPuedeVerSuPropioRegistro() throws Exception {
        when(clienteService.buscarPorId(2L)).thenReturn(Optional.of(cliente(2L)));

        mvc.perform(get("/api/clientes/2").with(jwt().jwt(j -> j.claim("uid", 1L))
                        .authorities(new SimpleGrantedAuthority("ROLE_CLIENTE"))))
                .andExpect(status().isForbidden());
        mvc.perform(get("/api/clientes/2").with(jwt().jwt(j -> j.claim("uid", 2L))
                        .authorities(new SimpleGrantedAuthority("ROLE_CLIENTE"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void loginIncorrectoDevuelve401ConMensaje() throws Exception {
        when(clienteService.login(any(), any())).thenReturn(Optional.empty());

        mvc.perform(post("/api/clientes/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"correo\":\"cliente@gmail.com\",\"password\":\"mala\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.mensaje").value("Correo o contraseña incorrectos"));
    }

    @Test
    void loginCorrectoDevuelveTokenYUsuario() throws Exception {
        when(clienteService.login(any(), any())).thenReturn(Optional.of(cliente(2L)));
        when(jwtService.generar(any())).thenReturn("token-firmado");

        mvc.perform(post("/api/clientes/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"correo\":\"cliente@gmail.com\",\"password\":\"123456\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token-firmado"))
                .andExpect(jsonPath("$.usuario.rol").value("CLIENTE"));
    }

    @Test
    void registroConClaveCortaDevuelve400ConMensaje() throws Exception {
        mvc.perform(post("/api/clientes/registro").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nombreCompleto\":\"Pedro\",\"correo\":\"pedro@gmail.com\",\"password\":\"123\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("La contraseña debe tener entre 8 y 72 caracteres"));
    }
}
