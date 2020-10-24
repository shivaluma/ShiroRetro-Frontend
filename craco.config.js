/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { whenProd } = require('@craco/craco');
const tailwindcss = require('tailwindcss')('./tailwind.config.js');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    ],
  },
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        require('postcss-nested'),
        require('autoprefixer'),
        ...whenProd(
          () => [
            purgecss({
              content: [
                './src/**/*.html',
                './src/**/*.jsx',
                './src/**/*.js',
                './src/**/*.tsx',
                './src/**/*.ts',
              ],
            }),
          ],
          []
        ),
      ],
    },
  },
};
