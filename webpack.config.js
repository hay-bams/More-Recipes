const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './client/src/index.js')],
  output: {
    path: path.resolve(__dirname, './client/build'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/build'),
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },

      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file-loader'
      }
    ]
  },
};
