#!/usr/bin/env node
'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _PackagePlugin = require('./PackagePlugin');

var _PackagePlugin2 = _interopRequireDefault(_PackagePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = (0, _webpack2.default)({
  entry: _path2.default.join(process.cwd(), 'src/index.js'),
  output: {
    filename: 'pack.js',
    path: _path2.default.join(process.cwd(), 'dist'),
    library: '$pack'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'latest', 'stage-2'],
        plugins: ['transform-flow-strip-types']
      }
    }]
  },
  plugins: [new _PackagePlugin2.default()]
});

compiler.run(function (err, stats) {
  if (err) {
    console.error(err);
  }

  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true // Shows colors in the console
  }));
});