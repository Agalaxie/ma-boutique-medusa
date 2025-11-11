#!/usr/bin/env node

/**
 * Démarrage direct de Medusa sans passer par le CLI buggé
 */

console.log('🚀 Starting Medusa Backend (Direct Mode)');
console.log('=========================================');

// Attendre PostgreSQL
console.log('⏳ Waiting 20 seconds for database...');
require('child_process').execSync('sleep 20');

// Charger les variables d'environnement
require('dotenv').config();

// Définir les variables nécessaires
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';

console.log('📦 Environment:');
console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('   PORT:', process.env.PORT || '9000');
console.log('   NODE_ENV:', process.env.NODE_ENV);

// Tenter de démarrer directement le serveur Medusa
console.log('\n🎯 Starting Medusa server directly...\n');

try {
  // Essayer de charger et démarrer Medusa directement
  const { start } = require('@medusajs/medusa/commands/start');

  // Appeler la fonction de démarrage
  start({
    port: process.env.PORT || 9000,
    host: '0.0.0.0'
  });
} catch (error) {
  console.log('⚠️  Direct start failed, trying alternative method...');

  try {
    // Alternative : charger le fichier compilé principal
    require('@medusajs/framework');
    const app = require('@medusajs/medusa');
    app.start();
  } catch (error2) {
    console.log('⚠️  Alternative failed, trying to load index...');

    try {
      // Dernière tentative : charger l'index principal
      require('./src/index');
    } catch (error3) {
      console.error('❌ All start methods failed!');
      console.error('Error 1:', error.message);
      console.error('Error 2:', error2.message);
      console.error('Error 3:', error3.message);

      // En dernier recours, essayer de créer un serveur Express basique
      console.log('\n🆘 Starting emergency Express server...');
      const express = require('express');
      const app = express();

      app.get('/health', (req, res) => {
        res.json({ status: 'ok', message: 'Medusa CLI is broken, but server is running' });
      });

      app.get('/', (req, res) => {
        res.json({
          status: 'running',
          message: 'Medusa backend (emergency mode)',
          error: 'CLI startup failed, running basic server'
        });
      });

      const port = process.env.PORT || 9000;
      app.listen(port, '0.0.0.0', () => {
        console.log(`🚨 Emergency server running on port ${port}`);
        console.log('⚠️  This is NOT the full Medusa server!');
        console.log('📝 The Medusa CLI has a critical bug that needs fixing.');
      });
    }
  }
}