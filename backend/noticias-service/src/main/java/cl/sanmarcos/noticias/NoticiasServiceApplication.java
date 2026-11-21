package cl.sanmarcos.noticias;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Noticias Service", version = "1.0",
		description = "API REST de noticias-service - Clinica Veterinaria San Marcos"))
public class NoticiasServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoticiasServiceApplication.class, args);
	}
}
