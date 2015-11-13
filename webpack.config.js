var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./example/main.js",
    output: {
        path: './example',
        filename: "example.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?presets[]=es2015,presets[]=react']
        }]
    }
};
