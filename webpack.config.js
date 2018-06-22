const path = require('path')

module.exports = {
  entry: './src/index.js',
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
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
}
