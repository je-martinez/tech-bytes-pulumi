# Etapa 1: Build
FROM node:18-alpine AS builder

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación TypeScript a JavaScript
RUN npm run build

# Etapa 2: Production
FROM node:18-alpine

# Crear directorio de la aplicación en la imagen final
WORKDIR /app

# Copiar los archivos necesarios desde la etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
