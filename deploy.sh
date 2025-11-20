#!/bin/bash

echo "🚀 Desplegando Peluquería Marzetti..."

# Verificar que existe .env
if [ ! -f .env ]; then
    echo "❌ Error: No se encontró el archivo .env"
    echo "💡 Copia .env.example a .env y configura tus variables"
    exit 1
fi

# Detener contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Reconstruir imágenes
echo "🔨 Construyendo imágenes..."
docker-compose build --no-cache

# Iniciar servicios
echo "▶️  Iniciando servicios..."
docker-compose up -d

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 10

# Verificar estado
echo "📊 Estado de los servicios:"
docker-compose ps

echo ""
echo "✅ Despliegue completado!"
echo "🌐 La aplicación está disponible en: http://localhost:8083"
echo "📚 Swagger UI: http://localhost:8083/swagger-ui/index.html"
echo ""
echo "📝 Ver logs: docker-compose logs -f"
