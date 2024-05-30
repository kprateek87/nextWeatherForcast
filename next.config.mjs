/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: '1fa9ff4126d95b8db54f3897a208e91c',
    BASE_URL: 'https://api.openweathermap.org/data/2.5'
  },
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'openweathermap.org',
            port: '',
            pathname: '/img/wn/**',
          },
        ],
      },
};

export default nextConfig;
