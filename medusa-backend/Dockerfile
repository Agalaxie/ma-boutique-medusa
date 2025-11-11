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

# Copier le script de démarrage
COPY start-production.sh .
RUN chmod +x start-production.sh

# Exposer le port
EXPOSE 9000

# Utiliser le script de démarrage
CMD ["./start-production.sh"]