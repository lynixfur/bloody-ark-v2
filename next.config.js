/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/auth/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
