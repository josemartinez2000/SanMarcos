package cl.sanmarcos.fichas.controller;

import cl.sanmarcos.fichas.config.SecurityConfig;
import cl.sanmarcos.fichas.service.FichaMedicaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FichaMedicaController.class)
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "app.jwt.secret=0123456789012345678901234567890123456789",
        "app.cors.origins=http://localhost:5173"})
class FichaMedicaControllerSecurityTest {

    private static final SimpleGrantedAuthority CLIENTE = new SimpleGrantedAuthority("ROLE_CLIENTE");

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private FichaMedicaService fichaMedicaService;

    @Test
    void sinTokenNoSePuedenConsultarFichas() throws Exception {
        mvc.perform(get("/api/fichas/cliente/cliente@gmail.com")).andExpect(status().isUnauthorized());
    }

    @Test
    void unClienteVeSusPropiasFichas() throws Exception {
        when(fichaMedicaService.listarPorCliente("cliente@gmail.com")).thenReturn(List.of());

        mvc.perform(get("/api/fichas/cliente/cliente@gmail.com")
                        .with(jwt().jwt(j -> j.subject("cliente@gmail.com")).authorities(CLIENTE)))
                .andExpect(status().isOk());
    }

    @Test
    void unClienteNoPuedeVerFichasDeOtroCorreo() throws Exception {
        mvc.perform(get("/api/fichas/cliente/juan.perez@email.com")
                        .with(jwt().jwt(j -> j.subject("cliente@gmail.com")).authorities(CLIENTE)))
                .andExpect(status().isForbidden());
    }

    @Test
    void elListadoCompletoYLaCreacionSonSoloParaAdmin() throws Exception {
        mvc.perform(get("/api/fichas").with(jwt().authorities(CLIENTE))).andExpect(status().isForbidden());
        mvc.perform(post("/api/fichas").with(jwt().authorities(CLIENTE))
                        .contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isForbidden());

        when(fichaMedicaService.listar()).thenReturn(List.of());
        mvc.perform(get("/api/fichas").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andExpect(status().isOk());
    }
}
