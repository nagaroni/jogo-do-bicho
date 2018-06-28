const path = require('path')

module.exports = {
  entry: './assets/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'assets', 'javascripts')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
}
