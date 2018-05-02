const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV === "production";

module.exports = {
    devtool: devMode ? "none" : "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: "0.0.0.0",
        port: 4000,
        inline: true,
        hot: true,
        open: true
    },
    entry: path.resolve(__dirname, "src") + "/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: devMode ? "static/js/bundle.min.js" : "static/js/bundle.js",
    },
    module: {
        rules: [
            {
                test: /(\.jsx?)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? "style-loader" : miniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: "[name].[hash:base64:8]"
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? "style-loader" : miniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? "style-loader" : miniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: devMode ? "static/media/[sha512:hash:hex:8].[ext]" : "static/media/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new miniCssExtractPlugin({
            filename: devMode ? "static/css/bundle.min.css" : "static/css/bundle.css",
            chunkFilename: devMode ? "static/css/[id].css" : "static/css/[id].[hash].css",
        }),
        new copyWebpackPlugin([
            {from: "public"}
        ]),
        new htmlWebpackPlugin({
            template: "src/index.html"
        })
    ]
};

if (devMode) {
    module.exports.mode = "production";
} else {
    module.exports.mode = "development";
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}
