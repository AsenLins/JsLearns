<<<<<<< HEAD
/*插件功能：
  1.可配置多个form
  2.可配置from提示容器，以及提示效果。
  3.可自定义配置每个验证元素的正则，以及提示内容，以及提示容器，提示效果
  默认提供的验证类型：
  -是否为空
  -长度是否是指定长度
  -两个元素之间的比较
  -是否为数字
  -是否为汉字
  -是否为英文
*/
(function(){


  function createVerify(option){
    var mustHaveKey=["formName","tiggerObj","verifyArray"];

    if(option==null){
      throw "need option"
    }

    for(var mhkIndex=0;mhkIndex<mustHaveKey.length-1;mhkIndex++){
        if(!(mustHaveKey[mhkIndex] in option)){
          throw "need option "+mustHaveKey[mhkIndex];
        }
    }

    var easyVerify={
      init:function(){
        this.formName=option.formName;
        this.container=option.container;
        this.tiggerObj=option.tiggerObj;
        this.verifyArray=option.verifyArray;
        this.onTigger=option.onTigger;
        this.onVerify=option.onVerify;
      },

      initVerifyArray:function(){

      },
      /*验证回调函数*/
      verify:function(fn,state){
        if(typeof fn=="function"){
          fn(state);
        }
      },
      /*显示效果函数*/
      tigger:function(type){
        if(this.onTigger!=null&&typeof this.onTigger=="function"){
          this.onTigger(type);
          return;
        }
        switch(type){
          case "show":

          break;
          case "hide":

          break;

          default:
          throw "unknow tigger type"
        }
      }

    }


    var easyVerifyObj=Object.create(easyVerify);
    easyVerifyObj.init();

    return easyVerifyObj;
  }

  window.easyVerify=createVerify;
=======
(function(){


  var easyVerify=function(option){
    if(option==undefined){
      throw "缺少必要参数对象option"
    }
    var froms=document.

    var defaultOption={
      formName:""
    }


  }

  window.easyVerify=easyVerify;

>>>>>>> 90c9ed71235b8bc7f71166048ed5cd69ed6db326
})(window)
