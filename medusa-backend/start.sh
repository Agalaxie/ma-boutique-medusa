#!/bin/bash

# Script de démarrage pour Railway
# Ce script lance le serveur Medusa correctement

echo "🚀 Starting Medusa backend..."
echo "📁 Current directory: $(pwd)"
echo "🔧 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"

# Vérifier que les variables d'environnement sont présentes
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL is not set"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Lancer le serveur Medusa avec npx pour éviter les problèmes de CLI
echo "🎯 Starting Medusa server on port $PORT..."
npx medusa@latest start --port $PORT --host 0.0.0.0
