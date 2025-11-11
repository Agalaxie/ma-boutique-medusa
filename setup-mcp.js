#!/usr/bin/env node

/**
 * Script interactif pour configurer les serveurs MCP
 * Configure automatiquement Claude Desktop avec Vercel, Railway et Stripe
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🔌 Configuration des Serveurs MCP pour votre Boutique Medusa\n');
  console.log('Ce script va configurer Claude Desktop pour utiliser:');
  console.log('  - Vercel (déploiement frontend)');
  console.log('  - Railway (déploiement backend)');
  console.log('  - Stripe (paiements)\n');

  // Détecter l'emplacement du fichier de config Claude Desktop
  let configPath;
  const platform = os.platform();

  if (platform === 'win32') {
    configPath = path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');
  } else if (platform === 'darwin') {
    configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else {
    configPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
  }

  console.log(`📁 Fichier de configuration: ${configPath}\n`);

  // Demander les tokens
  console.log('📝 Veuillez fournir vos tokens API:\n');

  console.log('1️⃣  Token Vercel');
  console.log('   Obtenez-le sur: https://vercel.com/account/tokens');
  const vercelToken = await question('   Token Vercel: ');

  console.log('\n2️⃣  Token Railway');
  console.log('   Obtenez-le sur: https://railway.app/account/tokens');
  const railwayToken = await question('   Token Railway: ');

  console.log('\n3️⃣  Clé API Stripe (TEST)');
  console.log('   Obtenez-la sur: https://dashboard.stripe.com/test/apikeys');
  const stripeKey = await question('   Clé Stripe (sk_test_...): ');

  // Créer la configuration
  const config = {
    mcpServers: {
      vercel: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-vercel"],
        env: {
          VERCEL_API_TOKEN: vercelToken
        }
      },
      railway: {
        command: "npx",
        args: ["-y", "@jasontanswe/railway-mcp", railwayToken]
      },
      stripe: {
        command: "npx",
        args: ["-y", "@stripe/mcp"],
        env: {
          STRIPE_API_KEY: stripeKey
        }
      }
    }
  };

  // Sauvegarder la configuration
  console.log('\n💾 Sauvegarde de la configuration...');

  // Créer le dossier si nécessaire
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  // Lire la config existante si elle existe
  let existingConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      const existingContent = fs.readFileSync(configPath, 'utf8');
      existingConfig = JSON.parse(existingContent);
      console.log('   ℹ️  Configuration existante détectée, fusion en cours...');
    } catch (error) {
      console.log('   ⚠️  Erreur de lecture de la config existante, création d\'une nouvelle...');
    }
  }

  // Fusionner les configurations
  const finalConfig = {
    ...existingConfig,
    mcpServers: {
      ...existingConfig.mcpServers,
      ...config.mcpServers
    }
  };

  // Écrire la configuration
  fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2), 'utf8');

  console.log('   ✅ Configuration sauvegardée!\n');

  // Sauvegarder aussi une copie locale
  const localConfigPath = path.join(__dirname, 'claude_desktop_config.json');
  fs.writeFileSync(localConfigPath, JSON.stringify(finalConfig, null, 2), 'utf8');
  console.log(`   📄 Copie sauvegardée localement: ${localConfigPath}\n`);

  // Instructions finales
  console.log('═'.repeat(60));
  console.log('✅ Configuration MCP terminée!\n');
  console.log('📋 Prochaines étapes:\n');
  console.log('1. Fermez complètement Claude Desktop');
  console.log('2. Rouvrez Claude Desktop');
  console.log('3. Les serveurs MCP se connecteront automatiquement\n');
  console.log('🧪 Pour tester, demandez à Claude:');
  console.log('   "Quels serveurs MCP sont connectés?"\n');
  console.log('🚀 Pour déployer votre boutique:');
  console.log('   "Peux-tu déployer ma boutique sur Vercel et Railway?"\n');
  console.log('📚 Pour plus d\'infos, lisez: MCP_SETUP.md');
  console.log('═'.repeat(60));

  rl.close();
}

main().catch(error => {
  console.error('❌ Erreur:', error.message);
  rl.close();
  process.exit(1);
});
