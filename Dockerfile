# Etapa 1: Construir la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Ejecutar la aplicación
FROM node:18-alpine AS runner

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de producción desde el build anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instalar solo dependencias de producción
RUN npm install --frozen-lockfile --production

# Exponer el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación Next.js
CMD ["npm", "run", "start"]
