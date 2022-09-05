/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = { 
  nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
}