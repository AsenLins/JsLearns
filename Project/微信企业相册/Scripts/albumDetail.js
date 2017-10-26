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
        getPicDetailInit:"http://url1.com/t1",
        getPicReviewAndGoodByPicIdUrl:"http://url2.com/t2",
        getPicReviewByPage:"http://url3.com/t3",
        getPicGoodByPage:"http://url4.com/t4"
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
      success:function(){
        if(callBack!=undefined){
          callBack(data);
        }
      },
      error:function(){
        if(err!=undefined){
          err();
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
    this._request(this.urlMap.getPicGoodByPage,"get",param,callBack,err);
  };

  /*tab对象*/
  var tab=function(){
    this.current="review";
    this.dom={

    }
  }
  tab.prototype.setTab=function(type){

  };


  /*评论与赞业务对象*/
  var review=function(template){
      this.pageIndex=0;
      this.template=template;
      this.dom={
        dataPlane:""
      }
  };
  review.prototype.bindEvent=function(){

  };

  review.prototype.setCount=function(){

  };
  review.prototype.setOneDataInReviewPlane=function(){

  };
  review.prototype.setDataInRviewPlane=function(){

  };

  review.prototype.getReviewDataByPage=function(dataObj){
    //this.data.getPicReviewByPage();
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
  var good=function(template){
    this.pageIndex=0;
    this.template=template;
    this.dom={
      dataPlane:""
    }
  };
  good.prototype.setCount=function(){

  };
  good.prototype.bindEvent=function(){

  };
  good.prototype.setOneDataInReviewPlane=function(){

  };

  good.prototype.setDataInRviewPlane=function(){

  };

  good.prototype.getPicGoodByPage=function(dataObj){
      //data.getPicReviewByPage();
  };

  good.prototype.display=function(){

  };

  good.prototype.empty=function(){

  };

  good.prototype.setViewStyle=function(){

  };

  review.prototype.postGood=function(){

  };

  /*模板渲染对象*/
  var template=function(){

  };

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
        templateHtml+=templateHtml+this._getTemplateStrByObj(temp,dataArray[index]);
      }
      return templateHtml;
  };
  template.prototype._getTemplateStrByObj=function(tempstr,obj){
    return tempstr.replace(/\$\w+\$/g, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
  }

  var templateObj=new template();
  var templateStr=templateObj.getDataTemplate("#template-review",
  [{
    userpic:"123",
    userName:"林先生",
    userText:"good"
  },
  {
    userpic:"266",
    userName:"林先生2",
    userText:"good3"
  }]
  );
  console.log("======template is ======");
  console.log(templateStr);


  /*【公共方法】设置指定节点进对象*/
  function _setDomInJQORZepto(initDomObj,initTarget){
    if(initDomObj==undefined||initDomObj==null){
      return ;
    }
    console.log("=====初始化Zepto或Jquery节点=====");
    for(var name in initDomObj){
      var domName=initDomObj[name];
      initTarget[name]=$(domName);
    }
    console.log(initTarget);
  }

  /*页面业务逻辑对象（入口函数）*/
  var albumDetail=function(){
    var slideObj=new slide();

    slideObj._init([
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/Demo4.jpg",id:1},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",id:2},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",id:3},
      {url:"http://localhost:5001/JsProject/Project/微信企业相册/Img/Demo4.jpg",id:4}
    ]);

    slideObj.setImgIndex(1);
    slideObj.nextBind(function(arg,Id){
        console.log("下一个的相册索引是："+Id);
    });
    slideObj.prevBind(function(arg,Id){
        console.log("上一个的相册索引是："+Id);
    });

      var httpObj=new http();

      var dataObj=new data(httpObj);
      dataObj.getPicInitData(null,
        function(data){

        },
        function(){

        }
      );

      var reviewObj=new review();
      var goodObj=new good();
  }

  /*调用入口函数*/
  $(function(){
    window.albumDetail=new albumDetail();
  });


})(window,document,Zepto);
