const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'client/src/index.js')],
  output: {
    path: path.resolve(__dirname, './server/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new ExtractTextPlugin('style.custom.css')
  ],
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
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
        loader: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: 'file-loader'
      }
    ]
  },
};
