/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        api: 'http://15.228.14.22',
        //api: 'http://localhost:8080',
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    reactStrictMode: true,
};

export default nextConfig;
