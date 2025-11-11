# 🚀 Guide de Démarrage Rapide - Déploiement

## Étapes pour mettre votre boutique en ligne (10-15 minutes)

### 1️⃣ Créer un compte GitHub (si vous n'en avez pas)
- Allez sur https://github.com/signup
- Créez un compte gratuit

### 2️⃣ Pusher votre code sur GitHub

```bash
# Vérifiez que vous êtes dans le bon dossier
cd C:\Users\audif\Desktop\medusa

# Ajoutez tous les fichiers
git add .

# Créez un commit
git commit -m "Setup complete - ready for deployment"

# Créez un repository sur GitHub (via l'interface web):
# https://github.com/new
# Nommez-le: ma-boutique-medusa

# Ajoutez le remote et poussez
git remote set-url origin https://github.com/VOTRE-USERNAME/ma-boutique-medusa.git
git push -u origin main
```

### 3️⃣ Déployer le Backend sur Railway (5 min)

1. **Créer un compte Railway**
   - Allez sur https://railway.app
   - Cliquez sur "Start a New Project"
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre repository `ma-boutique-medusa`
   - Railway détectera automatiquement le backend Medusa dans `/medusa-backend`

3. **Ajouter PostgreSQL**
   - Dans le projet Railway, cliquez sur "+ New"
   - Sélectionnez "Database" → "Add PostgreSQL"
   - Railway créera automatiquement la base de données

4. **Configurer les variables d'environnement**

   Dans Railway, allez dans votre service Medusa, puis "Variables":

   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=changez-moi-avec-un-secret-securise-aleatoire
   COOKIE_SECRET=changez-moi-aussi-avec-un-autre-secret
   STORE_CORS=https://votre-site.vercel.app
   ADMIN_CORS=https://votre-site.vercel.app
   AUTH_CORS=https://votre-site.vercel.app
   MEDUSA_ADMIN_ONBOARDING_TYPE=default
   PORT=9000
   ```

5. **Obtenir l'URL du backend**
   - Dans Railway, allez dans "Settings"
   - Cliquez sur "Generate Domain"
   - **NOTEZ CETTE URL** (ex: `https://xxx.up.railway.app`)

### 4️⃣ Déployer le Frontend sur Vercel (5 min)

1. **Créer un compte Vercel**
   - Allez sur https://vercel.com/signup
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre repository `ma-boutique-medusa`
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**

   Avant de déployer, ajoutez ces variables:

   ```
   MEDUSA_BACKEND_URL=https://xxx.up.railway.app
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test
   NEXT_PUBLIC_BASE_URL=https://votre-site.vercel.app
   NEXT_PUBLIC_DEFAULT_REGION=us
   REVALIDATE_SECRET=changez-moi-avec-un-secret
   ```

   **IMPORTANT**: Remplacez `https://xxx.up.railway.app` par votre URL Railway de l'étape 3.5!

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - **NOTEZ VOTRE URL** (ex: `https://ma-boutique.vercel.app`)

5. **Mettre à jour les CORS du backend**
   - Retournez dans Railway
   - Mettez à jour les variables `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`
   - Remplacez `votre-site.vercel.app` par votre vraie URL Vercel
   - Redéployez (Railway le fera automatiquement)

### 5️⃣ Tester votre boutique

1. **Visitez votre site**: `https://votre-site.vercel.app`
2. **Accédez à l'admin**: `https://xxx.up.railway.app/app`

### 6️⃣ Configurer Stripe (Optionnel mais recommandé)

1. **Créer un compte Stripe**
   - Allez sur https://dashboard.stripe.com/register
   - Mode Test est activé par défaut

2. **Obtenir vos clés**
   - Dans Stripe Dashboard: "Developers" → "API keys"
   - Copiez la "Publishable key" (pk_test_...)
   - Copiez la "Secret key" (sk_test_...)

3. **Ajouter dans Railway (Backend)**
   ```
   STRIPE_API_KEY=sk_test_votre_cle
   ```

4. **Ajouter dans Vercel (Frontend)**
   ```
   NEXT_PUBLIC_STRIPE_KEY=pk_test_votre_cle
   ```

5. **Redéployer**
   - Railway et Vercel redéploieront automatiquement

### 🎉 C'est terminé!

Votre boutique est maintenant en ligne!

## 📊 Prochaines étapes

1. **Ajouter des produits** via l'admin Medusa
2. **Personnaliser le design** en modifiant les fichiers dans `/src`
3. **Configurer un domaine personnalisé** (optionnel)
4. **Activer Stripe en mode production** quand vous êtes prêt

## 🆘 Problèmes courants

### Le frontend ne se connecte pas au backend
- Vérifiez que `MEDUSA_BACKEND_URL` dans Vercel est correct
- Vérifiez que les variables CORS dans Railway incluent votre URL Vercel
- Attendez 2-3 minutes après avoir changé les variables

### Erreur 500 sur le backend
- Vérifiez les logs dans Railway
- Assurez-vous que PostgreSQL est bien connecté
- Vérifiez que DATABASE_URL est défini

### Le site ne charge pas les produits
- C'est normal au début! Ajoutez des produits via l'admin
- Allez sur `https://xxx.up.railway.app/app`

## 💰 Coûts

- **Vercel**: Gratuit (jusqu'à 100GB/mois)
- **Railway**: $5 de crédit gratuit/mois (suffisant pour commencer)
- **Stripe**: Gratuit (2.9% + 30¢ par transaction)

**Total**: Gratuit pendant le premier mois!

## 📱 Support

- Consultez [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails
- [Documentation Medusa](https://docs.medusajs.com)
- [Discord Medusa](https://discord.gg/medusajs)
