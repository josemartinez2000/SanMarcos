-- Reemplaza las contraseñas de prueba en texto plano por su hash BCrypt.
-- Las claves de acceso siguen siendo las del README; cámbielas fuera de desarrollo.
UPDATE clientes SET password = '$2a$10$kAwZ3BwEb84eHacZ/Rdn6OWgLyCN542geOOsw8GbXRNeRPne9EYo2' WHERE correo = 'admin@sanmarcos.cl';
UPDATE clientes SET password = '$2a$10$8fT1nf0eZtJQwR7vJsPKI.NyNHgNxAWoGl1tzvlgEAUPtX/YzVs7a' WHERE correo = 'cliente@gmail.com';
UPDATE clientes SET password = '$2a$10$YkdObkqXhFNUCBUWY6V.neVezQz1EfWa2B.aAJfedsdayFHqSEL3y' WHERE correo = 'juan.perez@email.com';
UPDATE clientes SET password = '$2a$10$pIY09JOSRE.v0kJZJWlTGuCA7XQJNKwJr4dufGpzcYoEATut6MghW' WHERE correo = 'maria.silva@email.com';
