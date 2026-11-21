package cl.sanmarcos.medicamentos;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Medicamentos Service", version = "1.0",
		description = "API REST de medicamentos-service - Clinica Veterinaria San Marcos"))
public class MedicamentosServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicamentosServiceApplication.class, args);
	}
}
