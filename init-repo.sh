#!/bin/bash

echo "🎯 Inicializando repositorio de Peluquería Marzetti..."
echo ""

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git no está instalado"
    echo "💡 Instala Git desde: https://git-scm.com/"
    exit 1
fi

# Verificar si .env existe
if [ ! -f .env ]; then
    echo "⚠️  Advertencia: No se encontró el archivo .env"
    echo "💡 Copia .env.example a .env y configura tus variables"
    echo ""
    read -p "¿Deseas continuar sin .env? (s/n): " continue
    if [ "$continue" != "s" ] && [ "$continue" != "S" ]; then
        echo "Cancelado."
        exit 1
    fi
fi

echo ""
echo "📝 Ingresa la URL de tu repositorio de GitHub:"
echo "Ejemplo: https://github.com/TU_USUARIO/peluqueria-marzetti-fullstack.git"
read -p "URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ Error: Debe ingresar una URL"
    exit 1
fi

echo ""
echo "🔄 Inicializando Git..."
git init

echo ""
echo "📦 Agregando archivos..."
git add .

echo ""
echo "💾 Creando primer commit..."
git commit -m "Initial commit: Full stack Peluquería Marzetti application"

echo ""
echo "🔗 Conectando con GitHub..."
git remote add origin "$repo_url"

echo ""
echo "📤 Subiendo código a GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ ¡Repositorio creado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a EasyPanel y crea un nuevo proyecto"
echo "2. Conecta el repositorio de GitHub"
echo "3. Configura las variables de entorno (ver DEPLOY.md)"
echo "4. Configura el dominio y activa HTTPS"
echo "5. Deploy!"
echo ""
echo "📚 Lee DEPLOY.md para instrucciones detalladas"
echo ""
