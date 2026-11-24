package cl.sanmarcos.clientes.dto;

public record LoginResponse(String token, ClienteResponse usuario) {
}
