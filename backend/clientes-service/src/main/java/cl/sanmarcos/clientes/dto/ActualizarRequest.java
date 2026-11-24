package cl.sanmarcos.clientes.dto;

import jakarta.validation.constraints.Size;

// El correo no es editable (las mascotas lo usan como referencia); el rol solo lo cambia un ADMIN
public record ActualizarRequest(
        @Size(max = 100, message = "El nombre no puede superar los 100 caracteres") String nombreCompleto,
        @Size(max = 20, message = "El teléfono no puede superar los 20 caracteres") String telefono,
        @Size(min = 8, max = 72, message = "La contraseña debe tener entre 8 y 72 caracteres") String password,
        String rol) {
}
