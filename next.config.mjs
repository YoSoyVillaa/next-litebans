/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minotar.net'
      },
      {
        protocol: 'https',
        hostname: 'skins.mcstats.com'
      }
    ]
  }
};

export default nextConfig;
