import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Résoudre le problème de détection de la racine du projet par Turbopack dans Docker
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;