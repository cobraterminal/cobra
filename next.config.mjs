/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/cobra" : ""
const assetPrefix = isProd ? "/cobra/" : ""

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
}

export default nextConfig
