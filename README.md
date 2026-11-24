# Clínica Veterinaria San Marcos

Aplicación web de la Clínica Veterinaria San Marcos: catálogo de servicios clínicos, farmacia (medicamentos y vacunas), noticias, panel de administración y fichas médicas de mascotas por cliente.

- **Frontend:** React 19 + TypeScript + Vite + Bootstrap 5 (Atomic Design: `atoms`, `molecules`, `organism`, `pages`).
- **Backend:** microservicios Spring Boot 3.5 (Java 17) registrados en **Eureka**, con **MySQL (XAMPP)**, migraciones **Flyway** y documentación **Swagger / OpenAPI**.

---

## Arquitectura

| Componente | Puerto | Base de datos | Documentación |
|---|---|---|---|
| `backend/eureka-server` | 8761 | — | Panel: http://localhost:8761 |
| `backend/clientes-service` | 8081 | `sanmarcos_clientes` | http://localhost:8081/swagger-ui.html |
| `backend/medicamentos-service` | 8082 | `sanmarcos_medicamentos` | http://localhost:8082/swagger-ui.html |
| `backend/servicios-service` | 8083 | `sanmarcos_servicios` | http://localhost:8083/swagger-ui.html |
| `backend/fichas-service` | 8084 | `sanmarcos_fichas` | http://localhost:8084/swagger-ui.html |
| `backend/noticias-service` | 8085 | `sanmarcos_noticias` | http://localhost:8085/swagger-ui.html |
| `FrontEnd` (Vite) | 5173 | — | http://localhost:5173 |

La especificación OpenAPI en JSON de cada microservicio está en `http://localhost:<puerto>/v3/api-docs`.

Cada microservicio de negocio sigue la arquitectura de 4 capas `model` → `repository` → `service` → `controller`, se registra en Eureka (`http://localhost:8761/eureka/`) y permite peticiones CORS desde los orígenes de `CORS_ORIGINS` (por defecto `http://localhost:5173`).

### Seguridad

- `clientes-service` valida la contraseña con **BCrypt** y el login devuelve `{ token, usuario }`: un **JWT** (HS256, 60 minutos) con el correo en `sub` y el rol en el claim `rol`.
- El frontend envía el token en el encabezado `Authorization: Bearer <token>`; los otros 4 servicios validan el mismo token con el secreto compartido `JWT_SECRET`.
- Permisos: el catálogo, los medicamentos y las noticias son de lectura pública y solo un `ADMIN` puede crear, editar o eliminar. Un `CLIENTE` solo consulta sus propias mascotas y fichas; el resto de `fichas-service` y la lista de usuarios son solo para `ADMIN`.
- Los errores responden siempre con `{ "mensaje": "..." }` (validaciones 400, sin sesión 401, sin permiso 403, duplicados o versión desactualizada 409).

| Variable | Uso | Valor por defecto |
|---|---|---|
| `JWT_SECRET` | Firma de los tokens (mínimo 32 caracteres) | **Obligatoria** (`iniciar-todo.bat` genera una temporal si no existe) |
| `DB_USER` / `DB_PASSWORD` | Credenciales de MySQL | `root` / vacía |
| `CORS_ORIGINS` | Orígenes permitidos del frontend | `http://localhost:5173` |
| `SWAGGER_ENABLED` | Habilita Swagger UI y `/v3/api-docs` | `true` |
| `EUREKA_SELF_PRESERVATION` | Autopreservación de Eureka | `false` |

### Base de datos y migraciones

- Conexión: `jdbc:mysql://localhost:3306/<nombre_bd>`, credenciales `DB_USER` / `DB_PASSWORD` (por defecto `root` sin contraseña).
- Las bases de datos se crean automáticamente (`createDatabaseIfNotExist=true`).
- Flyway ejecuta los scripts de `src/main/resources/db/migracion/` de cada servicio:
  - `V1__crear_tablas.sql`: tablas, claves primarias `AUTO_INCREMENT`, `UNIQUE` y llaves foráneas.
  - `V2__datos_iniciales.sql`: datos iniciales (usuarios, 28 medicamentos/vacunas `ME001`–`ME028`, 25 servicios `SV001`–`SV025`, mascotas, fichas médicas y noticias).
  - `V3` en `clientes-service` reemplaza las contraseñas de prueba por su hash BCrypt; `V3` en `medicamentos-service` agrega la columna `version` (control de concurrencia del stock).
- Hibernate trabaja con `spring.jpa.hibernate.ddl-auto=validate`: solo valida que las entidades coincidan con las tablas creadas por Flyway.
- En `fichas-service` existe una relación real **1 a N**: `fichas_medicas.mascota_id` → `mascotas.id` con `ON DELETE CASCADE`.

---

## Requisitos

- **Java 17** o superior (JDK) en el `PATH` o con `JAVA_HOME` configurado.
- **Node.js 20.19+ o 22.12+** con npm.
- **XAMPP** con MySQL/MariaDB iniciado en el puerto 3306.
- No es necesario instalar Maven: cada servicio incluye Maven Wrapper (`mvnw` / `mvnw.cmd`).

