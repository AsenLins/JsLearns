/**
 * 用于对html模板进行操作
 * @return {[Object]} [template对象]
 */

define(function(){

  var template={
      getHtmlById:function(option){

      if(option==null||option.html==undefined){
        return;
      }

      var wrap=document.createElement("div"),
          queryResult;

      wrap.innerHTML=option.html;
      queryResult=wrap.querySelector(option.query);
      return queryResult.innerHTML;
    }
 }

  return template;
});
