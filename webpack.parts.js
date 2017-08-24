exports.devServer = ({host, port} = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, //defaults to 'localhost'
        port, //defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.lintJavaScript = ({include, exclude, options} = {}) => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          enforce: 'pre',
          loader: 'eslint-loader',
          options,
        },
      ],
    },
});