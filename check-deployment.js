#!/usr/bin/env node

/**
 * Script de vérification du déploiement
 * Vérifie l'état du backend Railway et du frontend
 */

const https = require('https');

const RAILWAY_URL = 'https://ma-boutique-medusa-production.up.railway.app';

console.log('🔍 Vérification du déploiement Railway...\n');
console.log('═'.repeat(60));

// Test 1: Health endpoint
console.log('\n📋 Test 1: Health Check');
checkEndpoint(`${RAILWAY_URL}/health`, (statusCode, body) => {
  if (statusCode === 200) {
    console.log('   ✅ Backend en ligne! Status:', statusCode);
  } else {
    console.log('   ❌ Backend non disponible. Status:', statusCode);
    console.log('   📝 Réponse:', body);
  }

  // Test 2: API endpoint
  console.log('\n📋 Test 2: API Store Regions');
  checkEndpoint(`${RAILWAY_URL}/store/regions`, (statusCode, body) => {
    if (statusCode === 200) {
      console.log('   ✅ API fonctionne! Status:', statusCode);
    } else {
      console.log('   ⚠️  API non disponible. Status:', statusCode || 'Connection failed');
    }

    console.log('\n' + '═'.repeat(60));
    console.log('\n📊 Résumé du déploiement:\n');
    console.log('🌐 URL Railway: ' + RAILWAY_URL);
    console.log('\n💡 Actions recommandées:\n');
    console.log('1. Vérifiez les logs Railway:');
    console.log('   https://railway.app/dashboard');
    console.log('\n2. Si le déploiement échoue encore, essayez:');
    console.log('   - Vérifier que DATABASE_URL est bien configuré');
    console.log('   - Vérifier que toutes les variables d\'environnement sont présentes');
    console.log('   - Regarder les logs de build et de déploiement dans Railway');
    console.log('\n3. Une fois le backend en ligne, vous pourrez:');
    console.log('   - Déployer le frontend sur Vercel');
    console.log('   - Mettre à jour les CORS avec l\'URL Vercel');
    console.log('   - Créer votre premier compte admin');
    console.log('\n' + '═'.repeat(60));
  });
});

function checkEndpoint(url, callback) {
  const request = https.get(url, { timeout: 5000 }, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(res.statusCode, data);
    });
  });

  request.on('error', (error) => {
    console.log('   ❌ Erreur de connexion:', error.message);
    callback(null, error.message);
  });

  request.on('timeout', () => {
    console.log('   ⏱️  Timeout - Le serveur ne répond pas');
    request.destroy();
    callback(null, 'Timeout');
  });
}
