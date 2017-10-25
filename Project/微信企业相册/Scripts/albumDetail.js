







(function(window,document,$){
  "use strict"
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
    this.moveEffect=null,
    this.maxMoveLefts=0,
    this.maxMoveRight=0,
    this.maxMoveSlideRight=0,
    this.needChangeImgX=0,
    this.screenWidth=document.body.clientWidth;
    this.slideOption={
        dom:{
          slidePlane:".album-slide-plane",
          albumNum:"#album-num-index"
        },
        data:null
    };
    this.slideDom={};
  };

  slide.prototype._setNeedChangeX=function(){
      this.needChangeImgX=slide.screenWidth/4;
  }
  slide.prototype._setEffect=function(){
    if(window.move!=undefined){
      this.moveEffect=window.move;
    }
  };

  slide.prototype._getPlaneLeft=function(){
    var transformArray=this.slideDom.slidePlane.css('transform').replace(/[^0-9\-,]/g,'').split(',');
    return parseInt(transformArray[0]==""?0:transformArray[0]);
  };

  slide.prototype._setMaxMove=function(){
    var imgCount=this.img.list.length;
    this.maxMoveLeft=this.screenWidth/2;
    this.maxMoveRight=((imgCount*this.screenWidth))-(this.screenWidth);
    this.maxMoveSlideRight=((imgCount*this.screenWidth))+((imgCount*this.screenWidth)/imgCount)/2;
  };

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

  };

  slide.prototype._slidePlaneInit=function(){
      var planeWidth=this.img.list.length*this.screenWidth;
      this.slideDom.slidePlane.width(planeWidth);
  };

  slide.prototype._loadImg=function(src,isAfter){
    var loadImg=new Image();
    loadImg.src=src;
    loadImg.onload=function(){
      if(isAfter){
        slide.slideDom.slidePlane.append("<img width='"+slide.screenWidth+"' src='"+this.src+"'"+" />");
      }
      else{
        console.log("loading");
        console.log(slide.slideDom.slidePlane.first());
        slide.slideDom.slidePlane.prepend("<img width='"+slide.screenWidth+"' src='"+this.src+"'"+" />");
      }

    }
  };

  slide.prototype.next=function(){
    slide.img.index=slide.img.index+1;
    var planeleft= slide.img.index*slide.screenWidth;
    slide.moveEffect(slide.slideDom.slidePlane.selector).x(-planeleft).end();
  };

  slide.prototype.prev=function(e){
    slide.img.index=slide.img.index-1;
    var planeleft= slide.img.index*slide.screenWidth;
    slide.moveEffect(slide.slideDom.slidePlane.selector).x(-planeleft).end();
  };

  slide.prototype.reset=function(){
    slide.img.index=slide.img.index;
    var planeleft= slide.img.index*slide.screenWidth;
    slide.moveEffect(slide.slideDom.slidePlane.selector).x(-planeleft).end();
  };

  slide.prototype.move=function(moveX){
      slide.moveEffect(slide.slideDom.slidePlane.selector).x(-moveX).end();
  }


  slide.prototype.count=function(){

  };

  var slide=new slide();
  //alert(slide.screenWidth);
  slide._init([
    "http://localhost:5001/JsProject/Project/微信企业相册/Img/Demo4.jpg",
    "http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",
    "http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg",
    "http://localhost:5001/JsProject/Project/微信企业相册/Img/demopic.jpg"
  ]);
  slide._loadImg(slide.img.list[0],true);
  slide._loadImg(slide.img.list[1],true);
  slide._loadImg(slide.img.list[2],true);
  slide._loadImg(slide.img.list[3],true);

  //console.log(slide);
  //slide._loadImg(slide.img.list[0]);
  //slide._loadImg(slide.img.list[1]);
  //slide._loadImg(slide.img.list[2]);
  //slide._loadImg(slide.img.list[0]);


  slide.slideDom.slidePlane.on("touchstart",function(e){
      slide.beforeX=e.targetTouches[0].clientX;
      slide.startX=e.targetTouches[0].clientX;
      //console.log("=====StartX=====");
      //console.log(slide.startX);
  });

  slide.slideDom.slidePlane.on("touchmove",function(e){
      //console.log(e);
      var planeleft=slide._getPlaneLeft();
      var needMoveLeft=slide.screenWidth-planeleft;

      /*右滑*/
      if(slide.startX<=e.targetTouches[0].clientX){
        planeleft=planeleft+3;
      }
      /*左滑*/
      else{
        planeleft=planeleft-3;
      }
      /*超出最大滑动范围*/
      if(planeleft>slide.maxMoveLeft||planeleft<=-slide.maxMoveSlideRight){
        return;
      }

      slide.startX=e.targetTouches[0].clientX;
      slide.afterX=e.targetTouches[0].clientX;
      slide.slideDom.slidePlane.css("transform","translate("+planeleft+"px,0px)");

  });

  slide.slideDom.slidePlane.on("touchend",function(e){

    var planeleft=slide._getPlaneLeft();

    if(planeleft>=0){
      slide.reset();
      return;
    }

    if(planeleft<=-slide.maxMoveRight||slide.slideDom.slidePlane.find("img").size()==1){
      slide.reset();
      return;
    }


    if(Math.abs(slide.beforeX-slide.afterX)>slide.needChangeImgX){
      if(slide.beforeX>slide.afterX){
          slide.next();
      }
      else{
          slide.prev();
      }
    }
    /*回到原位置*/
    else{
      slide.reset();
    }

  });


  /*设置指定节点进对象*/
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





})(window,document,Zepto);
