package cl.sanmarcos.medicamentos.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.LinkedHashMap;
import java.util.Map;

// Respuestas de error con el formato { "mensaje": "..." } que lee el frontend
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Map<String, Object>> validacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errores.putIfAbsent(e.getField(), e.getDefaultMessage()));
        String mensaje = errores.values().stream().findFirst().orElse("Datos inválidos");
        return ResponseEntity.badRequest().body(Map.of("mensaje", mensaje, "errores", errores));
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    ResponseEntity<Map<String, String>> peticionMalFormada() {
        return ResponseEntity.badRequest().body(Map.of("mensaje", "La petición tiene un formato inválido"));
    }

    // Duplicados por la restricción UNIQUE (por ejemplo, dos registros simultáneos)
    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<Map<String, String>> integridad() {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", "El dato ya existe o no cumple las restricciones permitidas"));
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<Map<String, String>> sinPermiso() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("mensaje", "No tiene permisos para realizar esta acción"));
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    ResponseEntity<Map<String, String>> versionDesactualizada() {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", "Otro usuario modificó este medicamento. Recargue e intente nuevamente."));
    }
}
