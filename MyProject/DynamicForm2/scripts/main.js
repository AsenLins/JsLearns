/*入口函数*/
require.config({
  baseUrl:"scripts/",
  paths:{
    /*vue脚手架*/
    "vue":"base/vue/vue",
    "vuex":"base/vue/vuex",
    /*require插件*/
    "text":"base/requirejs/plugs/text",
    /*数据*/
    "formDragMap":"dataMap/formDragMap",
    /*公用类*/
    "toolsTemplate":"code/tools/template",
    /*插件*/
    "nanobar":"base/nanobar/nanobar",
    "notie":"base/notie/notie.min",
    "sweetalert2":"base/sweetalert2/sweetalert2.min",
    /*数据模板*/
    "formMenuTemplate":"template/formMenuTemplate.html",
    "formStoreData":"template/formStoreData.html"
  },
  map: {
    '*': {
      'css': 'base/requirejs/plugs/css.min',
    }
  },
  shim:{
    //"notie":{deps:['css!base/notie/notie.min.css']},
    "sweetalert2":{deps:['css!base/sweetalert2/sweetalert2.min.css']}
  }

});

define(function(require,css){
  var Vue=require("vue");
  var Vuex=require("vuex");
  var formDragMap=require("formDragMap");
  var toolsTemplate= require("toolsTemplate");
  var sweetalert2=require("sweetalert2");

  /*加载css*/
  var dc=require("css!base/sweetalert2/sweetalert2.min.css");
  var d2=require("css!base/notie/notie.min.css");
  var d3=require("css!base/perfect-scrollbar/perfect-scrollbar.css");

  var menuTemplate=toolsTemplate.getHtmlById({
      html:require("text!formMenuTemplate"),
      query:"#auto-menu"
  });


  //var d3=require("css!base/notie/notie.min.css");

  Vue.component('custom-dragmenu', {
    template:menuTemplate,
    data:function(){
      return {
        "formDragMap":formDragMap
      }
    },
    methods:{

    }
    // 选项
  })

  var myVues=new Vue({
    el:"#myVue",
    data:{
      "menuData":formDragMap,
      "mes":"123"
    }

  });



  console.log(myVues);







console.log(toolsTemplate);
console.log(Vue,Vuex,formDragMap);
console.log(menuTemplate);
//console.log(formMenuTemplate);


});
