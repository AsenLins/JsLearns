const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    index1:'./src/index.js',
    //index2:'./src/index2.js'
  },
  output: {
    //filename: 'bundle.js', //默认输出名称为：bundle.js
    filename:'[name].js',  //默认输出为：entry的key名称
    //filename:'[name][chunkhash].js',//默认输出为:entry的key名称+哈希值。
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map', //开启错误源提示（会显代码源的错误）,该选项不要在生产环境使用。
  devServer:{
    contentBase: './dist',
    hot: true noInfo            //启动热加载
  },
  plugins: [
       //new CleanWebpackPlugin(['dist']),  //清除目录
       new HtmlWebpackPlugin({
         title: '这是输出的html标题'
       }),
       new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    /*使用CSS加载器*/
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      /*使用file加载器*/
      {
        test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
      }





    ]
  }



};
