package cl.sanmarcos.clientes.security;

import cl.sanmarcos.clientes.model.Cliente;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

// Genera el token de sesión: sub = correo, rol = ADMIN/CLIENTE, uid = id del cliente
@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final long minutos;

    public JwtService(JwtEncoder encoder, @Value("${app.jwt.expira-minutos:60}") long minutos) {
        this.encoder = encoder;
        this.minutos = minutos;
    }

    public String generar(Cliente cliente) {
        Instant ahora = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(cliente.getCorreo())
                .issuedAt(ahora)
                .expiresAt(ahora.plus(minutos, ChronoUnit.MINUTES))
                .claim("rol", cliente.getRol())
                .claim("uid", cliente.getId())
                .build();
        JwsHeader cabecera = JwsHeader.with(MacAlgorithm.HS256).build();
        return encoder.encode(JwtEncoderParameters.from(cabecera, claims)).getTokenValue();
    }
}
