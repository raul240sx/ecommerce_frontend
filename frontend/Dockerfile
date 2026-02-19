FROM node:20-alpine

WORKDIR /usr/src/app

# Preparamos el directorio con los permisos correctos
RUN chown node:node /usr/src/app

# Instalamos dependencias (esto se hace como root para evitar problemas de caché)
COPY --chown=node:node package*.json ./
RUN npm install

# Copiamos el código fuente
COPY --chown=node:node . .

# El "Fix" para Vite: creamos la carpeta de optimización y aseguramos node_modules
RUN mkdir -p node_modules/.vite && chown -R node:node /usr/src/app/node_modules

# Cambiamos al usuario limitado para la ejecución
USER node

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]