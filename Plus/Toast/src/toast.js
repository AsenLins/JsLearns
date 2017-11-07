(function(){
  var createToast=function(){
    var toast=null;
    if(toast==null){
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
      +"background: rgba(52, 52, 52, 0.8);";
      var dc=document.body.appendChild(toastPlane);
      toast=toastPlane;
      toast.status=false;
    }
    return toast;
  }


  var toast=function(toast,window){
    var toastObj=toast;
    return{
      show:function(option){
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
         opacityEffect(toastObj);
         setTimeout(function(){
            toastObj.style.display="none";
         },2000);
      }

    }
  }

  var opacityEffect=function(object,opactiyNum){
    //console.log( object.style.opacity);
    var targetOpacity=parseInt(object.style.opacity);

    setInterval(function(){
       if(targetOpacity<1){
       targetOpacity=targetOpacity+0.1;
       console.log(targetOpacity);
       object.style.opacity=targetOpacity;
       }
    }, 25);

  }

  var t=toast(createToast(),window);
  t.show({text:"恭喜发财"});


})(window,window.animate);
