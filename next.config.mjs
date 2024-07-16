/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minotar.net'
      }
    ]
  }
};

export default nextConfig;
