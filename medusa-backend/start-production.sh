#!/bin/sh

echo "🚀 Starting Medusa Production Server"
echo "======================================"

# Attendre que PostgreSQL soit prêt
echo "⏳ Waiting for database to be ready..."
sleep 15

# Exécuter les migrations
echo "📦 Running database migrations..."
npx medusa db:migrate

# Vérifier si les migrations ont réussi
if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migrations failed!"
    exit 1
fi

# Démarrer le serveur
echo "🎯 Starting Medusa server..."
node .medusa/server/main.js