var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/testCode/vanttest.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build333.js'
  },
  module: {
    rules: [

        /*处理【样式】的loader */
        {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                  'file-loader'
                 ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                 'file-loader'
                 ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },

        {
          test:/\.vue$/,
          use:[
              'vue-loader'
          ]
        },
        {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: '$'
          }]
        }







    ]
  },
  devtool: '#eval-source-map'
}

