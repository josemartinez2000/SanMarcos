package cl.sanmarcos.fichas;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Fichas Service", version = "1.0",
		description = "API REST de fichas-service - Clinica Veterinaria San Marcos"))
public class FichasServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FichasServiceApplication.class, args);
	}
}
