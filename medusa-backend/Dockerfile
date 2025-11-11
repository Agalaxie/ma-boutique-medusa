FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build Medusa
RUN npm run build

# Exposer le port
EXPOSE 9000

# Démarrer directement avec Node
CMD ["node", ".medusa/server/main.js"]