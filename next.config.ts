import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Résoudre le problème de détection de la racine du projet par Turbopack dans Docker
  turbopack: {
    root: __dirname,
  },
   // Autorise le HMR depuis 127.0.0.1 (et localhost par défaut)
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;