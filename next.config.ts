import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-27fff5d908ef401e865968062d72cbb2.r2.dev",
            },
        ],
    },
};

export default nextConfig;