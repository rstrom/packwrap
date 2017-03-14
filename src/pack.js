#!/usr/bin/env node
import webpack from 'webpack'
import path from 'path'
import PackagePlugin from './PackagePlugin'

const compiler = webpack({
  entry: path.join(process.cwd(), 'src/index.js'),
  output: {
    filename: 'pack.js',
    path: path.join(process.cwd(), 'dist'),
    library: '$pack'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'latest', 'stage-2'],
          plugins: ['transform-flow-strip-types']
        }
      }
    ]
  },
  plugins: [
    new PackagePlugin()
  ]
})

compiler.run((err, stats) => {
  if (err) {
    console.error(err)
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }))
})
