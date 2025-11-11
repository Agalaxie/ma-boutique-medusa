# Guide de Déploiement - Boutique Medusa

Ce guide vous explique comment déployer votre boutique e-commerce Medusa en ligne.

## Architecture de Déploiement

- **Frontend (Next.js)**: Vercel (gratuit)
- **Backend (Medusa)**: Railway.app (gratuit avec 5$ de crédit/mois)
- **Base de données**: PostgreSQL fournie par Railway

---

## Étape 1: Préparer le Repository Git

1. Initialisez Git si ce n'est pas déjà fait:
```bash
git init
git add .
git commit -m "Initial commit - Medusa store setup"
```

2. Créez un repository sur GitHub:
   - Allez sur https://github.com/new
   - Créez un nouveau repository (public ou privé)
   - Nommez-le par exemple: `ma-boutique-medusa`

3. Poussez votre code:
```bash
git remote add origin https://github.com/VOTRE-USERNAME/ma-boutique-medusa.git
git branch -M main
git push -u origin main
```

---

## Étape 2: Déployer le Backend sur Railway

### 2.1 Créer un compte Railway
1. Allez sur https://railway.app
2. Inscrivez-vous avec GitHub
3. Vous recevez 5$ de crédit gratuit par mois

### 2.2 Déployer le backend
1. Cliquez sur "New Project"
2. Sélectionnez "Deploy from GitHub repo"
3. Choisissez votre repository `ma-boutique-medusa`
4. Railway détectera automatiquement le backend Medusa

### 2.3 Ajouter PostgreSQL
1. Dans votre projet Railway, cliquez sur "New"
2. Sélectionnez "Database" → "PostgreSQL"
3. Railway créera automatiquement la base de données

### 2.4 Configurer les variables d'environnement
Dans Railway, ajoutez ces variables pour le backend:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=votre-secret-jwt-super-securise
COOKIE_SECRET=votre-secret-cookie-super-securise
STORE_CORS=https://votre-frontend.vercel.app
ADMIN_CORS=https://votre-frontend.vercel.app
AUTH_CORS=https://votre-frontend.vercel.app
MEDUSA_ADMIN_ONBOARDING_TYPE=default
```

### 2.5 Configurer le domaine
1. Dans Railway, allez dans "Settings"
2. Cliquez sur "Generate Domain"
3. Vous obtiendrez un URL comme: `https://votre-backend.up.railway.app`
4. **Notez cette URL** - vous en aurez besoin pour le frontend!

---

## Étape 3: Déployer le Frontend sur Vercel

### 3.1 Créer un compte Vercel
1. Allez sur https://vercel.com
2. Inscrivez-vous avec GitHub
3. Le plan gratuit est largement suffisant

### 3.2 Importer le projet
1. Cliquez sur "Add New..." → "Project"
2. Importez votre repository GitHub
3. Vercel détectera automatiquement Next.js

### 3.3 Configurer les variables d'environnement
Dans Vercel, ajoutez ces variables:

```env
MEDUSA_BACKEND_URL=https://votre-backend.up.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test
NEXT_PUBLIC_BASE_URL=https://votre-site.vercel.app
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=votre-secret-revalidation
```

**IMPORTANT**: Remplacez `https://votre-backend.up.railway.app` par l'URL Railway de l'étape 2.5!

### 3.4 Déployer
1. Cliquez sur "Deploy"
2. Vercel construira et déploiera votre site
3. Vous obtiendrez un URL comme: `https://votre-site.vercel.app`

---

## Étape 4: Configurer Stripe pour les paiements

### 4.1 Créer un compte Stripe
1. Allez sur https://stripe.com
2. Créez un compte gratuit

### 4.2 Obtenir vos clés API
1. Dans Stripe Dashboard, allez dans "Developers" → "API keys"
2. Copiez votre "Publishable key" (commence par `pk_`)
3. Copiez votre "Secret key" (commence par `sk_`)

### 4.3 Ajouter les clés à vos projets

**Dans Railway (Backend)**:
```env
STRIPE_API_KEY=sk_test_votre_cle_secrete
```

**Dans Vercel (Frontend)**:
```env
NEXT_PUBLIC_STRIPE_KEY=pk_test_votre_cle_publique
```

---

## Étape 5: Finalisation

### 5.1 Créer un utilisateur admin
Une fois le backend déployé, créez un admin via Railway CLI ou directement dans la base de données.

### 5.2 Ajouter des produits
1. Accédez à l'admin: `https://votre-backend.up.railway.app/app`
2. Connectez-vous
3. Ajoutez vos produits, collections, etc.

### 5.3 Tester les paiements
En mode test Stripe, utilisez ces cartes:
- Carte de succès: `4242 4242 4242 4242`
- Date: n'importe quelle date future
- CVC: n'importe quel 3 chiffres

---

## Étape 6: Domaine personnalisé (Optionnel)

### Pour le Frontend (Vercel)
1. Dans Vercel, allez dans "Settings" → "Domains"
2. Ajoutez votre domaine (ex: `www.maboutique.com`)
3. Configurez les DNS selon les instructions Vercel

### Pour le Backend (Railway)
1. Dans Railway, allez dans "Settings"
2. Ajoutez un domaine personnalisé
3. Configurez les DNS

---

## Maintenance et Mises à Jour

### Mettre à jour le site
```bash
git add .
git commit -m "Update: description des changements"
git push
```

Vercel et Railway redéploieront automatiquement!

### Surveiller les logs
- **Vercel**: Dashboard → votre projet → "Logs"
- **Railway**: Dashboard → votre projet → "Deployments"

---

## Coûts Estimés

| Service | Plan Gratuit | Plan Payant |
|---------|--------------|-------------|
| Vercel | 100GB bandwidth/mois | $20/mois (Pro) |
| Railway | $5 crédit/mois | $5+ selon usage |
| Stripe | Gratuit | 2.9% + 30¢ par transaction |

**Total pour commencer**: Gratuit pendant ~1 mois avec les crédits Railway!

---

## Ressources Utiles

- [Documentation Medusa](https://docs.medusajs.com)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Stripe](https://stripe.com/docs)

---

## Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs Railway et Vercel
2. Consultez la [communauté Medusa Discord](https://discord.gg/medusajs)
3. Vérifiez que toutes les variables d'environnement sont correctes
