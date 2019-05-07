var webpack = require('webpack')
// 单独打包css的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// html文件打包的封装方法
var getHtmlConfig = function(name){
	return{
		// 模板路径
		template: './src/view/' + name + '.html',
		// 打包后路径及名称
		filename: 'view/' + name + '.html',
		inject: true,
		hash: true,
		// 打包后的html引入的模块
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js']
	},
	output: {
		path: __dirname + '/dist',
		// 这个路径是打包后的引入文件的前缀，需要加上才会触发webpack-dev-server刷新机制以及让引入的路径正确
		publicPath: '/dist/',
		filename: 'js/[name].js'
	},
	module: {
		rules: [
            { // webpack 3.x写法
                test: /\.(css|less)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
	},
	externals:{
        'jquery': 'window.jQuery'
    },
    plugins: [
		// css的打包
        new ExtractTextPlugin('css/[name].css'), 
        new HtmlWebpackPlugin(getHtmlConfig('index'))
    ],
    devServer: { // 跨域的配置
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
                pathRewrite: {
                    '^/api': '/'
                },
                secure: true,
                changeOrigin: true
            }
        }
    }
}

module.exports = config