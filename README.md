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

Cada microservicio de negocio sigue la arquitectura de 4 capas `model` → `repository` → `service` → `controller`, se registra en Eureka (`http://localhost:8761/eureka/`) y permite peticiones CORS desde `http://localhost:5173`.

### Base de datos y migraciones

- Conexión: `jdbc:mysql://localhost:3306/<nombre_bd>`, usuario `root`, contraseña vacía.
- Las bases de datos se crean automáticamente (`createDatabaseIfNotExist=true`).
- Flyway ejecuta los scripts de `src/main/resources/db/migracion/` de cada servicio:
  - `V1__crear_tablas.sql`: tablas, claves primarias `AUTO_INCREMENT`, `UNIQUE` y llaves foráneas.
  - `V2__datos_iniciales.sql`: datos iniciales (usuarios, 28 medicamentos/vacunas `ME001`–`ME028`, 25 servicios `SV001`–`SV025`, mascotas, fichas médicas y noticias).
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

El script abre una ventana por componente: primero `eureka-server`, espera a que responda y luego levanta los 5 microservicios y el frontend (`npm install` la primera vez y `npm run dev`). La primera ejecución tarda más porque Maven descarga las dependencias.

## Ejecución manual

En terminales separadas, empezando por Eureka:

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

- **Registro e inicio de sesión** contra `clientes-service`; la sesión (correo y rol `ADMIN`/`CLIENTE`) se guarda en `localStorage` y se redirige según el rol.
- **Catálogo de servicios** y **Medicamentos y vacunas** cargados desde MySQL, con detalle actualizado por ID.
- **Panel administrador:** listado de servicios y medicamentos, creación (`POST`), edición de todos los campos (`PUT`) y eliminación con confirmación (`DELETE`).
- **Fichas médicas:**
  - `ADMIN`: elige un cliente registrado, registra mascotas y crea, edita o elimina fichas.
  - `CLIENTE`: consulta en modo lectura sus mascotas y fichas.
- **Noticias:** listado desde `noticias-service`; el administrador puede publicar y eliminar noticias.

## Endpoints principales

| Servicio | Endpoints |
|---|---|
| Clientes | `POST /api/clientes/registro`, `POST /api/clientes/login`, `GET /api/clientes`, `PUT /api/clientes/{id}`, `DELETE /api/clientes/{id}` |
| Medicamentos | `GET/POST /api/medicamentos`, `GET/PUT/DELETE /api/medicamentos/{id}` |
| Servicios | `GET/POST /api/servicios`, `GET/PUT/DELETE /api/servicios/{id}` |
| Fichas | `GET/POST /api/mascotas`, `GET /api/mascotas/cliente/{correo}`, `PUT/DELETE /api/mascotas/{id}`, `GET/POST /api/fichas`, `GET /api/fichas/cliente/{correo}`, `PUT/DELETE /api/fichas/{id}` |
| Noticias | `GET/POST /api/noticias`, `PUT/DELETE /api/noticias/{id}` |

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
