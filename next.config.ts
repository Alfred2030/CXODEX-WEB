import type { NextConfig } from "next";

// 香港自托管走纯静态导出：STATIC_EXPORT=1 时 output:'export' + 图片不优化（纯静态可 nginx 直服）。
// Vercel 备份部署不带该环境变量，仍走常规 SSR/优化构建。
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" } : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
