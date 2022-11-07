const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].js',
    path: '/',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  devtool: 'source-map',
  devServer: {
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, '../public'),
      publicPath: '/',
    },
    compress: true,
    // refresh page url
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
