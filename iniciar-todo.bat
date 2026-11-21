@echo off
chcp 65001 > nul
title Clinica Veterinaria San Marcos - Inicio
set "RAIZ=%~dp0"

echo ==========================================================
echo   Clinica Veterinaria San Marcos - Inicio de servicios
echo ==========================================================
echo.
echo Antes de continuar inicie MySQL desde el panel de XAMPP
echo (localhost:3306, usuario root sin contrasena).
echo Las bases de datos y tablas se crean solas con Flyway.
echo.
pause

echo.
echo [1/7] Iniciando eureka-server en el puerto 8761...
start "eureka-server (8761)" /D "%RAIZ%backend\eureka-server" cmd /k mvnw.cmd spring-boot:run

echo Esperando a que Eureka responda en http://localhost:8761 ...
:esperarEureka
timeout /t 5 /nobreak > nul
curl -s -o nul http://localhost:8761/ || goto esperarEureka
echo Eureka disponible.
echo.

echo [2/7] Iniciando clientes-service en el puerto 8081...
start "clientes-service (8081)" /D "%RAIZ%backend\clientes-service" cmd /k mvnw.cmd spring-boot:run
timeout /t 5 /nobreak > nul

echo [3/7] Iniciando medicamentos-service en el puerto 8082...
start "medicamentos-service (8082)" /D "%RAIZ%backend\medicamentos-service" cmd /k mvnw.cmd spring-boot:run
timeout /t 5 /nobreak > nul

echo [4/7] Iniciando servicios-service en el puerto 8083...
start "servicios-service (8083)" /D "%RAIZ%backend\servicios-service" cmd /k mvnw.cmd spring-boot:run
timeout /t 5 /nobreak > nul

echo [5/7] Iniciando fichas-service en el puerto 8084...
start "fichas-service (8084)" /D "%RAIZ%backend\fichas-service" cmd /k mvnw.cmd spring-boot:run
timeout /t 5 /nobreak > nul

echo [6/7] Iniciando noticias-service en el puerto 8085...
start "noticias-service (8085)" /D "%RAIZ%backend\noticias-service" cmd /k mvnw.cmd spring-boot:run
timeout /t 5 /nobreak > nul

echo [7/7] Iniciando frontend (Vite) en el puerto 5173...
if exist "%RAIZ%FrontEnd\node_modules" (
    start "frontend (5173)" /D "%RAIZ%FrontEnd" cmd /k npm run dev
) else (
    start "frontend (5173)" /D "%RAIZ%FrontEnd" cmd /k "npm install && npm run dev"
)

echo.
echo ==========================================================
echo   Todo fue lanzado en ventanas separadas.
echo.
echo   Frontend ............ http://localhost:5173
echo   Panel Eureka ........ http://localhost:8761
echo   Swagger clientes .... http://localhost:8081/swagger-ui.html
echo   Swagger medicamentos  http://localhost:8082/swagger-ui.html
echo   Swagger servicios ... http://localhost:8083/swagger-ui.html
echo   Swagger fichas ...... http://localhost:8084/swagger-ui.html
echo   Swagger noticias .... http://localhost:8085/swagger-ui.html
echo.
echo   Los microservicios tardan unos segundos en registrarse en Eureka.
echo   Para detener todo, cierre cada ventana o presione Ctrl+C en ellas.
echo ==========================================================
pause
