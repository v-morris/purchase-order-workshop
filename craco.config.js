/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const packages = [];
packages.push(path.resolve(__dirname, 'src/'));

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
};
