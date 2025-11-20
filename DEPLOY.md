# 🚀 Guía de Despliegue - GitHub + EasyPanel

## Paso 1: Preparar el repositorio

### 1.1 Crear repositorio en GitHub
1. Ve a GitHub y crea un nuevo repositorio (por ejemplo: `peluqueria-marzetti-fullstack`)
2. NO inicialices con README, .gitignore o license (ya los tenemos)

### 1.2 Inicializar Git y subir código

```bash
# Desde la raíz del proyecto
cd c:\Proyectos\peluqueria-marzetti

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Full stack application"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/peluqueria-marzetti-fullstack.git

# Subir código
git push -u origin main
```

## Paso 2: Configurar EasyPanel

### 2.1 Crear nuevo proyecto
1. Inicia sesión en EasyPanel
2. Click en **"Create Project"**
3. Nombre: `peluqueria-marzetti`

### 2.2 Conectar GitHub
1. En el proyecto, click en **"Create Service"**
2. Selecciona **"Deploy from GitHub"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio `peluqueria-marzetti-fullstack`
5. Rama: `main`
6. EasyPanel detectará automáticamente el `docker-compose.yml`

### 2.3 Configurar variables de entorno

En EasyPanel, ve a **Environment Variables** y agrega:

```env
# Base de datos
DB_USERNAME=postgres
DB_PASSWORD=tu_password_super_seguro
DB_URL=jdbc:postgresql://db:5432/peluqueria_marzetti
DB_DRIVER=org.postgresql.Driver

# JWT
JWT_SECRET=tu_jwt_secret_muy_largo_y_aleatorio
JWT_EXPIRATION=86400000

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago
MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_mercadopago

# OpenAPI / Swagger
API_DOCS_PATH=/api-docs
SWAGGER_UI_PATH=/swagger-ui.html

# Logging
LOG_LEVEL=INFO

# CORS (opcional si todo va por mismo dominio)
CORS_ALLOWED_ORIGINS=*

# Frontend
VITE_API_URL=/api
```

⚠️ **IMPORTANTE**: Genera valores seguros para:
- `DB_PASSWORD`: Usa un generador de contraseñas
- `JWT_SECRET`: String largo y aleatorio (mínimo 32 caracteres)

### 2.4 Configurar dominio

1. En EasyPanel, ve a **Domains**
2. Click en **"Add Domain"**
3. Selecciona el servicio: **nginx**
4. Puerto: **80**
5. Dominio: `tu-dominio.com` o usa el subdominio gratuito
6. ✅ Activa **HTTPS** (Let's Encrypt automático)
7. Guarda

### 2.5 Deploy

1. Click en **"Deploy"**
2. EasyPanel comenzará a:
   - Clonar el repositorio
   - Construir las imágenes de Docker
   - Iniciar los contenedores
   - Generar certificado SSL

⏳ Este proceso puede tomar 5-10 minutos la primera vez.

## Paso 3: Verificar el despliegue

### 3.1 Verificar servicios
En EasyPanel, ve a **Services** y verifica que estén corriendo:
- ✅ `db` (PostgreSQL)
- ✅ `backend` (Spring Boot)
- ✅ `frontend` (React)
- ✅ `nginx` (Proxy)

### 3.2 Probar la aplicación

1. **Frontend**: https://tu-dominio.com
2. **API**: https://tu-dominio.com/api/products
3. **Swagger**: https://tu-dominio.com/swagger-ui/index.html

### 3.3 Ver logs

En EasyPanel:
1. Ve a **Logs**
2. Selecciona el servicio (backend, frontend, nginx)
3. Revisa si hay errores

## Paso 4: Actualizar la aplicación

Cada vez que hagas cambios:

```bash
# Hacer cambios en el código
# ...

# Commit
git add .
git commit -m "Descripción de cambios"

# Push
git push origin main
```

**EasyPanel detectará automáticamente el push y re-desplegará** 🎉

## 🔧 Troubleshooting

### El backend no conecta a la base de datos
- Verifica las variables de entorno en EasyPanel
- Revisa los logs del servicio `db`
- Verifica que `DB_URL` sea `jdbc:postgresql://db:5432/peluqueria_marzetti`

### Error 502 Bad Gateway
- Los servicios aún se están iniciando, espera 1-2 minutos
- Revisa los logs de `backend` y `nginx`

### Frontend muestra página en blanco
- Revisa los logs del servicio `frontend`
- Verifica que `VITE_API_URL=/api`
- Limpia la caché del navegador (Ctrl+Shift+R)

### Error de CORS
Si configuraste todo bien con Nginx, NO deberías tener errores de CORS porque frontend y backend comparten el mismo dominio.

### Certificado SSL no se genera
- Verifica que el dominio esté correctamente apuntado a EasyPanel
- Espera 5-10 minutos, Let's Encrypt puede tardar
- Revisa los logs del servicio `nginx`

## 🎯 Ventajas de esta configuración

✅ **Un solo repositorio**: Todo el código junto, fácil de mantener
✅ **Un solo dominio**: Sin problemas de CORS
✅ **Deploy automático**: Push a GitHub = Deploy automático
✅ **SSL gratuito**: Let's Encrypt automático
✅ **Fácil rollback**: Si algo falla, revertir el commit en Git
✅ **Logs centralizados**: Todo en EasyPanel
✅ **Escalable**: Fácil agregar más servicios

## 📝 Notas importantes

- El archivo `.env` NO se sube a GitHub (está en .gitignore)
- Configura las variables de entorno directamente en EasyPanel
- Los datos de la base de datos persisten en un volumen Docker
- Para backup de DB, usa `docker exec` o herramientas de EasyPanel

## 🔐 Seguridad

- ✅ Usa contraseñas fuertes
- ✅ JWT_SECRET debe ser aleatorio y largo
- ✅ Activa HTTPS siempre
- ✅ En producción, cambia `LOG_LEVEL` a `INFO` o `WARN`
- ✅ Configura CORS específicamente (no uses `*` en producción)
