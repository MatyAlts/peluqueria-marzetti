# Peluquería Marzetti - Full Stack Application

Sistema completo de gestión para Peluquería Marzetti con frontend React y backend Spring Boot.

## 🚀 Estructura del Proyecto

```
.
├── backend/          # Spring Boot API
├── frontend/         # React + Vite
├── docker-compose.yml
├── nginx-full.conf
└── .env
```

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- Git

## 🛠️ Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd peluqueria-marzetti
```

### 2. Configurar variables de entorno

Copiar el archivo de ejemplo y configurar:

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
# Base de datos
DB_USERNAME=postgres
DB_PASSWORD=tu_password_seguro

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_token
MERCADOPAGO_PUBLIC_KEY=tu_public_key
```

### 3. Desplegar

```bash
docker-compose up -d
```

La aplicación estará disponible en:
- **Frontend + Backend**: http://localhost:8083
- **API**: http://localhost:8083/api
- **Swagger UI**: http://localhost:8083/swagger-ui/index.html

## 📦 Servicios

- **Frontend**: React + Vite servido por Nginx
- **Backend**: Spring Boot API
- **Base de datos**: PostgreSQL
- **Proxy**: Nginx (enruta todo el tráfico)

## 🔧 Comandos Útiles

### Ver logs
```bash
docker-compose logs -f [servicio]
```

### Reiniciar un servicio
```bash
docker-compose restart [servicio]
```

### Detener todo
```bash
docker-compose down
```

### Detener y eliminar volúmenes (⚠️ borra la BD)
```bash
docker-compose down -v
```

### Reconstruir imágenes
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 Despliegue en EasyPanel

### 1. Subir código a GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. En EasyPanel

1. Crear nuevo proyecto
2. Seleccionar "Deploy from GitHub"
3. Conectar tu repositorio
4. EasyPanel detectará automáticamente el `docker-compose.yml`
5. Configurar variables de entorno en EasyPanel (copiar desde .env)
6. Configurar dominio y activar HTTPS
7. Deploy!

### 3. Configuración del dominio

En EasyPanel, asignar un dominio al servicio `nginx` en el puerto 80.

## 🔐 Seguridad

- Cambiar todas las contraseñas del `.env.example`
- Usar JWT_SECRET largo y aleatorio
- Configurar CORS solo para dominios específicos en producción
- No commitear el archivo `.env` (ya está en .gitignore)

## 📝 Notas

- El frontend hace peticiones a `/api` (ruta relativa), Nginx las redirige al backend
- No hay problemas de CORS porque todo va bajo el mismo dominio
- La base de datos no está expuesta externamente
- Los logs se pueden ver con `docker-compose logs`

## 🐛 Troubleshooting

### Backend no conecta a la base de datos
```bash
docker-compose logs db
docker-compose logs backend
```

### Frontend no carga
```bash
docker-compose logs frontend
docker-compose logs nginx
```

### Reconstruir desde cero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📄 Licencia

Propietario: Peluquería Marzetti
