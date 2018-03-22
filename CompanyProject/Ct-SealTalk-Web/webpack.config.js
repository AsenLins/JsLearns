var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
   "sealTalkApp":'./src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '../',
    filename: 'scripts/[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    //contentBase: './dist',
    contentBase:path.join(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath:"assets/",          
        }
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
  plugins:[
    //new CleanWebpackPlugin(['dist/*']),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/page/index.html',
      filename: './page/index.html',
      chunks: ['sealTalkApp']    
    }), 

    
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
