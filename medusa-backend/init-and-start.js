#!/usr/bin/env node

/**
 * Script d'initialisation et de démarrage pour Railway
 * Exécute les migrations puis démarre le serveur
 */

const { execSync } = require('child_process');

console.log('🚀 Railway Production Startup Script');
console.log('=====================================');

// Fonction pour attendre
function sleep(seconds) {
  console.log(`⏳ Waiting ${seconds} seconds for database...`);
  execSync(`sleep ${seconds}`);
}

// Fonction pour exécuter les migrations
async function runMigrations() {
  console.log('📦 Running database migrations...');

  try {
    // Pour Medusa v2, utiliser la commande migrations
    console.log('🔄 Running Medusa migrations...');
    execSync('npx medusa migrations run', { stdio: 'inherit' });
    console.log('✅ Migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Migration error:', error.message);

    // Essayer de créer les tables manuellement
    try {
      console.log('🔄 Trying to sync database schema...');
      // Démarrer temporairement le serveur pour créer les tables
      execSync('timeout 10 npx medusa start', { stdio: 'inherit' });
    } catch (syncError) {
      // Ignorer l'erreur de timeout, c'est normal
    }

    console.log('⚠️  Continuing - tables might have been created...');
    return false;
  }
}

// Fonction principale
async function main() {
  // Attendre que PostgreSQL soit prêt
  sleep(20);

  // Exécuter les migrations
  await runMigrations();

  // Démarrer le serveur
  console.log('🎯 Starting Medusa server...');

  // Essayer différents chemins possibles
  try {
    require('./.medusa/server/main.js');
  } catch (e1) {
    try {
      console.log('📂 Trying alternative path...');
      require('./dist/main.js');
    } catch (e2) {
      console.log('📂 Using npm script to start...');
      execSync('npx medusa start', { stdio: 'inherit' });
    }
  }
}

// Exécuter le script
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});