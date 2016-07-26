var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle.js'
    },

    devtool: 'sourcemap',

    module: {
        loaders: [
            { 
                test: /\.js$/,
                exclude: [/public\/js/, /node_modules/, /test/, /\.spec\.js/],
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'source/index.html',
            inject: 'body',
            hash: true
        })
    ]
};