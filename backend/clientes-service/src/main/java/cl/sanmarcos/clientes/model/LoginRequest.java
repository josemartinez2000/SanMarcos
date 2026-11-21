package cl.sanmarcos.clientes.model;

import lombok.Data;

// Datos que envía el formulario de inicio de sesión
@Data
public class LoginRequest {

    private String correo;
    private String password;
}
