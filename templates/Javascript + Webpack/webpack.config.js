const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname , 'src/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        // assetModuleFilename: 'wasm/[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
       static: path.resolve(__dirname, 'dist'),
       port: 3001,
       open: true,
       hot: true,
    //    watchFiles: true
    },
    module: {
        exprContextCritical: false,
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator:{
                    filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.wasm$/,
                type: 'asset/resource',
                generator:{
                    filename: 'wasm/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname ,'src/index.html'),
            title:'IFC.js',
            filename:'index.html',
            // inject:false
        })
    ]
}