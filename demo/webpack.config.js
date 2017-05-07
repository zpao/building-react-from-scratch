let webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
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
  }
}
