/*入口函数*/
require.config({
  baseUrl:"scripts/",
  paths:{
    /*vue脚手架*/
    "vue":"vue/vue",
    "vuex":"vue/vuex",
    /*require插件*/
    "text":"requirejs/plugs/text",
    /*数据*/
    "formDragMap":"map/formDragMap",

    /*公用类*/
    "toolsTemplate":"module/tools/template",

    /*模板*/
    "formMenuTemplate":"template/formMenuTemplate.html",
    "formStoreData":"template/formStoreData.html"
  }

});

define(function(require){
  var Vue=require("vue");
  var Vuex=require("vuex");
  var formDragMap=require("formDragMap");
  var toolsTemplate= require("toolsTemplate");


  var menuTemplate=toolsTemplate.getHtmlById({
      html:require("text!formMenuTemplate"),
      query:"#auto-menu"
  });

  Vue.component('auto-dragMenu',{
    template:menuTemplate,
    props:["data"]
  });





console.log(toolsTemplate);
console.log(Vue,Vuex,formDragMap);
console.log(menuTemplate);
//console.log(formMenuTemplate);


});
