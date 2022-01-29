var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        main: './main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js',
        /* filename: '[name].js',
        // 使用了异步路由后，编译出的每个页面的 js 都叫做 chunk(块)，它们命名默认是 0.main.js 1.main.js ...
        // 可以在 webpack 配置的 出口 output 里通过设置 chunkFilename 字段修改 chunl 命名
        chunkFilename: '[name].chunk.js' */
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    plugins: [
        /* // 重命名提取后的 CSS 文件
        new ExtractTextPlugin("main.css") */

        // 重命名提取后的 CSS 文件
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]

};

// 相当于于 export deafult config;
// 由于目前还没有安装支持 ES6 的编译插件，因此不能直接使用 ES6 的语法，否则会报错。
module.exports = config;