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
    // Utiliser directement le framework Medusa pour les migrations
    const { runMigrations } = require('@medusajs/framework/database');

    await runMigrations();
    console.log('✅ Migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Migration error:', error.message);

    // Alternative: essayer avec la CLI
    try {
      console.log('🔄 Trying alternative migration method...');
      execSync('npx medusa db:migrate', { stdio: 'inherit' });
      console.log('✅ Migrations completed (alternative method)!');
      return true;
    } catch (cliError) {
      console.error('❌ CLI migration also failed:', cliError.message);

      // Continuer quand même - peut-être que les tables existent déjà
      console.log('⚠️  Continuing anyway - tables might already exist...');
      return false;
    }
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
  require('./.medusa/server/main.js');
}

// Exécuter le script
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});