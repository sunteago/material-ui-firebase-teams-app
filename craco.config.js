/* craco.config.js */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({ openAnalyzer: true }),
    ],
  },
}