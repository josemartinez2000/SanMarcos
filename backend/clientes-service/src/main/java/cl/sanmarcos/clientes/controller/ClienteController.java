package cl.sanmarcos.clientes.controller;

import cl.sanmarcos.clientes.dto.ActualizarRequest;
import cl.sanmarcos.clientes.dto.ClienteResponse;
import cl.sanmarcos.clientes.dto.LoginRequest;
import cl.sanmarcos.clientes.dto.LoginResponse;
import cl.sanmarcos.clientes.dto.RegistroRequest;
import cl.sanmarcos.clientes.exception.CredencialesInvalidasException;
import cl.sanmarcos.clientes.model.Cliente;
import cl.sanmarcos.clientes.security.JwtService;
import cl.sanmarcos.clientes.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
@RequestMapping("/api/clientes")
public class ClienteController {

    // Un ADMIN puede todo; un cliente solo sobre su propio registro (claim uid del token)
    private static final String ADMIN_O_PROPIETARIO =
            "hasRole('ADMIN') or #jwt.claims['uid'].toString() == #id.toString()";

    private final ClienteService clienteService;
    private final JwtService jwtService;

    public ClienteController(ClienteService clienteService, JwtService jwtService) {
        this.clienteService = clienteService;
        this.jwtService = jwtService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClienteResponse> listar() {
        return clienteService.listar().stream().map(ClienteResponse::from).toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize(ADMIN_O_PROPIETARIO)
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return clienteService.buscarPorId(id)
                .map(c -> ResponseEntity.ok(ClienteResponse.from(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/registro")
    public ResponseEntity<ClienteResponse> registrar(@Valid @RequestBody RegistroRequest datos) {
        Cliente nuevo = clienteService.registrar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(ClienteResponse.from(nuevo));
    }

    // Devuelve { token, usuario }; el token se envía luego en el encabezado Authorization
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest login) {
        Cliente cliente = clienteService.login(login.correo(), login.password())
                .orElseThrow(CredencialesInvalidasException::new);
        return new LoginResponse(jwtService.generar(cliente), ClienteResponse.from(cliente));
    }

    @PutMapping("/{id}")
    @PreAuthorize(ADMIN_O_PROPIETARIO)
    public ResponseEntity<ClienteResponse> actualizar(@PathVariable Long id,
                                                      @Valid @RequestBody ActualizarRequest datos,
                                                      @AuthenticationPrincipal Jwt jwt) {
        boolean esAdmin = "ADMIN".equals(jwt.getClaimAsString("rol"));
        return clienteService.actualizar(id, datos, esAdmin)
                .map(c -> ResponseEntity.ok(ClienteResponse.from(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (clienteService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
