const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '~@weni/unnnic-system/dist/unnnic.css';
          @import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            from: 'node_modules/@weni/unnnic-system/dist/img',
            to: './js/img',
          },
        ],
      ),
    ],
  },
};
