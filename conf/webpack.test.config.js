var path = require('path');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}

function __vueCssLoaders(preProcessorName) {
  let loaders = [
    'vue-style-loader',
    'css-loader',
    'postcss-loader'
  ];
  if (preProcessorName === 'scss') {
    loaders.push('sass-loader');
  } else if (preProcessorName === 'sass') {
    loaders.push({
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
      }
    });
  } else if (preProcessorName === 'less') {
    loaders.push('less-loader');
  }
  return loaders;
}

var testConfig = merge(baseConfig, {
  mode: 'development',
	devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
			{
				resource: {
					test: /\.css$/,
					include: [
            __path_src(),
            __path_test()
					]
				},
				use: __vueCssLoaders()
			},
			{
				resource: {
					test: /\.scss$/,
					include: [
            __path_src(),
            __path_test()
					]
				},
				use: __vueCssLoaders('scss')
			},
			{
				resource: {
					test: /\.sass$/,
					include: [
            __path_src(),
            __path_test()
					]
				},
				use: __vueCssLoaders('sass')
			},
			{
				resource: {
					test: /\.less$/,
					include: [
            __path_src(),
            __path_test()
					]
				},
				use: __vueCssLoaders('less')
			}
    ]
  }
});

module.exports = testConfig;
