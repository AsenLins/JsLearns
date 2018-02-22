/*require模块配置*/
require.config({
  /*根目录*/
  baseUrl:"scripts/",

  paths:{
    /*
    base:存放基础脚手架和插件。
    dataMap:存放对象数据。
    template:存放html模板。
    formPlugs:存放动态表单控件所依赖的插件。
    code:存放主体代码。
    */
    "base":"base/",
    "dataMap":"dataMap/",
    "template":"template/",
    "formPlugs":"plugs/form/"
  },
  map: {
    /*
    css:加载requirejs的css插件，该插件可以使requirejs加载css。
    */
    '*': {
      'css': 'base/requirejs/plugs/css.min',
    }

  },
  shim:{

    /*
    sweetalert2:加载依赖的css.
    nprogress:加载依赖的css.
    */
    "base/sweetalert2/sweetalert2":{deps:['css!base/sweetalert2/sweetalert2.min.css']},
    "base/nprogress/nprogress":{deps:['css!base/nprogress/nprogress.css']}

  }
});

/**
 * 入口函数
 * @param  {object} require requirejs对象
 * @return {null}
 */
define(function(require){
  var Vue=require("base/vue/vue");
  var formDragMap=require("dataMap/formDragMap");
  var formLayoutMap=require("dataMap/formLayoutMap");

  var sweetalert2=require("base/sweetalert2/sweetalert2");
  var nprogress=require("base/nprogress/nprogress");


  /*加载css*/
  //var dc=require("css!base/sweetalert2/sweetalert2.min.css");
  //var d2=require("css!base/notie/notie.min.css");
  //var d3=require("css!base/perfect-scrollbar/perfect-scrollbar.css");


  /*
  Vue.component('custom-dragmenu',{
    template:"#js-am-list",
    data:function(){
      console.log("good");
      return {
        "formDragMap":formDragMap
      }
    }
  });
  */


  //var d3=require("css!base/notie/notie.min.css");

  /*组件input*/
  var input={
    template:"<input :class='className' :style='styleText':data-level='level' :type='type' :placeholder='placeholder'/>",
    data:function(){
      return {
        id:"443",
        placeholder:"",
        type:"text",
        level:2,
        className:"",
        styleText:"",
        verify:{
          isEmpty:false,
          reg:""
        }
      }
    },
    created:function(){
      this["placeholder"]="445";
    },
    methods:{
      change:function(){
        
      }
    }
  }

  /*组件radio*/


  Vue.component('auto-plane',{
    template:"<div :data-level='level' :class='className' :style='styleText' ><component :is='formControl'></component></div>",
    data:function(){
      return{
        id:"1",
        className:"",
        styleText:"",
        level:0,
        formControl:null
      }
    },
    methods:{

    },
    created:function(){
      console.log("开始创建组件");
      this.formControl=input;
    }
  });



  Vue.component('auto-input',input);



  var vueForm=new Vue({
    el:"#js-vue-form",
    data:{
      "formDragMap":formDragMap,
      "formLayoutMap":formLayoutMap,
      "menuTipData":{
        title:"使用方法",
        tipItem:[
          "1.请先添加面板控件",
          "2.再拖动表单控件。"
        ],
      }
    },
    created:function(){
      console.log("create");
    },
    methods:{


    }

  });


});
