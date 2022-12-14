/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["tsx", "api.ts"],
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;
    config.experiments = { asyncWebAssembly: true };
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve("@svgr/webpack")
    });
    return config;
  }
};

module.exports = nextConfig;
