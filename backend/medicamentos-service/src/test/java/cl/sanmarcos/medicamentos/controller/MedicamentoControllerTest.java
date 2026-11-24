package cl.sanmarcos.medicamentos.controller;

import cl.sanmarcos.medicamentos.config.SecurityConfig;
import cl.sanmarcos.medicamentos.service.MedicamentoService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MedicamentoController.class)
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "app.jwt.secret=0123456789012345678901234567890123456789",
        "app.cors.origins=http://localhost:5173"})
class MedicamentoControllerTest {

    private static final SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority("ROLE_ADMIN");

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private MedicamentoService medicamentoService;

    @Test
    void elCatalogoEsPublico() throws Exception {
        when(medicamentoService.listar()).thenReturn(List.of());
        mvc.perform(get("/api/medicamentos")).andExpect(status().isOk());
    }

    @Test
    void crearSinTokenDevuelve401YComoClienteDevuelve403() throws Exception {
        String cuerpo = "{\"codigo\":\"ME099\",\"nombre\":\"Prueba\",\"categoria\":\"Test\",\"precio\":1000,\"stock\":1}";
        mvc.perform(post("/api/medicamentos").contentType(MediaType.APPLICATION_JSON).content(cuerpo))
                .andExpect(status().isUnauthorized());
        mvc.perform(post("/api/medicamentos").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_CLIENTE")))
                        .contentType(MediaType.APPLICATION_JSON).content(cuerpo))
                .andExpect(status().isForbidden());
    }

    @Test
    void precioNegativoDevuelve400ConMensaje() throws Exception {
        mvc.perform(post("/api/medicamentos").with(jwt().authorities(ADMIN))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"ME099\",\"nombre\":\"Prueba\",\"categoria\":\"Test\",\"precio\":-5,\"stock\":1}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("El precio no puede ser negativo"));
    }

    @Test
    void codigoMuyLargoDevuelve400ConMensaje() throws Exception {
        mvc.perform(post("/api/medicamentos").with(jwt().authorities(ADMIN))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"ME0123456789\",\"nombre\":\"Prueba\",\"categoria\":\"Test\",\"precio\":5,\"stock\":1}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("El código no puede superar los 10 caracteres"));
    }

    @Test
    void jsonMalFormadoDevuelve400() throws Exception {
        mvc.perform(post("/api/medicamentos").with(jwt().authorities(ADMIN))
                        .contentType(MediaType.APPLICATION_JSON).content("{ no es json"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("La petición tiene un formato inválido"));
    }

    @Test
    void eliminarComoAdminInexistenteDevuelve404() throws Exception {
        when(medicamentoService.eliminar(99L)).thenReturn(false);
        mvc.perform(delete("/api/medicamentos/99").with(jwt().authorities(ADMIN)))
                .andExpect(status().isNotFound());
    }
}
