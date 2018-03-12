const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const glob=require("glob");
var webpack=require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var webPackConfig={
    entry:{


    },
    output:{
        filename:"scripts/[name].js",
        path:path.resolve(__dirname, 'dist')
    },
    plugins:[

    ]
}

function getEntrierPath(config){
    var filesArray=glob.sync("./src/page/**/*.js");
    var fileObjs={};
    for(var index=0;index<filesArray.length;index++){
        var filePath=filesArray[index];
        var splitArray= filePath.split('/');
        var fileName=splitArray[splitArray.length-2];
        fileObjs[fileName]=filePath;

        
    }
    console.log("===========fileObj IS:============");
    console.log(fileObjs);
    return fileObjs;
}

var entrys=getEntrierPath(webPackConfig);

initEntrier(entrys);

function initEntrier(entrys){
    for(var entryKey in entrys){
        webPackConfig.entry[entryKey]=entrys[entryKey]
    }
}


function InitHtml(entrys){
    for(var entryKey in entrys){

        console.log("entryKey:"+entryKey);

        var HtmlPlugs=new HtmlWebpackPlugin({
            filename:"page/"+entryKey+".html",
            template:"./src/page/"+entryKey+"/"+entryKey+".html",
            inject:true,
            chunks:[entryKey]
        });

        webPackConfig.plugins.push(HtmlPlugs);
    }
}

InitHtml(entrys);



var commonPackage=['']

module.exports=webPackConfig