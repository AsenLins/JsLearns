const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");

/*基础loader*/
var baseModule={
    rules:[
        /*处理【样式】的loader */
        {
            test:"/\.css$/",
            use:[
                'style-loader',
                'css-loader'
            ]
        },
        /*处理【图片】资源loader*/
        {
            test:"/\.(png|svg|jpg|gif)$/",
            use:[
                "file-loader"
            ]
        },
        /*处理【字体】资源loader */
        {
            test:"/\.(woff|woff2|eot|ttf|otf)$/",
            use:[
                "file-loader"
            ]
        }
    ]
}

/*基础插件*/
var basePlugis=[
    new CleanWebpackPlugin(["dist"])
];

/*webpack配置*/
var webPackConfig={
    /*入口*/
    entry:{},
    /*输出*/
    output:{},
    /*loader*/
    module:{},
    /*插件*/
    plugins:[],

    /*设置显示错误源*/
    devtool: "inline-source-map",
    
    /*启用webpack自带的web服务器*/
    devServer:{
        /*启动的根目录*/
        contentBase:"./dist"
    }
}

module.exports=webPackConfig;
