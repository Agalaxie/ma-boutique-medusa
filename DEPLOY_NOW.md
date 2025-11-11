# 🚀 GUIDE DE DÉPLOIEMENT - PRÊT À L'EMPLOI

**Votre boutique Medusa est prête à être déployée!**
Suivez ces étapes dans l'ordre pour mettre votre site en ligne en **15-20 minutes**.

---

## ✅ Prérequis (Déjà fait!)

- ✅ Code configuré et prêt
- ✅ Tokens API obtenus
- ✅ Git repository initialisé
- ✅ Variables d'environnement générées

---

## 📋 ÉTAPE 1: Pousser sur GitHub (2 minutes)

### 1.1 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository: `ma-boutique-medusa` (ou autre nom)
3. Choisissez **Public** ou **Private**
4. **NE cochez PAS** "Initialize with README" (vous en avez déjà un!)
5. Cliquez sur "Create repository"

### 1.2 Pousser votre code

GitHub vous donnera des commandes. Utilisez celles-ci dans votre terminal:

```bash
# Si vous n'avez pas encore de remote
git remote add origin https://github.com/VOTRE-USERNAME/ma-boutique-medusa.git
git branch -M main
git push -u origin main

# Si vous avez déjà un remote
git remote set-url origin https://github.com/VOTRE-USERNAME/ma-boutique-medusa.git
git push -u origin main
```

✅ **Vérification**: Rafraîchissez la page GitHub, vous devriez voir vos fichiers!

---

## 📋 ÉTAPE 2: Déployer sur Railway (7-8 minutes)

### 2.1 Créer le projet

1. Allez sur https://railway.app
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez "Deploy from GitHub repo"
5. Choisissez votre repository `ma-boutique-medusa`
6. Railway commencera à analyser le code

### 2.2 Ajouter PostgreSQL

1. Dans votre projet Railway, cliquez sur "+ New"
2. Sélectionnez "Database"
3. Choisissez "Add PostgreSQL"
4. Railway créera automatiquement la base de données
5. **Attendez 1-2 minutes** que la base soit prête

### 2.3 Configurer les variables d'environnement

1. Cliquez sur votre service Medusa (pas la database)
2. Allez dans l'onglet "Variables"
3. Cliquez sur "New Variable"
4. **Copiez-collez ces variables UNE PAR UNE:**

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
```
```
JWT_SECRET=1d5fced3d5f5d7dfd8f72d144c585f6af3f56642662a8d11657374cdc12a24d1
```
```
COOKIE_SECRET=c7d268384a62311ee1e21e06d5638b32caeee777f7770966cff35ac72ae2eba5
```
```
STRIPE_API_KEY=sk_test_VOTRE_CLE_STRIPE_SECRETE_ICI
```
```
STORE_CORS=https://VOTRE-SITE.vercel.app
```
```
ADMIN_CORS=https://VOTRE-SITE.vercel.app
```
```
AUTH_CORS=https://VOTRE-SITE.vercel.app
```
```
MEDUSA_ADMIN_ONBOARDING_TYPE=default
```

**Note**: Pour STORE_CORS, ADMIN_CORS et AUTH_CORS, mettez temporairement `https://VOTRE-SITE.vercel.app`. Vous les mettrez à jour après le déploiement Vercel!

### 2.4 Obtenir l'URL Railway

1. Dans Railway, allez dans "Settings"
2. Scroll jusqu'à "Networking"
3. Cliquez sur "Generate Domain"
4. **COPIEZ CETTE URL!** (ex: `https://ma-boutique-abc123.up.railway.app`)
5. **Gardez cette URL sous la main** pour l'étape suivante!

✅ **Vérification**: Allez sur votre URL Railway, vous devriez voir une réponse (même une erreur 404 c'est normal pour l'instant!)

---

## 📋 ÉTAPE 3: Déployer sur Vercel (5-7 minutes)

### 3.1 Créer le projet

1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez sur "Add New..." → "Project"
4. Trouvez votre repository `ma-boutique-medusa`
5. Cliquez sur "Import"

### 3.2 Configurer les variables d'environnement

**AVANT de cliquer sur Deploy**, configurez les variables:

1. Scroll jusqu'à "Environment Variables"
2. Ajoutez ces variables **UNE PAR UNE**:

**Nom**: `MEDUSA_BACKEND_URL`
**Valeur**: `https://VOTRE-URL-RAILWAY.up.railway.app` ⚠️ **REMPLACEZ PAR VOTRE VRAIE URL RAILWAY!**

