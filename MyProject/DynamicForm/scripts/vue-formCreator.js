/*功能点：
  1.拖拽工具菜单
  菜单生成，菜单可拖拽
  支持：面板，以及表单属性

  2.拖拽面板
  需要一个配置列表。

  根据拖拽工具菜单拖拽的内容生成对应的表单控件，表单控件可再次被拖拽

  3.拖拽属性面板
  每个面板的控件都可以再次编辑/生成属性

  4.生成表单

  5.解析对应的动态表单，可生成vue表单。


  生成完模板之后，再交给vue进行渲染。
  需要三个vue组件：

  1.form-createtor(表单生成)
  2.form-options(表单配置)
  3.form-reader（表单读取）


*/

var InputMap={
  "name":"myInput",
  "type":"text",
  "defaultVal":"cool",
  "desc":"个人管理",
  "placeholder":"",
  "verify":[],
  "events":[],
  "link":[],
  "wrap":""
}

var InputObj={
  dom:null,

}



(function(){

 /**
  Vue.component('autoform-input',{
    template:"<div>123</div>"
  });
 **/

 var formControlCreator={
   "input":function(option){
     var input=document.createElement("input");
     //for()
     input.setAttribute("","");


     //input.type=option.type;
     //input.clas
   },
   "select":function(option){

   },
   "textarea":function(option){

   }
 }

 var formWrapCreator={

 }




  var formCreator=function(){

  };

})
