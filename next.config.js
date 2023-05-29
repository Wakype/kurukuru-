/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // or any other limit you desire
            fallback: 'file-loader',
            publicPath: '/_next/static/sounds',
            outputPath: 'static/sounds',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};
