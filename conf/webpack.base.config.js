var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}

module.exports = {
	resolve: {
		extensions: ['.js', '.vue', '.json']
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|html|vue)$/,
				include: [
          __path_src()
				],
				use: [
					{
						loader: 'eslint-loader',
						options: {
              formatter: require('eslint-friendly-formatter'),
              fix: true,
              failOnError: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				include: [
          __path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'vue-loader'
					}
				]
			},
			{
				test: /\.js$/,
				include: [
          __path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.html$/,
				include: [
          __path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				resource: {
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					include: [
            __path_src(),
            __path_test()
					]
				},
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'static/img/[name].[hash:7].[ext]'
						}
					}
				]
			}
		]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
