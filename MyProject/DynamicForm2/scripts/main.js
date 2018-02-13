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
    /*模板*/
    "formMenuTemplate":"template/formMenuTemplate.html",
    "formStoreData":"template/formStoreData.html"
  }

});

define(function(require){
  var Vue=require("vue");
  var Vuex=require("vuex");
  var formDragMap=require("formDragMap");
  var formMenuTemplate=require("text!formMenuTemplate");

  var vDragMenu=Vue.component('auto-dragMenu',{
    template:"",

    props:[""]
  });

console.log(Vue,Vuex,formDragMap);
console.log(formMenuTemplate);


});
