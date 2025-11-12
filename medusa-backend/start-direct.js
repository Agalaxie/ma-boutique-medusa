#!/usr/bin/env node

/**
 * Démarrage direct de Medusa v2
 */

async function startMedusa() {
  console.log('🚀 Starting Medusa v2 Backend');
  console.log('===============================');

  // Attendre que la base de données soit prête
  console.log('⏳ Waiting for database...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  try {
    // Charger Medusa v2
    const { Medusa } = require('@medusajs/framework');

    console.log('📦 Loading Medusa application...');

    // Créer l'application
    const medusa = await Medusa({
      projectConfig: {
        database_url: process.env.DATABASE_URL,
        http: {
          host: '0.0.0.0',
          port: parseInt(process.env.PORT || '9000'),
          cors: process.env.ADMIN_CORS || process.env.STORE_CORS || '*',
          admin_cors: process.env.ADMIN_CORS || '*',
          store_cors: process.env.STORE_CORS || '*',
        }
      }
    });

    console.log('🎯 Starting HTTP server...');

    // Démarrer le serveur
    await medusa.start();

    console.log(`✅ Medusa is running on port ${process.env.PORT || 9000}`);

  } catch (error) {
    console.error('❌ Failed to start Medusa:', error);

    // Fallback: démarrer le mock server
    console.log('\n🆘 Starting mock server as fallback...');
    require('./mock-server.js');
  }
}

startMedusa().catch(console.error);