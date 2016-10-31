var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, '/public'),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/app.tsx",
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, "./public/scripts"),
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    module: {
        loaders: [
            {test: /\.tsx$/, exclude: /node_modules/, loaders: ['babel', 'ts-loader']}
        ]
    }
};