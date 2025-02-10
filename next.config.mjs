/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/2025_SDA_20213TN126_validar_entrada_prod',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/2025_SDA_20213TN126_validar_entrada_prod/',
  trailingSlash: true,
  distDir: 'out',
};

export default nextConfig;
