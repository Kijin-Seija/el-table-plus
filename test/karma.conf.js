var testConfig = require('../conf/webpack.test.config');

// Karma configuration
// Generated on Mon Jun 19 2017 14:45:37 GMT+0800 (中国标准时间)
module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],
		// list of files / patterns to load in the browser
		files: [
			'unit/**/*.test.js'
		],
		// list of files to exclude
		exclude: [
      '../src/examples/**/*'
		],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'unit/**/*.test.js': ['webpack', 'sourcemap']
    },
		webpack: testConfig,
    webpackMiddleware: {
      // stats: 'errors-only',
      noInfo: false,
    },
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage'],
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},
		// web server port
		port: 9876,
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,
		// Concurrency level
		// how many browser should be started simultaneous
    concurrency: Infinity,
    // Fail on failing test suite
    failOnFailingTestSuite: false
	})
}
