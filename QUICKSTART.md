# ⚡ Inicio Rápido

## 🚀 Despliegue Local

```bash
# 1. Copiar y configurar variables de entorno
copy .env.example .env
# Edita .env con tus valores

# 2. Desplegar
deploy.bat

# 3. Abrir en navegador
# http://localhost:8083
```

## 🌐 Despliegue en EasyPanel

```bash
# 1. Subir a GitHub
init-repo.bat
# Pega la URL de tu repositorio cuando se solicite

# 2. En EasyPanel:
# - Crear proyecto
# - Deploy from GitHub
# - Seleccionar tu repositorio
# - Configurar variables de entorno (copiar de .env)
# - Configurar dominio y activar HTTPS
# - Deploy

# 3. ¡Listo! Tu app estará en línea
```

## 📚 Documentación Completa

- **README.md** - Información general del proyecto
- **DEPLOY.md** - Guía detallada de despliegue paso a paso
- **.env.example** - Plantilla de variables de entorno

## 🎯 Arquitectura

```
┌─────────────────────────────────────┐
│           Nginx (Puerto 8083)       │
│         Reverse Proxy + SSL         │
└─────────┬───────────────────┬───────┘
          │                   │
    ┌─────▼──────┐     ┌─────▼──────┐
    │  Frontend  │     │  Backend   │
    │  (React)   │     │ (Spring)   │
    │  Puerto 80 │     │ Puerto 8080│
    └────────────┘     └─────┬──────┘
                             │
                       ┌─────▼──────┐
                       │ PostgreSQL │
                       │   (DB)     │
                       └────────────┘
```

## ✨ Características

- ✅ Frontend y Backend en un solo repositorio
- ✅ Docker Compose para despliegue fácil
- ✅ Nginx como proxy inverso
- ✅ Sin problemas de CORS (mismo dominio)
- ✅ SSL/HTTPS automático con Let's Encrypt
- ✅ Base de datos PostgreSQL con persistencia
- ✅ Deploy automático desde GitHub
- ✅ Variables de entorno seguras

## 🔧 Comandos Útiles

```bash
# Ver logs
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Detener todo
docker-compose down

# Reconstruir desde cero
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 🆘 ¿Necesitas ayuda?

Lee **DEPLOY.md** para troubleshooting y guía detallada.