---

## Ejecución rápida (Windows)

1. Inicie **MySQL** desde el panel de control de XAMPP.
2. Haga doble clic en **`iniciar-todo.bat`** (raíz del proyecto).

El script abre una ventana por componente: primero `eureka-server`, espera hasta 2 minutos a que responda y luego levanta los 5 microservicios y el frontend (`npm install` la primera vez y `npm run dev`). Si `JWT_SECRET` no está definida, genera una clave aleatoria para esa sesión y todas las ventanas la heredan (las sesiones se invalidan al reiniciar). La primera ejecución tarda más porque Maven descarga las dependencias.

## Ejecución manual

Defina primero `JWT_SECRET` con la **misma** clave en todas las terminales de los microservicios (PowerShell):

```powershell
$env:JWT_SECRET = "una-clave-larga-y-aleatoria-de-32-caracteres-o-mas"
```

Luego, en terminales separadas y empezando por Eureka:

```bash
cd backend/eureka-server        && mvnw spring-boot:run
cd backend/clientes-service     && mvnw spring-boot:run
cd backend/medicamentos-service && mvnw spring-boot:run
cd backend/servicios-service    && mvnw spring-boot:run
cd backend/fichas-service       && mvnw spring-boot:run
cd backend/noticias-service     && mvnw spring-boot:run

cd FrontEnd
npm install
npm run dev
```

(En Linux/macOS use `./mvnw` en lugar de `mvnw`.)

---

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@sanmarcos.cl` | `admin123` |
| Cliente | `cliente@gmail.com` | `123456` |

El cliente de prueba tiene asociadas las mascotas *Firulais*, *Michi* y *Kiwi* con sus fichas médicas.

## Funcionalidades

- **Registro e inicio de sesión** contra `clientes-service` (contraseñas nuevas de 8 a 72 caracteres); el token, el correo y el rol (`ADMIN`/`CLIENTE`) se guardan en `localStorage` y se redirige según el rol. Si el token expira, se pide iniciar sesión de nuevo.
- **Catálogo de servicios** y **Medicamentos y vacunas** cargados desde MySQL, con detalle actualizado por ID.
- **Panel administrador:** listado de servicios y medicamentos, creación (`POST`), edición de todos los campos (`PUT`) y eliminación con confirmación (`DELETE`).
- **Fichas médicas:**
  - `ADMIN`: elige un cliente registrado, registra mascotas y crea, edita o elimina fichas.
  - `CLIENTE`: consulta en modo lectura sus mascotas y fichas.
- **Noticias:** listado desde `noticias-service`; el administrador puede publicar y eliminar noticias.

## Endpoints principales

| Servicio | Endpoints | Acceso |
|---|---|---|
| Clientes | `POST /api/clientes/registro`, `POST /api/clientes/login` | Público |
| Clientes | `GET /api/clientes`, `DELETE /api/clientes/{id}` | `ADMIN` |
| Clientes | `GET/PUT /api/clientes/{id}` | `ADMIN` o el propio cliente |
| Medicamentos | `GET /api/medicamentos`, `GET /api/medicamentos/{id}` | Público |
| Medicamentos | `POST /api/medicamentos`, `PUT/DELETE /api/medicamentos/{id}` | `ADMIN` |
| Servicios | `GET /api/servicios`, `GET /api/servicios/{id}` | Público |
| Servicios | `POST /api/servicios`, `PUT/DELETE /api/servicios/{id}` | `ADMIN` |
| Fichas | `GET /api/mascotas/cliente/{correo}`, `GET /api/fichas/cliente/{correo}` | `ADMIN` o el dueño del correo |
| Fichas | Resto de `/api/mascotas` y `/api/fichas` | `ADMIN` |
| Noticias | `GET /api/noticias` | Público |
| Noticias | `POST /api/noticias`, `PUT/DELETE /api/noticias/{id}` | `ADMIN` |

Para probar endpoints protegidos en Swagger, haga login, copie el `token` y péguelo en el botón **Authorize**.

---

## Pruebas

Frontend (Vitest + Testing Library, con `fetch` simulado):

```bash
cd FrontEnd
npm test -- --run
```

Backend (JUnit 5 + Mockito sobre la capa de servicio), en cada microservicio:

```bash
mvnw test
```

## Estructura

```
SanMarcos/
├── backend/
│   ├── eureka-server/
│   ├── clientes-service/
│   ├── medicamentos-service/
│   ├── servicios-service/
│   ├── fichas-service/
│   └── noticias-service/
├── FrontEnd/
│   ├── public/img/          imágenes de servicios, medicamentos y noticias
│   └── src/
│       ├── atoms/  molecules/  organism/  pages/
│       ├── services/api.ts  URLs de los microservicios, tipos y utilidades
│       └── Test/            pruebas unitarias
├── iniciar-todo.bat
└── README.md
```
