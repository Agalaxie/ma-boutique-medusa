# 🔌 Configuration des Serveurs MCP pour Votre Boutique

Ce guide vous explique comment configurer les serveurs MCP (Model Context Protocol) pour gérer votre boutique directement depuis Claude Desktop.

## Qu'est-ce que MCP?

MCP vous permet de connecter Claude à des services externes comme Vercel, Railway et Stripe. Une fois configuré, vous pourrez:

- ✅ Déployer sur Vercel avec une simple commande
- ✅ Gérer Railway et la base de données
- ✅ Configurer et tester Stripe
- ✅ Tout faire depuis Claude Desktop!

---

## Prérequis

Avant de commencer, vous devez avoir:

1. **Claude Desktop App** installée
2. **Node.js 18+** (vous l'avez déjà!)
3. **Clés API** pour chaque service:
   - Token Vercel: https://vercel.com/account/tokens
   - Token Railway: https://railway.app/account/tokens
   - Clé Stripe: https://dashboard.stripe.com/apikeys

---

## Configuration Complète

### Étape 1: Obtenir vos Tokens API

#### 1.1 Token Vercel
1. Allez sur https://vercel.com/account/tokens
2. Cliquez sur "Create Token"
3. Nommez-le: "Claude MCP"
4. Sélectionnez "Full Account"
5. Copiez le token (vous ne le verrez qu'une fois!)

#### 1.2 Token Railway
1. Allez sur https://railway.app/account/tokens
2. Cliquez sur "Create Token"
3. Nommez-le: "Claude MCP"
4. Copiez le token

#### 1.3 Clé Stripe
1. Allez sur https://dashboard.stripe.com/apikeys
2. Copiez la "Secret key" (sk_test_...)
3. **Important**: Utilisez d'abord la clé de TEST!

### Étape 2: Configurer Claude Desktop

Ouvrez le fichier de configuration Claude Desktop:

**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Mac/Linux**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Étape 3: Ajouter la Configuration MCP

Copiez cette configuration dans le fichier (remplacez les TOKENS):

```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-vercel"
      ],
      "env": {
        "VERCEL_API_TOKEN": "VOTRE_TOKEN_VERCEL_ICI"
      }
    },
    "railway": {
      "command": "npx",
      "args": [
        "-y",
        "@jasontanswe/railway-mcp",
        "VOTRE_TOKEN_RAILWAY_ICI"
      ]
    },
    "stripe": {
      "command": "npx",
      "args": [
        "-y",
        "@stripe/mcp"
      ],
      "env": {
        "STRIPE_API_KEY": "VOTRE_CLE_STRIPE_ICI"
      }
    }
  }
}
```

### Étape 4: Redémarrer Claude Desktop

1. Fermez complètement Claude Desktop
2. Rouvrez-le
3. Les serveurs MCP devraient se connecter automatiquement

---

## Vérification de l'Installation

Pour vérifier que tout fonctionne, dans Claude Desktop, demandez:

```
Quels serveurs MCP sont connectés?
```

Vous devriez voir:
- ✅ Vercel
- ✅ Railway
- ✅ Stripe

---

## Utilisation des Serveurs MCP

### Déployer sur Vercel

```
Peux-tu déployer mon projet sur Vercel?
```

Claude pourra:
- Créer un nouveau projet Vercel
- Importer depuis GitHub
- Configurer les variables d'environnement
- Déployer automatiquement

### Gérer Railway

```
Peux-tu créer une base de données PostgreSQL sur Railway?
```

Claude pourra:
- Créer des services
- Ajouter des bases de données
- Configurer les variables d'environnement
- Surveiller les déploiements

### Gérer Stripe

```
Peux-tu créer un produit de test dans Stripe?
```

Claude pourra:
- Créer des produits et prix
- Gérer les clients
- Traiter les paiements
- Gérer les remboursements

---

## Configuration Alternative (Claude Code CLI)

Si vous utilisez Claude Code dans le terminal au lieu de Claude Desktop, ajoutez les variables d'environnement à votre système:

**Windows (PowerShell)**:
```powershell
$env:VERCEL_API_TOKEN="votre_token"
$env:RAILWAY_API_TOKEN="votre_token"
$env:STRIPE_API_KEY="votre_cle"
```

**Mac/Linux (bash/zsh)**:
```bash
export VERCEL_API_TOKEN="votre_token"
export RAILWAY_API_TOKEN="votre_token"
export STRIPE_API_KEY="votre_cle"
```

---

## Exemple de Configuration Complète

Voici un exemple complet avec tous les serveurs:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_API_TOKEN": "abc123xyz456"
      }
    },
    "railway": {
      "command": "npx",
      "args": ["-y", "@jasontanswe/railway-mcp", "def789uvw012"]
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp"],
      "env": {
        "STRIPE_API_KEY": "sk_test_123456789"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_123456789"
      }
    }
  }
}
```

---

## Commandes Utiles

### Tester Vercel
```
Liste tous mes projets Vercel
```

### Tester Railway
```
Liste tous mes services Railway
```

### Tester Stripe
```
Liste tous mes produits Stripe
```

---

## Sécurité Important! 🔒

1. **Ne commitez JAMAIS vos tokens dans Git**
2. **Utilisez des tokens avec permissions limitées**
3. **Utilisez les clés TEST de Stripe avant la production**
4. **Révoquéz immédiatement les tokens compromis**

---

## Workflow Complet de Déploiement avec MCP

Une fois configuré, vous pourrez déployer votre boutique en demandant simplement à Claude:

```
Peux-tu m'aider à déployer ma boutique Medusa?
1. Crée un service Railway avec PostgreSQL
2. Configure les variables d'environnement
3. Déploie le frontend sur Vercel
4. Configure Stripe pour les paiements
```

Claude s'occupera de tout! 🚀

---

## Dépannage

### Les serveurs MCP ne se connectent pas
- Vérifiez que les tokens sont corrects
- Redémarrez Claude Desktop
- Vérifiez le fichier de logs: `~/Library/Logs/Claude/mcp*.log`

### Erreur "Token invalid"
- Régénérez le token sur le site du service
- Mettez à jour la configuration
- Redémarrez Claude Desktop

### Commande ne fonctionne pas
- Assurez-vous que Node.js 18+ est installé
- Testez: `npx -y @stripe/mcp` dans le terminal
- Vérifiez que npm fonctionne correctement

---

## Ressources

- [Documentation MCP](https://modelcontextprotocol.io)
- [Vercel MCP Server](https://github.com/nganiet/mcp-vercel)
- [Railway MCP Server](https://github.com/jason-tan-swe/railway-mcp)
- [Stripe MCP Server](https://docs.stripe.com/mcp)

---

## Prochaines Étapes

Une fois MCP configuré:

1. ✅ Testez chaque serveur individuellement
2. ✅ Déployez votre backend sur Railway
3. ✅ Déployez votre frontend sur Vercel
4. ✅ Configurez Stripe
5. ✅ Profitez de votre boutique en ligne!

**Bon déploiement! 🎉**
