#!/usr/bin/env node

/**
 * Script de déploiement automatisé
 * Déploie votre boutique Medusa sur Railway (backend) et Vercel (frontend)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.production' });

console.log('🚀 Déploiement de votre Boutique Medusa\n');
console.log('═'.repeat(60));

// Vérifier que les tokens sont présents
const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const RAILWAY_TOKEN = process.env.RAILWAY_API_TOKEN;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLIC = process.env.NEXT_PUBLIC_STRIPE_KEY;

if (!VERCEL_TOKEN || !RAILWAY_TOKEN || !STRIPE_SECRET || !STRIPE_PUBLIC) {
  console.error('❌ Erreur: Tokens manquants!');
  console.error('   Vérifiez le fichier .env.production');
  process.exit(1);
}

console.log('✅ Tokens chargés avec succès\n');

// Étape 1: Vérifier Git
console.log('📋 Étape 1: Vérification Git...');
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.log('   ⚠️  Changements non committés détectés');
    console.log('   💾 Commit en cours...');
    execSync('git add .');
    execSync('git commit -m "Pre-deployment: preparing for production"');
    console.log('   ✅ Changements committés');
  } else {
    console.log('   ✅ Repository propre');
  }
} catch (error) {
  console.error('   ❌ Erreur Git:', error.message);
}

console.log('\n' + '═'.repeat(60));
console.log('📝 Instructions pour le déploiement:\n');

console.log('🔷 ÉTAPE A: Déployer le Backend sur Railway\n');
console.log('1. Allez sur: https://railway.app/new');
console.log('2. Cliquez sur "Deploy from GitHub repo"');
console.log('3. Sélectionnez votre repository');
console.log('4. Railway détectera le backend automatiquement');
console.log('5. Cliquez sur "+ New" → "Database" → "Add PostgreSQL"');
console.log('\n6. Ajoutez ces variables d\'environnement dans Railway:\n');
console.log('   DATABASE_URL=${{Postgres.DATABASE_URL}}');
console.log('   JWT_SECRET=' + generateSecret());
console.log('   COOKIE_SECRET=' + generateSecret());
console.log('   STRIPE_API_KEY=' + STRIPE_SECRET);
console.log('   STORE_CORS=https://VOTRE-SITE.vercel.app');
console.log('   ADMIN_CORS=https://VOTRE-SITE.vercel.app');
console.log('   AUTH_CORS=https://VOTRE-SITE.vercel.app');
console.log('   MEDUSA_ADMIN_ONBOARDING_TYPE=default');
console.log('\n7. Notez l\'URL Railway (ex: https://xxx.up.railway.app)');

console.log('\n' + '═'.repeat(60));
console.log('🔷 ÉTAPE B: Déployer le Frontend sur Vercel\n');
console.log('1. Allez sur: https://vercel.com/new');
console.log('2. Importez votre repository GitHub');
console.log('3. Vercel détectera Next.js automatiquement');
console.log('\n4. Ajoutez ces variables d\'environnement dans Vercel:\n');
console.log('   MEDUSA_BACKEND_URL=https://xxx.up.railway.app  (votre URL Railway)');
console.log('   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test');
console.log('   NEXT_PUBLIC_BASE_URL=https://VOTRE-SITE.vercel.app');
console.log('   NEXT_PUBLIC_DEFAULT_REGION=us');
console.log('   NEXT_PUBLIC_STRIPE_KEY=' + STRIPE_PUBLIC);
console.log('   REVALIDATE_SECRET=' + generateSecret());
console.log('\n5. Cliquez sur "Deploy"');

console.log('\n' + '═'.repeat(60));
console.log('🔷 ÉTAPE C: Finalisation\n');
console.log('1. Une fois Vercel déployé, copiez l\'URL Vercel');
console.log('2. Retournez dans Railway');
console.log('3. Mettez à jour STORE_CORS, ADMIN_CORS, AUTH_CORS avec l\'URL Vercel réelle');
console.log('4. Railway redéploiera automatiquement');

console.log('\n' + '═'.repeat(60));
console.log('✅ Préparation terminée!\n');
console.log('📚 Pour plus de détails, consultez:');
console.log('   - QUICK_START.md (guide rapide)');
console.log('   - DEPLOYMENT.md (guide complet)');
console.log('   - MCP_SETUP.md (déploiement automatique avec Claude)');

console.log('\n💡 Conseil: Utilisez les serveurs MCP pour un déploiement encore plus facile!');
console.log('   Exécutez: node setup-mcp.js');
console.log('═'.repeat(60));

function generateSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}
