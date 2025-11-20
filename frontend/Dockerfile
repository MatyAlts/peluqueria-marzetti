# Etapa 1: Compilar la aplicación
FROM node:20-alpine AS build
WORKDIR /app

# Argumento para la URL del API (ruta relativa por defecto para usar con Nginx)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN pnpm build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar los archivos compilados
COPY --from=build /app/dist .

# Copiar configuración personalizada de Nginx
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
