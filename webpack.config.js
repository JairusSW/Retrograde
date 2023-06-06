const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/test.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Retrograde",
            template: "test.html"
        })
    ],

    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
};