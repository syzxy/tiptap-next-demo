import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias["yjs"] = path.resolve(
        import.meta.dirname,
        "node_modules/yjs"
      );
    }
    return config;
  },
};

export default nextConfig;
