var webpackClientConfig = require('../conf/webpack.prod.config');
var promiseify = require('./promiseWrapper');
var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var ora = require('ora');
var chalk = require('chalk');

const rmPromise = promiseify(rm);
const webpackCompilePromise = function (webpackConfig) {
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

var spinner = ora('building for production...');
spinner.start();

rmPromise(path.resolve(__dirname, '../dist')).then(() => {
  return webpackCompilePromise(webpackClientConfig).then(stats => {
    spinner.stop();
    if (stats) {
      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
      if (stats.hasErrors()) {
        throw new Error('  Build fail.\n');
      }
    }
    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
}).catch(err => {
  let message = err.message ? err.message : err;
  console.error(message);
});
