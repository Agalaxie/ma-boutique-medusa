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

# Attendre que la database soit prête, exécuter les migrations et démarrer
CMD ["sh", "-c", "sleep 15 && npx medusa db:migrate && node .medusa/server/main.js"]