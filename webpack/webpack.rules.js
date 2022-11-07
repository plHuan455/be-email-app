const { inDev } = require('./webpack.helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  },
  {
    // Typescript loader
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.(s[ac]ss|css)$/,
    use: [
      { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader',
        options: { sourceMap: inDev() ? true : false },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: inDev() ? true : false },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: inDev() ? true : false,
          postcssOptions: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
              require('postcss-import'),
              require('tailwindcss/nesting'),
              require('postcss-preset-env'),
              require('postcss-simple-vars')({ silent: true }),
            ],
          },
        },
      },
    ],
  },
  {
    // Less loader
    test: /\.less$/,
    use: [
      { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
  },
  {
    // Images Loader
    test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
    dependency: { not: ['url'] },
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  {
    // Font & SVG loader
    test: /\.(woff(2)?|ttf|otf|eot)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          // publicPath: 'assets/fonts',
          // outputPath: 'assets/fonts',
        },
      },
    ],
    dependency: { not: ['url'] },
  },
];
