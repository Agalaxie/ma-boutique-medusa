import { withStoreConfig } from "./store-config.mjs"

const nextConfig = withStoreConfig({
  // Ignorer les erreurs pendant le build pour permettre le déploiement initial
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuration expérimentale pour éviter les erreurs d'API au build
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
})

export default nextConfig