/*
Create By Asen
2017-11-8
toast提示
*/
(function(){
  var createToast=function(){
    var toast=null;
    //if(toast==null){
      var toastPlane=document.createElement("div");
      toastPlane.setAttribute("id", "test");
      toastPlane.style="font-family:SimHei; padding:0px 30px 0px 30px;"
      +"display:none;"
      +"opacity:0;"
      +"position:fixed;"
      +"bottom:64px;"
      +"width:auto;"
      +"height:40px;"
      +"text-align:center;"
      +"color:white;"
      +"line-height:40px;"
      +"border-radius:50px;"
      +"font-size:12px;"
      +"z-index:999;"
      +"background: rgba(52, 52, 52, 0.8);";
      document.body.appendChild(toastPlane);
      toast=toastPlane;
    //}
    return toast;
  }

  var toast=function(){

    return{
      show:function(option){
        var toastObj=createToast.call(this,arguments);
        toastObj.style.display="inline-block";
        toastObj.innerText=option.text;
        var windowWidth= window.screen.width;
        var windowHeight=window.screen.height;
        var positionX=(windowWidth-toastObj.offsetWidth)/2;
        var positionY=(windowHeight-toastObj.offsetHeight)/2;

        switch(option.position){

          case "center":
            toastObj.style.top=positionY+"px";
            toastObj.style.bottom="0px";
            break;
          default:
            toastObj.style.bottom="64px";
            break;
        }
        toastObj.style.left=positionX+"px";

        opacityEffect(toastObj,1);
        setTimeout(function(){
          opacityEffect(toastObj,0,function(){
            document.body.removeChild(toastObj);
          });

        },2500);

      }

    }
  }

  var opacityEffect=function(object,opacityNum,fn){
    var currentOpacity=parseInt(object.style.opacity);
    var addOpacity=0;
    if(currentOpacity>=opacityNum){
      addOpacity=-0.1;
    }
    else{
      addOpacity=+0.1;
    }

    var opacityStart=setInterval(function(){
        currentOpacity=currentOpacity+addOpacity;
        object.style.opacity=currentOpacity;
        if(currentOpacity>=1||currentOpacity<=0){
          //console.log("清除");
          clearInterval(opacityStart);
          if(fn!==undefined){
            fn();
          }
        }
    },25);
  }

  window.toast={
    show:toast().show
  };

})(window);
