#!/usr/bin/env node

/**
 * Script de vérification avant déploiement
 * Vérifie que tous les fichiers nécessaires sont présents
 */

const fs = require('fs');
const path = require('path');

const checks = {
  'Configuration Files': [
    { file: '.gitignore', required: true },
    { file: 'package.json', required: true },
    { file: '.env.local', required: false, message: 'Créez ce fichier pour le dev local' },
    { file: 'vercel.json', required: true },
    { file: 'README.md', required: true },
    { file: 'DEPLOYMENT.md', required: true },
    { file: 'QUICK_START.md', required: true },
  ],
  'Backend Files': [
    { file: 'medusa-backend/package.json', required: true },
    { file: 'medusa-backend/.env', required: false, message: 'À configurer dans Railway' },
    { file: 'medusa-backend/railway.json', required: true },
    { file: 'medusa-backend/Procfile', required: true },
  ],
  'Frontend Files': [
    { file: 'src/middleware.ts', required: true },
    { file: 'next.config.js', required: true },
    { file: 'tailwind.config.js', required: true },
  ],
};

let allPassed = true;

console.log('🔍 Vérification de la configuration de déploiement...\n');

for (const [category, files] of Object.entries(checks)) {
  console.log(`\n📁 ${category}:`);

  for (const { file, required, message } of files) {
    const exists = fs.existsSync(path.join(__dirname, file));

    if (exists) {
      console.log(`  ✅ ${file}`);
    } else if (required) {
      console.log(`  ❌ ${file} - MANQUANT ET REQUIS`);
      allPassed = false;
    } else {
      console.log(`  ⚠️  ${file} - Optionnel ${message ? `(${message})` : ''}`);
    }
  }
}

// Vérifier les dépendances
console.log('\n\n📦 Vérification des dépendances:');
try {
  const packageJson = require('./package.json');
  const requiredDeps = ['next', 'react', 'react-dom'];

  for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - MANQUANT`);
      allPassed = false;
    }
  }
} catch (error) {
  console.log('  ❌ Impossible de lire package.json');
  allPassed = false;
}

// Résumé
console.log('\n\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ Tous les fichiers requis sont présents!');
  console.log('\n📝 Prochaines étapes:');
  console.log('  1. Lisez QUICK_START.md pour le déploiement rapide');
  console.log('  2. Lisez DEPLOYMENT.md pour les détails complets');
  console.log('  3. Committez et poussez sur GitHub');
  console.log('  4. Déployez sur Vercel et Railway');
  console.log('\n🚀 Bonne chance avec votre boutique!');
} else {
  console.log('❌ Certains fichiers requis sont manquants.');
  console.log('   Veuillez les créer avant de déployer.');
  process.exit(1);
}
console.log('='.repeat(50));
