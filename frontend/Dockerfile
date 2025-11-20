# Etapa 1: Compilar la aplicación
FROM node:20-alpine AS build
WORKDIR /app

# Argumentos para variables de entorno
ARG VITE_API_URL=/api
ARG VITE_MERCADOPAGO_PUBLIC_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_MERCADOPAGO_PUBLIC_KEY=$VITE_MERCADOPAGO_PUBLIC_KEY

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
