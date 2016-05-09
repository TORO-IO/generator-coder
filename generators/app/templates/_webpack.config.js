
module.exports = {
  entry: './src/app/index.js',
  output: {filename: 'app.js'},
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        cacheDirectory: true
      }
    ]
  }
}
