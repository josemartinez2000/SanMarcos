package cl.sanmarcos.servicios;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Servicios Service", version = "1.0",
		description = "API REST de servicios-service - Clinica Veterinaria San Marcos"))
public class ServiciosServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiciosServiceApplication.class, args);
	}
}
