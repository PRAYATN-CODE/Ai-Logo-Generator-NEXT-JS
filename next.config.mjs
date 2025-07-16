/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
        // Optional: Add more domains if needed
        // domains: ['res.cloudinary.com', 'example.com', 'another-cdn.com'],

        // Optional advanced configuration (Next.js 12+)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**', // Allows all paths under cloudinary
            },
        ],

        // Optional performance optimizations
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'], // Enable WebP by default
        minimumCacheTTL: 60, // 60 seconds cache
    },
    // Other Next.js config options can go here
};

export default nextConfig;