package cl.sanmarcos.noticias.controller;

import cl.sanmarcos.noticias.model.Noticia;
import cl.sanmarcos.noticias.service.NoticiaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public ResponseEntity<List<Noticia>> listar() {
        return ResponseEntity.ok(noticiaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Noticia> buscarPorId(@PathVariable Long id) {
        return noticiaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Noticia> crear(@Valid @RequestBody Noticia noticia) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noticiaService.guardar(noticia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Noticia> actualizar(@PathVariable Long id, @Valid @RequestBody Noticia noticia) {
        return noticiaService.actualizar(id, noticia)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (noticiaService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
