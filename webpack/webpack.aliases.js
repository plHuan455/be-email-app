const { createWebpackAliases } = require('./webpack.helpers');

/**
 * Export Webpack Aliases
 *
 * Tip: Some text editors will show the errors or invalid intellisense reports
 * based on these webpack aliases, make sure to update `tsconfig.json` file also
 * to match the `paths` we using in here for aliases in project.
 */
module.exports = createWebpackAliases({
  '@': 'src',
  '@@': '',
  '@layouts': 'src/layouts',
  '@hooks': 'src/hooks',
  '@api': 'src/api',
  '@assets': 'src/assets',
  '@components': 'src/components',
  '@constants': 'src/constants',
  '@core': 'src/core',
  '@context': 'src/context',
  '@page': 'src/page',
  '@redux': 'src/redux',
  '@utils': 'src/utils',
  '@containers': 'src/containers',
  '@locales': 'src/locales',
  '@domain': 'src/domain',
  '@themes': 'src/themes',
  '@@packages/hooks': 'packages/hooks',
  '@@packages/localization': 'packages/localization',
  '@@packages/utils': 'packages/utils',
});
