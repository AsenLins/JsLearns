/*
  相册业务逻辑类
  Create By Asen
  2017/10/26
*/
(function(window,document,$){
  "use strict"

  /*相册轮播对象*/
  var slide=function(){
    this.touchState="unslide",
    this.beforeX=0;
    this.afterX=0;
    this.startX=0;
    this.endX=0;
    this.img={
      index:0,
      list:[]
    },
    this.nextEvent=[];
    this.prevEvent=[];
    this.moveEffect=null,
    this.maxMoveLefts=0,
    this.maxMoveRight=0,
    this.maxMoveSlideRight=0,
    this.needChangeImgX=0,
    this.screenWidth=document.body.clientWidth;
    this.slideOption={
        dom:{
          slidePlane:".album-slide-plane",
          albumList:".album-list",
          albumNum:"#album-num-index",
          prev:"#album-btn-prev",
          next:"#album-btn-next"
        },
        data:null
    };
    this.slideDom={};
  };

  /*解绑上一张触发事件*/
  slide.prototype.unbindPrev=function(){
    this.prevEvent=[];
  };

  /*解绑下一张触发事件*/
  slide.prototype.unbindNext=function(){
    this.nextEvent=[];
  };

  /*下一张触发的事件绑定*/
  slide.prototype.nextBind=function(callBack){
    this.nextEvent.push(callBack);
  };

  /*上一张触发的事件绑定*/
  slide.prototype.prevBind=function(callBack){
    this.prevEvent.push(callBack);
  };

  /*添加图片节点到容器*/
  slide.prototype._setImgInit=function(){
      for(var index=0;index<this.img.list.length;index++){
        this.appendImg(this.img.list[index].url,index);
      }
  };

  /*设置touch图片时偏移量触发滚动*/
  slide.prototype._setNeedChangeX=function(){
      this.needChangeImgX=this.screenWidth/6;
  };

  /*设置动画框架，（默认引用move.js）*/
  slide.prototype._setEffect=function(){
    if(window.move!=undefined){
      this.moveEffect=window.move;
    }
  };

  /*获取当前滚动偏移量*/
  slide.prototype._getPlaneLeft=function(){
    var transformArray=this.slideDom.slidePlane.css('transform').replace(/[^0-9\-,]/g,'').split(',');
    return parseInt(transformArray[0]==""?0:transformArray[0]);
  };
  /*初始化最大滚动偏移量*/
  slide.prototype._setMaxMove=function(){
    var imgCount=this.img.list.length;
    this.maxMoveLeft=this.screenWidth/2;
    this.maxMoveRight=((imgCount*this.screenWidth))-(this.screenWidth);
    this.maxMoveSlideRight=((imgCount*this.screenWidth))+((imgCount*this.screenWidth)/imgCount)/2;
  };

  /*轮播对象入口函数*/
  slide.prototype._init=function(imgList){
      //console.log(this);
      var option=this.slideOption.dom;
      var target=this.slideDom;
      this.img.list=imgList;
      _setDomInJQORZepto(option,target);
      this._setEffect();
      this._setMaxMove();
      this._setNeedChangeX();
      this._slidePlaneInit();
      this._setImgInit();
      this._bindEvent();

  };

  /*轮播容器宽度初始化*/
  slide.prototype._slidePlaneInit=function(){
      var planeWidth=this.img.list.length*this.screenWidth;
      this.slideDom.slidePlane.width(planeWidth);
  };

  /*添加图片节点到轮播容器*/
  slide.prototype.appendImg=function(src,index){
      this.slideDom.slidePlane.append("<img  data-imgIndex="+index+" data-src="+src+" width='"+this.screenWidth+"' src=''  />");

  };

  /*预加载图片主体方法*/
  slide.prototype._loadImg=function(src,index){
    var loadImg=new Image();
    var self=this;
    loadImg.src=src;
    loadImg.onload=function(){
        var ImgObj= self.slideDom.slidePlane.find("img[data-imgIndex='"+index+"']");
        ImgObj.attr("data-height",this.height);
        //slide.slideDom.slidePlane.append("<img width='"+slide.screenWidth+"' src='"+this.src+"'"+" />");
    }
  };

   /*通过图片索引滚动到当前图片位置*/
   slide.prototype.setImgIndex=function(index){

      var planeLeft=index*this.screenWidth;

      var nextImg=this.slideDom.slidePlane.find("img").eq(index+1);
      var prevImg=this.slideDom.slidePlane.find("img").eq(index-1);
      var currentImg=this.slideDom.slidePlane.find("img").eq(index);
      var dataSrc=currentImg.attr("data-src");
      this.img.index=index;
      this._loadImg(currentImg.attr("data-src"), index);
      currentImg.attr("src",dataSrc);

      this.slideDom.slidePlane.css("transform","translate("+-planeLeft+"px,0px)");
      var selector=this.slideDom.slidePlane.selector+" img[data-index='"+index+"']";

      if(prevImg!=undefined&&prevImg.attr("src")!=undefined){
        prevImg.attr("src",prevImg.attr("data-src"));
        this._loadImg(prevImg.attr("data-src"), index-1);
      }
      if(nextImg!=undefined&&nextImg.attr("src")!=undefined){
        nextImg.attr("src",nextImg.attr("data-src"));
        this._loadImg(nextImg.attr("data-src"), index+1);
      }

      this.updateNumCount();

      var self=this;
      setTimeout(function(){
        self.slideDom.albumList.height(currentImg.height());
      },250);

   }

  /*滚动到下一张图片的位置*/
  slide.prototype.next=function(){
    if(this.img.index+1>this.img.list.length-1){
      return;
    }
    this.img.index=this.img.index+1;
    this.setImgIndex(this.img.index);
    var picId=this.img.list[this.img.index].id;
    var planeleft= this.img.index*this.screenWidth;
    this.moveEffect(this.slideDom.slidePlane.selector).x(-planeleft).end();

    if(this.nextEvent.length>0){
       for(var eventIndex=0;eventIndex<this.nextEvent.length;eventIndex++){
          this.nextEvent[eventIndex].call(this,arguments,picId);
       }
    }

  };

  /*滚动到上一张图片的位置*/
  slide.prototype.prev=function(e){
    if(this.img.index-1<0){
      return;
    }
    this.img.index=this.img.index-1;
    this.setImgIndex(this.img.index);
    var picId=this.img.list[this.img.index].id;
    var planeleft= this.img.index*this.screenWidth;

    this.moveEffect(this.slideDom.slidePlane.selector).x(-planeleft).end();
    if(this.prevEvent.length>0){
       for(var eventIndex=0;eventIndex<this.prevEvent.length;eventIndex++){
          this.prevEvent[eventIndex].call(this,arguments,picId);
       }
    }
  };

  /*回到原始位置*/
  slide.prototype.reset=function(){
    this.img.index=this.img.index;
    var planeleft= this.img.index*this.screenWidth;
    this.moveEffect(this.slideDom.slidePlane.selector).x(-planeleft).end();
  };

  /*滚动相册到指定位置X*/
  slide.prototype.move=function(moveX){
      this.moveEffect(this.slideDom.slidePlane.selector).x(-moveX).end();
  }

  /*更新当前相册索引*/
  slide.prototype.updateNumCount=function(){
      this.slideDom.albumNum.text(this.img.index+1+"/"+(this.img.list.length));
  };

  slide.prototype._bindEvent=function(){
    var self=this;
    this.slideDom.slidePlane.on("touchstart",function(e){
        self.beforeX=e.targetTouches[0].clientX;
        self.startX=e.targetTouches[0].clientX;
        //console.log("=====StartX=====");
        //console.log(slide.startX);
    });

    this.slideDom.slidePlane.on("touchmove",function(e){
        //console.log(e);
        var planeleft=self._getPlaneLeft();
        var needMoveLeft=self.screenWidth-planeleft;

        /*右滑*/
        if(self.startX<=e.targetTouches[0].clientX){
          planeleft=planeleft+4;
        }
        /*左滑*/
        else{
          planeleft=planeleft-4;
        }
        /*超出最大滑动范围*/
        if(planeleft>self.maxMoveLeft||planeleft<=-self.maxMoveSlideRight){
          return;
        }

        self.startX=e.targetTouches[0].clientX;
        self.afterX=e.targetTouches[0].clientX;
        self.slideDom.slidePlane.css("transform","translate("+planeleft+"px,0px)");

    });

    this.slideDom.slidePlane.on("touchend",function(e){

      var planeleft=self._getPlaneLeft();
      console.log(planeleft);
      if(planeleft>=0){
        self.reset();
        return;
      }

      if(planeleft<=-self.maxMoveRight||self.slideDom.slidePlane.find("img").size()==1){
        self.reset();
        return;
      }

      if(Math.abs(self.beforeX-self.afterX)>self.needChangeImgX){
        if(self.beforeX>self.afterX){
            self.next();
        }
        else{
            self.prev();
        }
      }
      /*回到原位置*/
      else{
        self.reset();
      }

    });

    this.slideDom.prev.on("click",function(){
      self.prev();
    });
    this.slideDom.next.on("click",function(){
      self.next();
    });

  };

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
        getPicDetailInit:"DemoData/AlbumDetail.json",
        getPicReviewAndGoodByPicIdUrl:"DemoData/LikeAndReview.json",
        getPicReviewByPage:"DemoData/Review.json",
        getPicLikeByPage:"DemoData/Like.json"
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

  data.prototype.getPicInitData=function(param,callBack,err){
     this._request(this.urlMap.getPicDetailInit,"get",param,callBack,err);
  };

  data.prototype.getReviewAndGoodByPicId=function(param,callBack,err){
    this._request(this.urlMap.getReviewAndGoodByPicId,"get",param,callBack,err);
  };

  data.prototype.getPicReviewByPage=function(param,callBack,err){
    this._request(this.urlMap.getPicReviewByPage,"get",param,callBack,err);
  };

  data.prototype.getPicGoodByPage=function(param,callBack,err){
    this._request(this.urlMap.getPicLikeByPage,"get",param,callBack,err);
  };

  /*tab对象*/
  var tab=function(){
    this.current="review";
    this.dom={
       tabTitle:$("#album-tab-title"),
       tabPlane:$("#album-tabPlane")
    };

    function _bindEvent(that){
      var self=that;
      self.dom.tabTitle.find("div").on("click",function(){
        self.setTab($(this).attr("data-type"));
      });
    };
    _bindEvent(this);

  }
  tab.prototype.setNum=function(type,num){
    console.log(type+":"+num);
    this.dom.tabTitle.find("div[data-type='"+type+"'] lable").text("("+num+")");
  }
  tab.prototype.setTab=function(type){
    this.dom.tabTitle.find("div").attr("class","unselect");
    this.dom.tabTitle.find("div[data-type='"+type+"']").attr("class","select");
    this.dom.tabPlane.find("div[data-planeId]").css("display","none");
    this.dom.tabPlane.find("div[data-planeId='"+type+"']").css("display","block");
  };


  /*评论与赞业务对象*/
  var review=function(template,tab){
      this.pageIndex=0;
      this.template=template;
      this.tab=tab;
      this.count=0;
      this.templateMap={
        templateReview:"#template-review"

      };
      this.dom={
        reviewContent:$("#album-content-review")
      };
  };
  review.prototype.bindEvent=function(){

  };

  review.prototype.setCount=function(count){
    this.count=count;
    this.tab.setNum("review",this.count);
  };
  review.prototype.setOneDataInReviewPlane=function(){

  };
  review.prototype.setDataInRviewPlane=function(dataObj){
    var tempStr=this.template.getDataTemplate(this.templateMap.templateReview,dataObj);
    this.dom.reviewContent.append(tempStr);
    //console.log(tempStr);
  };

  review.prototype.getReviewDataByPage=function(dataObj){
    var self=this;
    dataObj.getPicReviewByPage({pageIndex:this.pageIndex},
      function(data){
        console.log("评论分页");
        console.log(data);
        self.setDataInRviewPlane(data.Reivew);
        self.pageIndex++;
      },
      function(){

      })
  };

  review.prototype.display=function(){

  };

  review.prototype.empty=function(){

  };

  review.prototype.setViewStyle=function(){

  };

  review.prototype.postReview=function(){

  };

  /*点赞对象*/
  var like=function(template,tab){
    this.pageIndex=1;
    this.template=template;
    this.tab=tab;
    this.count=0;
    this.move=window.move;
    this.templateMap={
      templateLike:"#template-Like"

    }
    this.dom={
      likeContent:$("#album-content-like"),
      btnLike:$("#btn-like")
    }


  };
  like.prototype.setCount=function(count){
    console.log(this.tab);
    this.count=count;

    this.tab.setNum("like",this.count);
  };
  like.prototype.bindEvent=function(){

  };
  like.prototype.setOneDataInReviewPlane=function(dataObj){

  };

  like.prototype.setDataInLikePlane=function(dataObj){
    var tempStr=this.template.getDataTemplate(this.templateMap.templateLike,dataObj);
    console.log(tempStr);
    this.dom.likeContent.append(tempStr);
  };

  like.prototype.getPicGoodByPage=function(data){

      //data.getPicReviewByPage();
  };

  like.prototype.display=function(){

  };

  like.prototype.empty=function(){

  };

  like.prototype.setViewStyle=function(){

  };

  like.prototype.postLike=function(){

  };

  like.prototype.like=function(){
    var btnLike=this.dom.btnLike;
    var self=this;
    btnLike.css("color","#fd5454");
    this.move(btnLike.selector).scale(2).duration('0.2s').end(function(){
      setTimeout(
        function(){
          self.move(btnLike.selector).scale(1).end();
        },1)
    });
  };

  like.prototype.unlike=function(){
    var btnLike=this.dom.btnLike;
    var self=this;
    btnLike.css("color","#9f9f9f");
    this.move(btnLike.selector).rotate(30).duration('0.2s').end(function(){
      setTimeout(function(){
        self.move(btnLike.selector).rotate(-2).duration('0.2s').end();
      },1);
    });
  };


 var Likeob=new like();
 Likeob.unlike();


  /*
  var dc="obj[1]";
  var patt1=new RegExp(/\[\w+\]/g);
  var patt2=new RegExp(/\d/);
  var dc2= patt1.exec("obj[1]");
  var dc3= patt2.exec(dc2);
  console.log("这个值是："+dc2);
  console.log("这个二值是："+dc3);
  */
  //console.log("这个值是"+matchs.replace(/\$/g, ""));

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
          var tempIndex=this.GetObjMath.exec(objStrArray[index]);
          tempIndex=parseInt(this.GetObjNum.exec(tempIndex));
          var tempArrayName=objStrArray[index].replace(/\[\w+\]/g,"");
          if(currentObj[tempArrayName]==undefined||currentObj[tempArrayName].lenght==0){
            return "";
          }
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

  var albumAlert=function(){
      this.dom={
        alertPlane:$("#album-alert")
      };
      this.status=false;
      this.move=window.move;

  };
  albumAlert.prototype.show=function(){
    if(this.status){
      return;
    }
    this.status=true;
    var self=this;
    var alertPlane=this.dom.alertPlane;
    alertPlane.css({"display":"-webkit-box","opacity":"0"});
    setTimeout(function(){
        self.move(alertPlane.selector).set("opacity",1)
        .end(function(){
          self.move(alertPlane.selector).delay(1000).set("opacity",0).end(function(){
            setTimeout(function(){
              alertPlane.css({"display":"none","opacity":"0"});
              this.state=false;
            },100);
          });
        });
    },100);
  };

  var albumConfirm=function(){
    this.dom={
      albumConfirm:$("#album-confirm"),
      btnCancel:$("#btn-confirm-cancel"),
      btnSure:$("#btn-confirm-sure")

    };
    this.sureEvent=[];
    this.cancelEvent=[];
    this.move=window.move;
    var self=this;
    function _bindEvent(){
      self.dom.btnCancel.on("click",function(){
        for(var index=0;index<self.cancelEvent.length;index++){
          self.cancelEvent[index].call(self,arguments);
        }
      });
      self.dom.btnSure.on("click",function(){
        for(var index=0;index<self.sureEvent.length;index++){
          self.sureEvent[index].call(self,arguments);
        }
      });
    }

    _bindEvent();
  };

  albumConfirm.prototype.show=function(){
    var albumConfirm=this.dom.albumConfirm;
    albumConfirm.css({"display":"-webkit-box","opacity":"0"});
    setTimeout(function(){
        this.move(albumConfirm.selector).set("opacity","1").end();
    },100);

  };
  albumConfirm.prototype.hide=function(){
    var albumConfirm=this.dom.albumConfirm;
    var self=this;
    this.move(albumConfirm.selector).set("opacity","0").end(function(){
          setTimeout(function(){
            albumConfirm.css({"display":"none","opacity":"0"});
          },100);
    });
  };
  albumConfirm.prototype.bindSureEvent=function(fn){
    if(fn!=undefined){
      this.sureEvent.push(fn);
    }
  }
  albumConfirm.prototype.bindCancelEvent=function(fn){
    if(fn!=undefined){
      this.cancelEvent.push(fn);
    }
  }




  //var templateObj=new template();
  /*
  var templateStr=templateObj.getDataTemplate("#template-review",
  [{
    userpic:"123",
    userName:"林先生",
    userText:"good",
    user:{
      name:"我是内嵌的名字哦",
      age:18
    }
  },
  {
    userpic:"266",
    userName:"林先生2",
    userText:"good3"
  }]
  );
  console.log("======template is ======");
  console.log(templateStr);
  */


  /*【公共方法】设置指定节点进对象*/
  function _setDomInJQORZepto(initDomObj,initTarget){
    if(initDomObj==undefined||initDomObj==null){
      return ;
    }
    //console.log("=====初始化Zepto或Jquery节点=====");
    for(var name in initDomObj){
      var domName=initDomObj[name];
      initTarget[name]=$(domName);
    }
    //console.log(initTarget);
  }

  /*页面业务逻辑对象（入口函数）*/
  var albumDetail=function(){
    var tabObj=new tab();
    var templateObj=new template();
    var httpObj=new http();
    var dataObj=new data(httpObj);
    var slideObj=new slide();
    var reviewObj=new review(templateObj,tabObj);
    var likeObj=new like(templateObj,tabObj);

    /*页面初始化方法*/
    dataObj.getPicInitData({picId:"aaa"},
      function(data){
        console.log(data);
        console.log(data.photoDetails.PhotoList);
        var picList=data.photoDetails.PhotoList;
        var likeData=data.photoDetails.Like;
        var reviewData=data.photoDetails.Reivew;

        slideObj._init(picList.list);
        slideObj.setImgIndex(picList.currentIndex);

        reviewObj.setDataInRviewPlane(reviewData.list);
        reviewObj.setCount(reviewData.count);

        likeObj.setDataInLikePlane(likeData.list);
        likeObj.setCount(likeData.count);

        reviewObj.getReviewDataByPage(dataObj);

      },
      function(){

      }
    );
    /*
    slideObj._init([
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/Demo4.jpg",id:1},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",id:2},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",id:3},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/Demo4.jpg",id:4}
    ]);
    */


    slideObj.nextBind(function(arg,Id){
        console.log("下一个的相册索引是："+Id);

    });
    slideObj.prevBind(function(arg,Id){
        console.log("上一个的相册索引是："+Id);
    });

  }

  /*调用入口函数*/
  $(function(){
    /*
    var albumAlertObj=new albumAlert();
        albumAlertObj.show();
    var albumConfirmObj=new albumConfirm();
    albumConfirmObj.bindCancelEvent(function(){
      albumConfirmObj.hide();
    });
    albumConfirmObj.bindSureEvent(function(){

    });
    albumConfirmObj.show();
    */


    window.albumDetail=new albumDetail();
  });


})(window,document,Zepto);
