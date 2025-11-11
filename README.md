# Ma Boutique E-commerce Medusa

Une boutique e-commerce moderne construite avec **Medusa** (backend) et **Next.js 15** (frontend).

## 🚀 Fonctionnalités

- ✅ Catalogue de produits avec recherche
- ✅ Panier d'achat
- ✅ Paiement sécurisé avec Stripe
- ✅ Gestion des comptes clients
- ✅ Multi-régions et multi-devises
- ✅ Interface d'administration
- ✅ Design responsive avec Tailwind CSS

## 📦 Stack Technique

- **Frontend**: Next.js 15, React, Tailwind CSS, TypeScript
- **Backend**: Medusa (Node.js)
- **Base de données**: PostgreSQL
- **Paiements**: Stripe
- **Déploiement**: Vercel (frontend) + Railway (backend)

## 🛠️ Installation Locale

### Prérequis
- Node.js 18+
- npm ou yarn
- PostgreSQL (optionnel pour dev)

### Frontend

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:8000

### Backend

```bash
cd medusa-backend
npm install
npm run dev
```

Le backend sera accessible sur http://localhost:9000

## 🌐 Déploiement en Production

Consultez le fichier [DEPLOYMENT.md](./DEPLOYMENT.md) pour des instructions détaillées sur comment déployer votre boutique en ligne.

### Résumé rapide:

1. **Pushez sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Backend sur Railway**
   - Connectez votre repo GitHub
   - Ajoutez PostgreSQL
   - Configurez les variables d'environnement

3. **Frontend sur Vercel**
   - Importez votre repo GitHub
   - Configurez les variables d'environnement
   - Déployez!

## 📝 Configuration

### Variables d'environnement Frontend (.env.local)

```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=us
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
REVALIDATE_SECRET=supersecret
```

### Variables d'environnement Backend (.env)

```env
DATABASE_URL=postgres://...
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:8000,http://localhost:9000
```

## 📚 Documentation

- [Documentation Medusa](https://docs.medusajs.com)
- [Documentation Next.js](https://nextjs.org/docs)
- [Guide de déploiement](./DEPLOYMENT.md)

## 🤝 Support

Pour toute question ou problème:
- Documentation Medusa: https://docs.medusajs.com
- Discord Medusa: https://discord.gg/medusajs
- GitHub Issues: Créez une issue sur ce repository

## 📄 Licence

MIT

---

**Créé avec ❤️ en utilisant Medusa & Next.js**
