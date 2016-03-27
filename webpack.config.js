var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  'devtool': 'eval-source-map',

  'entry': {
    'vendor': [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-promise',
      'lodash',
      'react-bootstrap'
    ],
    'app':  __dirname + '/src/main.js'
  },
  'output': {
    'path': __dirname + '/build',
    'publicPath': '/',
    'chunkFilename': '[id].[name].chunk.js',
    'filename': '[name].[hash].js'
  },

  'module': {
    'loaders': [
      // JSX and JS transpilation using babel
      {
        'test': [/\.js$/, /\.jsx$/],
        'exclude': /(node_modules|bower_components)/,
        'loader': 'babel'
      },
      // SASS modularization using style, css and postcss loader
      {
        'test': [/\.css$/, /\.scss$/],
        'loader': 'style!css!sass'
      },
      // Font path loader
      {
        'test': /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        'loader': 'file-loader?name=fonts/[name].[ext]'
      },
      // Image path loader
      {
        'test': /\.(jpe?g|png|gif|svg)$/i,
        'loaders': [
          'url-loader?limit=15000&name=images/[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },

  'resolve': {
    'root': [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    'extensions': ['', '.js', '.jsx', '.scss'],
  },

  'plugins': [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.BannerPlugin("Feel free to add your copyright statement here."),
    new HtmlWebpackPlugin({
      'template': __dirname + '/src/index.tmpl.html'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendors.js', Infinity),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.DedupePlugin()
  ],

  'devServer': {
    'contentBase': './build',
    'colors': true,
    'hot': true,
    'historyApiFallback': true,
    'inline': true,
    // Display only errors to reduce the amount of output.
     'stats': 'errors-only',
  }
};
