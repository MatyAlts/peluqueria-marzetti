@echo off
echo 🚀 Desplegando Peluqueria Marzetti...

REM Verificar que existe .env
if not exist .env (
    echo ❌ Error: No se encontro el archivo .env
    echo 💡 Copia .env.example a .env y configura tus variables
    exit /b 1
)

REM Detener contenedores existentes
echo 🛑 Deteniendo contenedores existentes...
docker-compose down

REM Reconstruir imagenes
echo 🔨 Construyendo imagenes...
docker-compose build --no-cache

REM Iniciar servicios
echo ▶️  Iniciando servicios...
docker-compose up -d

REM Esperar a que los servicios esten listos
echo ⏳ Esperando a que los servicios esten listos...
timeout /t 10 /nobreak > nul

REM Verificar estado
echo 📊 Estado de los servicios:
docker-compose ps

echo.
echo ✅ Despliegue completado!
echo 🌐 La aplicacion esta disponible en: http://localhost:8083
echo 📚 Swagger UI: http://localhost:8083/swagger-ui/index.html
echo.
echo 📝 Ver logs: docker-compose logs -f
