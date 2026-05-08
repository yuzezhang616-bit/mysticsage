import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出模式 - 纯前端，零后端依赖
  output: 'export',
  
  // 图片优化关闭（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // 基础路径（GitHub Pages 部署在子路径时使用）
  // basePath: '/mysticsage',
};

export default nextConfig;