**Nom**: `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
**Valeur**: `pk_test`

**Nom**: `NEXT_PUBLIC_BASE_URL`
**Valeur**: Laissez vide pour l'instant (Vercel le remplira automatiquement)

**Nom**: `NEXT_PUBLIC_DEFAULT_REGION`
**Valeur**: `us`

**Nom**: `NEXT_PUBLIC_STRIPE_KEY`
**Valeur**: `pk_test_VOTRE_CLE_STRIPE_PUBLIQUE_ICI`

**Nom**: `REVALIDATE_SECRET`
**Valeur**: `c11975e1e1cd4fd65cec43fdd3b5887ebe943331647b38908237f95dd8e56218`

### 3.3 Déployer!

1. Cliquez sur "Deploy"
2. Attendez 3-5 minutes que Vercel construise votre site
3. Une fois terminé, Vercel vous donnera une URL (ex: `https://ma-boutique-xyz.vercel.app`)
4. **COPIEZ CETTE URL!**

✅ **Vérification**: Cliquez sur "Visit", votre site devrait se charger!

---

## 📋 ÉTAPE 4: Finalisation (2 minutes)

### 4.1 Mettre à jour les CORS dans Railway

1. Retournez sur https://railway.app
2. Ouvrez votre projet
3. Cliquez sur votre service Medusa
4. Allez dans "Variables"
5. Mettez à jour ces 3 variables avec votre **VRAIE URL VERCEL**:

   - `STORE_CORS` → `https://votre-site.vercel.app`
   - `ADMIN_CORS` → `https://votre-site.vercel.app`
   - `AUTH_CORS` → `https://votre-site.vercel.app`

6. Railway redéploiera automatiquement (1-2 minutes)

### 4.2 Mettre à jour NEXT_PUBLIC_BASE_URL dans Vercel (optionnel)

1. Retournez sur https://vercel.com
2. Ouvrez votre projet
3. Allez dans "Settings" → "Environment Variables"
4. Trouvez `NEXT_PUBLIC_BASE_URL`
5. Mettez à jour avec votre URL Vercel réelle
6. Redéployez depuis l'onglet "Deployments"

---

## 🎉 C'EST FAIT! Votre boutique est EN LIGNE!

### Vos URLs:

- 🛍️ **Boutique (Frontend)**: `https://votre-site.vercel.app`
- 🔧 **Admin Panel**: `https://votre-backend.up.railway.app/app`
- 🌐 **API Backend**: `https://votre-backend.up.railway.app`

---

## 🧪 Tests à Faire

### Test 1: Accéder au site
Allez sur votre URL Vercel → Vous devriez voir la page d'accueil!

### Test 2: Accéder à l'admin
1. Allez sur `https://votre-backend.up.railway.app/app`
2. Créez un compte admin
3. Ajoutez votre premier produit!

### Test 3: Tester un paiement
1. Ajoutez un produit au panier
2. Allez au checkout
3. Utilisez cette carte test Stripe:
   - Numéro: `4242 4242 4242 4242`
   - Date: n'importe quelle date future
   - CVC: n'importe quel 3 chiffres

---

## 🐛 Problèmes Courants

### Le frontend ne charge pas
- Vérifiez que `MEDUSA_BACKEND_URL` dans Vercel pointe vers votre URL Railway
- Attendez 2-3 minutes après avoir changé les variables

### Erreur CORS
- Vérifiez que les variables CORS dans Railway contiennent votre URL Vercel réelle
- Pas de `/` à la fin des URLs!

### Le backend ne démarre pas
- Vérifiez les logs dans Railway
- Assurez-vous que PostgreSQL est bien connecté
- Vérifiez que toutes les variables sont définies

---

## 📱 Prochaines Étapes

1. ✅ Ajoutez des produits via l'admin
2. ✅ Personnalisez le design dans `/src`
3. ✅ Configurez un domaine personnalisé (optionnel)
4. ✅ Passez Stripe en mode production quand vous êtes prêt

---

## 💰 Coûts

- **Vercel**: Gratuit (jusqu'à 100GB/mois)
- **Railway**: $5 crédit gratuit/mois
- **Stripe**: 2.9% + 30¢ par transaction

---

## 🆘 Besoin d'Aide?

- Consultez les logs dans Railway et Vercel
- Lisez DEPLOYMENT.md pour plus de détails
- Documentation Medusa: https://docs.medusajs.com
- Discord Medusa: https://discord.gg/medusajs

---

**🎊 Félicitations! Votre boutique e-commerce est maintenant en ligne!**

*N'oubliez pas de partager votre boutique! 🛍️*
