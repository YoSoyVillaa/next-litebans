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
        hostname: 'visage.surgeplay.com'
      }
    ]
  }
};

export default nextConfig;
