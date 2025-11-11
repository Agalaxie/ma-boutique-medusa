#!/usr/bin/env node

/**
 * Script de démarrage direct pour Railway
 * Contourne le bug du CLI Medusa v2
 */

// Charger les variables d'environnement
require('dotenv').config();

// Définir le port et l'host
process.env.PORT = process.env.PORT || '9000';
process.env.HOST = '0.0.0.0';

console.log('🚀 Starting Medusa server...');
console.log(`📦 Port: ${process.env.PORT}`);
console.log(`🌐 Host: ${process.env.HOST}`);
console.log(`🔗 Database URL: ${process.env.DATABASE_URL ? 'Connected' : 'Not set'}`);

// Essayer de démarrer le serveur compilé
try {
  // Après le build, Medusa génère un fichier main.js
  require('./.medusa/server/main.js');
} catch (error) {
  console.error('❌ Failed to start from compiled build:', error.message);

  // Alternative: essayer de démarrer via l'index
  try {
    require('./dist/main.js');
  } catch (error2) {
    console.error('❌ Failed to start from dist:', error2.message);

    // Dernière tentative : démarrer via le framework
    try {
      const { start } = require('@medusajs/framework');
      start();
    } catch (error3) {
      console.error('❌ Failed to start via framework:', error3.message);
      process.exit(1);
    }
  }
}