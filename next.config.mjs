import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

const millionConfig = {
  auto: true,
};

export default million.next(nextConfig, millionConfig);