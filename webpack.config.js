const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
    devtool: devMode ? "source-map" : "none",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: "localhost",
        port: 4000,
        inline: true,
        hot: true,
        open: true
    },
    entry: path.resolve(__dirname, "src") + "/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: devMode ? "static/js/bundle.js" : "static/js/bundle.min.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            "stage-0",
                            "react"
                        ],
                        plugins: [
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": "css"
                            }],
                            "transform-runtime"
                        ],
                    }
                },
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "less-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
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
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimizer: [new UglifyJsWebpackPlugin({
            parallel: true,
        })],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default", {discardComments: {removeAll: true}}],
            },
            canPrint: true
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? "static/css/bundle.css" : "static/css/bundle.min.css",
            chunkFilename: devMode ? "static/css/[id].css" : "static/css/[id].min.css",
            ignoreOrder: true,
        }),
        new CopyWebpackPlugin([
            {from: "public"}
        ]),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            hash: true,
            template: "src/index.html"
        })
    ]
};

if (devMode) {
    module.exports.mode = "development";
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    module.exports.mode = "production";
}
