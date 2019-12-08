const merge = require('webpack-merge');
const baseWebpackConf = require('./webpack.base.conf.js');
const buildWebpackConf = merge( baseWebpackConf, {
    mode: 'production',
    plugins: []
});

module.exports = new Promise((resolve, reject) => {
    resolve( buildWebpackConf )
})
