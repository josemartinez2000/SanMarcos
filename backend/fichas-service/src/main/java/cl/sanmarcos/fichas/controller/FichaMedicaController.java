package cl.sanmarcos.fichas.controller;

import cl.sanmarcos.fichas.model.FichaMedica;
import cl.sanmarcos.fichas.service.FichaMedicaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/fichas")
public class FichaMedicaController {

    private final FichaMedicaService fichaMedicaService;

    public FichaMedicaController(FichaMedicaService fichaMedicaService) {
        this.fichaMedicaService = fichaMedicaService;
    }

    @GetMapping
    public ResponseEntity<List<FichaMedica>> listar() {
        return ResponseEntity.ok(fichaMedicaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaMedica> buscarPorId(@PathVariable Long id) {
        return fichaMedicaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Fichas de todas las mascotas de un cliente (consulta del dueño)
    // Un cliente solo puede consultar su propio correo (el JWT lo lleva en sub)
    @GetMapping("/cliente/{correo}")
    @PreAuthorize("hasRole('ADMIN') or #correo.equalsIgnoreCase(authentication.name)")
    public ResponseEntity<List<FichaMedica>> listarPorCliente(@PathVariable String correo) {
        return ResponseEntity.ok(fichaMedicaService.listarPorCliente(correo));
    }

    @GetMapping("/mascota/{mascotaId}")
    public ResponseEntity<List<FichaMedica>> listarPorMascota(@PathVariable Long mascotaId) {
        return ResponseEntity.ok(fichaMedicaService.listarPorMascota(mascotaId));
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody FichaMedica ficha) {
        Optional<FichaMedica> creada = fichaMedicaService.crear(ficha);
        if (creada.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "La mascota indicada no existe"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(creada.get());
    }

    // Permite editar diagnóstico, tratamiento, estado y demás datos de la ficha
    @PutMapping("/{id}")
    public ResponseEntity<FichaMedica> actualizar(@PathVariable Long id, @Valid @RequestBody FichaMedica ficha) {
        return fichaMedicaService.actualizar(id, ficha)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (fichaMedicaService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
