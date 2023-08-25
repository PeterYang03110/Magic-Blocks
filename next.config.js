module.exports = {
  env: {
    NETWORK: process.env.NETWORK,
  },
  images: {
    domains: ['dev-assets.fiefapi.net', 'assets.fiefapi.net'],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [];
  },
};
