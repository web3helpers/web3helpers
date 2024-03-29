/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm", "./node_modules/**/*.proto"]
    }
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;
    config.experiments = { asyncWebAssembly: true, layers: true };
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve("@svgr/webpack")
    });
    return config;
  }
};

module.exports = nextConfig;
