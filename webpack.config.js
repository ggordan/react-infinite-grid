var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./example/example.js",
    output: {
        path: path.join(__dirname, 'example'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader" }
        ]
    }
};
