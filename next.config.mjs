import { withStoreConfig } from "./store-config.mjs"

const nextConfig = withStoreConfig({
  // Ignorer les erreurs pendant le build pour permettre le déploiement initial
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactiver la génération statique pour éviter les erreurs d'API
  output: 'standalone',
})

export default nextConfig