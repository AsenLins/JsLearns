









var touchData={

}
var img=$("#test-img");

window.onload=function(){

    var imgPlane=document.getElementById("imgPlane");
    imgPlane.addEventListener("touchstart",function(e){
      console.log("start");

      var touchList=e.targetTouches[0];
      touchData.startX=touchList.clientX;
      console.log(touchList);
    });





    document.getElementById("imgPlane")
    .addEventListener("touchmove", function(e){
      //console.log(e);
      var startX=touchData.startX;
      var touchList=e.targetTouches[0];
      var moveX=startX-touchList.clientX;
      img.css("left",-moveX+"px");
      console.log("得出的结果是："+moveX);
      //console.log(touchList);
      //console.log("touch");

    });
    var testObj={
      title:"Asen",
      age:3
    }
    var dc="这是内容$title$$age$";
    var result=dc.tmp(testObj);
    console.log(result);
}
/*
多数据渲染方法
json_data.data.forEach(function(object) {
       htmlList += htmlTemp.tmp(object);
   });
*/

String.prototype.tmp = function(obj) {
    return this.replace(/\$\w+\$/g, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
};
