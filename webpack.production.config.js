var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  'entry': {
    'vendor': [
      'react',
      'react-dom',
      'react-router',
      'axios',
      'redux',
      'react-redux',
      'redux-promise',
      'lodash',
      'react-bootstrap'
    ],
    'app': __dirname + '/src/main.js'
  },
  'output': {
    'path': __dirname + '/dist',
    'publicPath': '/',
    'chunkFilename': '[id].[name].chunk.js',
    'filename': '[name].[hash].js'
  },

  'module': {
    'preLoaders': [
      {
        'test': [/\.js$/, /\.jsx$/],
        'loaders': ['eslint'],
        'exclude': /(node_modules|bower_components|build|dist)/,
      }
    ],
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
    'extensions': ['', '.js', '.jsx', '.scss']
  },

  'plugins': [
    new webpack.BannerPlugin("Add your copyright statement here."),
    new HtmlWebpackPlugin({
      'template': __dirname + '/src/index.tmpl.html'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendors.js', Infinity),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'minimize': true,
      'compress': {
        'warnings': false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ],

};
