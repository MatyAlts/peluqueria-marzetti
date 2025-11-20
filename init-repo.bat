@echo off
echo 🎯 Inicializando repositorio de Peluqueria Marzetti...
echo.

REM Verificar si Git esta instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Git no esta instalado
    echo 💡 Descarga Git desde: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Verificar si .env existe
if not exist .env (
    echo ⚠️  Advertencia: No se encontro el archivo .env
    echo 💡 Copia .env.example a .env y configura tus variables
    echo.
    set /p continue="¿Deseas continuar sin .env? (s/n): "
    if /i not "%continue%"=="s" (
        echo Cancelado.
        pause
        exit /b 1
    )
)

echo.
echo 📝 Ingresa la URL de tu repositorio de GitHub:
echo Ejemplo: https://github.com/TU_USUARIO/peluqueria-marzetti-fullstack.git
set /p repo_url="URL: "

if "%repo_url%"=="" (
    echo ❌ Error: Debe ingresar una URL
    pause
    exit /b 1
)

echo.
echo 🔄 Inicializando Git...
git init

echo.
echo 📦 Agregando archivos...
git add .

echo.
echo 💾 Creando primer commit...
git commit -m "Initial commit: Full stack Peluqueria Marzetti application"

echo.
echo 🔗 Conectando con GitHub...
git remote add origin %repo_url%

echo.
echo 📤 Subiendo codigo a GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ ¡Repositorio creado exitosamente!
echo.
echo 📋 Proximos pasos:
echo 1. Ve a EasyPanel y crea un nuevo proyecto
echo 2. Conecta el repositorio de GitHub
echo 3. Configura las variables de entorno (ver DEPLOY.md)
echo 4. Configura el dominio y activa HTTPS
echo 5. Deploy!
echo.
echo 📚 Lee DEPLOY.md para instrucciones detalladas
echo.
pause
