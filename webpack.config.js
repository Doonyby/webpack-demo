const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app/index.js'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        output: {
            path: PATHS.build,
            filename: 'bundle.js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Todo React SQL',
            }),
        ],
    },
    parts.lintJavaScript({ include: PATHS.app }),
    parts.loadCSS(),
    parts.loadBabel({ include: PATHS.app, exclude(path) {return path.match(/node_modules/);} }),
]);

const productionConfig = merge([

]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};
