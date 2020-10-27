/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  style: {
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer({
          browsers: [
            'last 2 versions',
            'safari 5',
            'ie 11',
            'opera 12.1',
            'ios 6',
            'android 4',
          ],
        }),
        require('postcss-flexbugs-fixes'),
        postcssPresetEnv({
          stage: 3,
          features: {},
        }),
      ],
    },
  },
};
