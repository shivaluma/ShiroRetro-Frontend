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
        autoprefixer,
        require('postcss-flexbugs-fixes'),
        postcssPresetEnv({
          stage: 3,
          features: {},
        }),
      ],
    },
  },
};
