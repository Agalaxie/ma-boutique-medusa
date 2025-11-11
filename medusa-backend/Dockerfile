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

# Utiliser le script Node.js pour les migrations et le démarrage
CMD ["node", "init-and-start.js"]