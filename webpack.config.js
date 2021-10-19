const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const terserPlugin = new TerserWebpackPlugin({
    parallel: 4,
    extractComments: true,
    terserOptions: {
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"], //移除console
        },
    },
});

module.exports = {
    entry: {
        index: path.join(__dirname, "/lib/index.js"), // 入口文件
    },
    output: {
        path: path.join(__dirname, "/dist"), // 打包后的文件存放在dist文件夹
        publicPath: "/dist/", // 设置公共路径
        filename: "index.js", // 打包后输出文件的文件名
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin(), terserPlugin],
    externals: /^(@{0,1})vue/i,
};
