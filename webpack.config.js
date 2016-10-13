var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log("ENVIRONMENT: ", process.env.ENV);

module.exports = {
    entry: "./src/index.js",
    output: { path: path.resolve(__dirname, "build"), filename: "bundle.js" },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread", "transform-class-properties"]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style",
                    loader: "css?sourceMap!sass?sourceMap"
                })
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        publicPath: "/build/",
        proxy: [{
            path: "/api/**",
            target: "http://patrick:8000",
            secure: false,
            changeOrigin: true
        }]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
    // plugins: [
    //     new webpack.DefinePlugin({
    //         API_URL: JSON.stringify("http://patrick:8000/api"),
    //         CLIENT_ID: JSON.stringify("P4zCpN9vhFjNTfBLWfYtfsAKMm4883ScM3cXH1s1")
    //     })
    // ]
};
