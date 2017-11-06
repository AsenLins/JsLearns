(function(){
  /*
  simpleTemplate.js
  是一个简单的，轻量级的，响应式数据绑定模板，它支持以下功能：
  1.模板数据渲染
  2.模板数据是双向绑定的（待定）。
  3.支持请求数据并且绑定（待定）
  */
  var templateFactory=function(){
      this.option={

      };
      this.cache=[];
      this.data={};
  }
  /*生成模板数据主方法*/
  templateFactory.prototype.get=function(templateStr,data){
    this._each(data,null);
  }
  templateFactory.prototype._eachArray=function(dataArray,name){
      var itemName=name;
      for(var index=0;index<dataArray.length;index++){
        itemName=itemName+"["+index+"]="+dataArray[index];
        if(dataArray[index] instanceof Array){

        }
        else if(dataArray[index] instanceof Object){

        }
        else{

          
        }
      }

  };
  templateFactory.prototype._eachObj=function(obj,name){

  };
  /*数据data迭代器*/
  templateFactory.prototype._each=function(currentData,itemName){
    var keyName=itemName;
    for(var key in currentData){
      if(currentData[key] instanceof Array){
        this._eachArray(currentData,key);
      }
      else if(currentData[key] instanceof Object){
        this._eachObj(currentData,key);
      }
      else{
        console.log(currentData[key]);
      }

    }



    /*

    for(var key in currentData){

      if(itemName===null){
        console.log("为空："+key);
        keyName=key;
      }
      if(currentData[key] instanceof Array){
        this._each(currentData[key],keyName+".");
      }
      if(currentData[key] instanceof Object){
        for(var objKey in currentData[key]){
           if(currentData[key][objKey] instanceof Array){
             this._each(currentData[key][objKey]);
           }
           else{
                console.log(currentData[key][objKey]);
           }

        }
      }
      else{
        console.log("344444"+keyName);
        console.log(currentData[key]);
      }
    }
    */

  }
  //templateFactory.prototype._
  var testdata={
    name:"asen",
    age:1,
    photoList:"isList",
    thelist:[{
      kimname:1,
      bage:10
    },
    {
      billgay:2,
      po:3,
      thelist5:[
        1,2,{
          array:[
            {
              aname:"asen6",
              bage:48
            }

          ]
        }
      ]
    }
  ]
  }
  var testdata2={
    phonelist:[{
      count:1,
      money:20
    },
    {
      count:2,
      money:30
    }
  ]
  }

  var testFactor=new templateFactory();
  testFactor.get("{{item.name}}",testdata);

  //window.tpfactory=new templateFactory();

  var simpleTemplate=function(){
        this.param={


        }
  }



})();
