let webpack = require('webpack');
let CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  entry: './dilithium.js',
  output: {
    path: __dirname,
    filename: 'build/Dilithium.js',
    libraryTarget: 'var',
    library: 'Dilithium'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          plugins: [
            ['transform-react-jsx', {pragma: 'Dilithium.createElement'}],
            'transform-class-properties'
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new CircularDependencyPlugin(),
  ]
}
