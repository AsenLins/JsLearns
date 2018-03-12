var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin=require("html-webpack-plugin")
console.log("html plugs",HtmlWebpackPlugin);
module.exports = {
  //entry: './src/main.js',
  entry:{
    index:"./src/page/index/index.vue",
    hosue:"./src/page/house/house.vue"

  },
  output: {
    path: path.resolve(__dirname, './dist/page/'),
    publicPath: '/dist/',
    filename: '[name]/[name].js'
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  
  plugins:[
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html'
      //template: 'src/assets/test.html'
    }),
    new HtmlWebpackPlugin({
      filename:"test2.html"
    })


    /*
    new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      //template: 'src/assets/test.html'
    }),

    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'detail.html',
      template: 'src/page/template.html'
    })
    */


  ]
  ,
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
