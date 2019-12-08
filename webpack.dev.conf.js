const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConf = require('./webpack.base.conf.js');
const devWebpackConf = merge( baseWebpackConf, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    devServer: {
        port: 8081,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        contentBase: baseWebpackConf.externals.paths.dist,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve( devWebpackConf )
})
