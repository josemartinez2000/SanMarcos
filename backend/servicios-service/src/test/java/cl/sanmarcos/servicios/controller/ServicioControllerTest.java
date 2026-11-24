package cl.sanmarcos.servicios.controller;

import cl.sanmarcos.servicios.config.SecurityConfig;
import cl.sanmarcos.servicios.service.ServicioService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ServicioController.class)
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "app.jwt.secret=0123456789012345678901234567890123456789",
        "app.cors.origins=http://localhost:5173"})
class ServicioControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private ServicioService servicioService;

    @Test
    void elCatalogoEsPublico() throws Exception {
        when(servicioService.listar()).thenReturn(List.of());
        mvc.perform(get("/api/servicios")).andExpect(status().isOk());
    }

    @Test
    void editarSinTokenDevuelve401() throws Exception {
        mvc.perform(put("/api/servicios/1").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void duracionVaciaDevuelve400ConMensaje() throws Exception {
        mvc.perform(put("/api/servicios/1").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"SV001\",\"nombre\":\"Consulta\",\"categoria\":\"Consultas\",\"precio\":15000,\"duracion\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("La duración es obligatoria"));
    }
}
