import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    root: path.join(__dirname)
  },
  allowedDevOrigins: ["192.168.1.115"],
  serverExternalPackages: ["ffmpeg-static"]
};

export default nextConfig;
