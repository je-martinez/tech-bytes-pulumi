# Etapa de construcción
FROM --platform=linux/amd64 node:18-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto
EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
