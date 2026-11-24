package cl.sanmarcos.clientes.dto;

import cl.sanmarcos.clientes.model.Cliente;

import java.time.LocalDateTime;

// Datos públicos del cliente: nunca incluye la contraseña
public record ClienteResponse(Long id, String nombreCompleto, String correo, String telefono,
                              String rol, LocalDateTime fechaRegistro) {

    public static ClienteResponse from(Cliente c) {
        return new ClienteResponse(c.getId(), c.getNombreCompleto(), c.getCorreo(), c.getTelefono(),
                c.getRol(), c.getFechaRegistro());
    }
}
