package cl.sanmarcos.noticias.controller;

import cl.sanmarcos.noticias.config.SecurityConfig;
import cl.sanmarcos.noticias.service.NoticiaService;
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

@WebMvcTest(NoticiaController.class)
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "app.jwt.secret=0123456789012345678901234567890123456789",
        "app.cors.origins=http://localhost:5173"})
class NoticiaControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private NoticiaService noticiaService;

    @Test
    void lasNoticiasSonPublicas() throws Exception {
        when(noticiaService.listar()).thenReturn(List.of());
        mvc.perform(get("/api/noticias")).andExpect(status().isOk());
    }

    @Test
    void unClienteNoPuedeEliminarNoticias() throws Exception {
        mvc.perform(delete("/api/noticias/1").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_CLIENTE"))))
                .andExpect(status().isForbidden());
    }

    @Test
    void publicarSinTituloDevuelve400ConMensaje() throws Exception {
        mvc.perform(post("/api/noticias").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"\",\"resumen\":\"Resumen\",\"contenido\":\"Contenido\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensaje").value("El título es obligatorio"));
    }
}
