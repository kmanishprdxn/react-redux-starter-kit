module.exports = function (config) {
  config.set({
    'browsers': [ 'Chrome' ],
    // karma only needs to know about the test bundle
    'files': [
      'tests.webpack.js'
    ],
    'frameworks': [ 'mocha', 'chai' ],
    'plugins': [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    // run the bundle through the webpack and sourcemap plugins
    'preprocessors': {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    'reporters': [ 'mocha' ],
    'singleRun': true,
    // webpack config object
    'webpack': require('./webpack.config.js')[2],
    'webpackMiddleware': {
      'noInfo': true,
    }
  });
};
