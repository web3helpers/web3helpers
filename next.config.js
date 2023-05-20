/** @type {import('next').NextConfig} */
function patchWasmModuleImport(config, isServer) {
  config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
  });

  config.optimization.moduleIds = 'named';

  config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;
    config.experiments = { asyncWebAssembly: true, layers: true };
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve("@svgr/webpack")
    });
    patchWasmModuleImport(config, options.isServer);
    return config;
  }
};

module.exports = nextConfig;
