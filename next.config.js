/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    redirects: async () => {
        return [
          {
            source: '/',
            destination: '/en',
            permanent: true, // Use 308 for permanent redirect
          },
        ];
      },
}

module.exports = nextConfig
