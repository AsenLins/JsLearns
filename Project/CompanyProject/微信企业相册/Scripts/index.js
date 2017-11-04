(function(window,document,$){

  /*模板渲染对象*/
  var template=function(){
      this.GetObjMath= new RegExp(/\[\w+\]/g);
      this.GetObjNum=new RegExp(/\d/);
  };

  /*调用模板入口函数*/
  template.prototype.getDataTemplate=function(templateSelector,dataObj){
      var templateHtml="";
      var dataArray=[];
      if(dataObj.length!=undefined){
        dataArray=dataObj;
      }
      else{
        dataArray.push(dataObj);
      }
      for(var index=0;index<dataArray.length;index++){
        var temp=$(templateSelector).html();
        templateHtml=templateHtml+this._getTemplateStrByObj(temp,dataArray[index]);
      }
      return templateHtml;
  };

  /*模板处理方法*/
  template.prototype._getTemplateStrByObj=function(tempstr,obj){
    var self=this;
    return tempstr.replace(/\$\S+\$/g, function(matchs) {
        var matchVal=matchs.replace(/\$/g, "");
        var returns;

        if(matchVal.indexOf(".")>-1){
          returns=self._processMultiObj(matchVal,obj);
        }
        else{
          returns = obj[matchVal];
        }
        return (returns + "") == "undefined"? "": returns;
    });
  }

  /*多级对象嵌套处理方法*/
  template.prototype._processMultiObj=function(objStr,obj){
     var objStrArray=objStr.split('.');
     var currentObj=obj;
     for(var index=0;index<objStrArray.length;index++){
        var objName;
        if(objStrArray[index].indexOf("[")>-1){
          console.log(objStrArray);
          var tempIndex= new RegExp(/\[\w+\]/g).exec(objStrArray[index].toString());
          console.log(objStrArray[index])
          console.log("tempIndex:"+tempIndex);
          tempIndex=parseInt(new RegExp(/\d/).exec(tempIndex));
          var tempArrayName=objStrArray[index].replace(/\[\w+\]/g,"");
          if(currentObj[tempArrayName]==undefined||currentObj[tempArrayName].lenght==0){
            return "";
          }
          console.log("name:"+tempArrayName+"index:"+tempIndex);
          currentObj=currentObj[tempArrayName][tempIndex];
        }
        else{
          if(currentObj==undefined||currentObj==null){
            return "";
          }
          currentObj=currentObj[objStrArray[index]];
        }
     }
     return currentObj
  }


    /*数据请求对象*/
    var http=function(){
        this.ajaxObj=null;
    };
    http.prototype.useAjax=function(option){

        if(this.ajaxObj!=null){
           this.ajaxObj.abort();
        }

        this.ajaxObj=$.ajax(option);
    };


    /*数据对象*/
    var data=function(http){
        this.httpRequest=http;
        this.urlMap={
          getAlbum:"DemoData/Index.json?v=11",
        };
    };

    data.prototype.dealParam=function(paramObj){
      var paramStr="";
      for(var name in paramObj){
        paramStr=paramStr+"&"+name+"="+paramObj[name];
      }
      if(paramStr!=""){
        paramStr=paramStr.substring(1);
      }
      return paramStr;

    };

    data.prototype._request=function(url,type,param,callBack,err){
      if(param!=null&&type=="get"){
        var paramStr=this.dealParam(param);
        url=url+"?"+paramStr;
        param=null;
      }
      this.httpRequest.useAjax({
        url:url,
        type:type,
        data:param,
        success:function(data){
          if(callBack!=undefined){
            callBack(data);
          }
        },
        error:function(reqObj,mes,errObj){
          if(err!=undefined){
            err(reqObj,mes,errObj);
          }
        }
      });
    };

    data.prototype.getAlbum=function(param,callBack,err){
       this._request(this.urlMap.getAlbum,"get",param,callBack,err);
    };

    /*相册首页逻辑类*/
    var index=function(){
      var httpObj=new http();
      var templateObj=new template();
      var dataObj=new data(httpObj);
      var $window = $(window);
      var $document = $(document);
      this.queryStr="";
      this.pageIndex=1;
      var self=this;
      this.dom={
        albumPlane:$("#album-plane"),
      }

      loadAlbum("123",1,15)

      $window.scroll(function () {
          if ($window.scrollTop() + $window.height() >=  $document.height()) {
            loadAlbum(self.pageIndex,25);
          }
      });

      $(window).on("keyup",function(e){
          console.log(e);
          if(e.code=="Enter"){
            self.dom.albumPlane.empty();
            self.queryStr=$("#txt-plane").val();
            loadAlbum(1,15);
          }
      });
      function loadAlbum(pageIndex,pageSize){

        dataObj.getAlbum({queryStr:self.queryStr,pageIndex:pageIndex,pageSize:pageSize},
          function(data){
                console.log(data);
                var templateStr=templateObj.getDataTemplate("#template-album-item",data.indexData);
                //console.log(dom);
                $("#album-plan").append(templateStr);
                //dom.albumPlane.append(templateStr);
                self.pageIndex++;
          },
          function(){

          });

        }



    }

    /*入口函数*/
    $(function(){
      window.index=new index();
    });



})(window,document,Zepto);
