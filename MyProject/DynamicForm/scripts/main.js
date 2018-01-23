/*入口函数*/
require.config({
  baseUrl:"scripts/module",
  paths:{
    "formMap":"formMap",
    "tools":"tools",
    "formCreatorFactory":"formFactory",
    "dragEventBus":"dragEventBus",
    "formUI":"formUI",
    "formOption":"formOption",
    "dragula":"../dragula/dragula.min"
  }
});


/*初始化页面基础数据，以及事件*/

//dragula([$('left-copy'), $('right-copy')], { copy: true });


require(["formMap","dragEventBus","tools","dragula"],function(formMap,dragEventBus,tools,dragula){

  /*VUE实例化*/
  var vBaseForm=new Vue({
        el:"#autoForm",
        data:{
          formMap:formMap.vueFormMap,
          layout:formMap.layout,
          layoutStyle:{}
        },
        methods:{
          layoutChange:function(event){
            var layoutVal=event.target.value;
            var layoutObj=this.layout.layoutItems[layoutVal];

            this.layoutStyle={
              width:layoutObj.width+"px",
              height:layoutObj.height+"px"
            };

           tools.objMapTo(this.layout.currentSize,layoutObj);

          }
        }
  });


  //dragula([left,right],{ copy: true });


  /*绑定事件*/
  window.dragEventBus=dragEventBus;

});

/*控件拖拽逻辑*/
/*
存在的问题
select无法被拖动
排序拖动有误
板块拖动未实现
删除功能未实现
*/

require(["formMap","tools","formCreatorFactory","dragEventBus","formOption"],
function(formMap,tools,formCreatorFactory,dragEventBus,formOption){
  /*获取拖拽对象*/
  function _getDragObj(dragEvent){
    var obj={};
    /*获取被目标对象*/
    obj["currentDragDom"]=dragEvent.srcElement;
    obj["currentControlType"]=dragEvent.srcElement.dataset.type;
    /*获取辅助基线*/
    obj["helpLine"]={
      x:document.getElementById("js-helpLine-x"),
      y:document.getElementById("js-helpLine-y")
    }

    if(dragEvent.type==="dragstart"){

    }else if(dragEvent.type==="dragover"||dragEvent.type==="drop"){
      /*获取被拖拽对象*/
      obj["dragPlane"]=dragEvent.toElement;

      obj["dragPlaneLevel"]=parseInt(dragEvent.toElement.dataset.level);
      obj["dragPlaneWidth"]=dragEvent.toElement.clientWidth;
      obj["dragDomType"]=dragEventBus.getDragKey("controlType");
      obj["dragPosition"]={
        x:dragEvent.offsetX,
        y:dragEvent.offsetY
      };

      /*获取控件类型以及生成对应的dom,以及对应的控件深度。*/
      if(dragEventBus.getDragKey("controlId")==undefined){
        obj["formMapObj"]=tools.findObjVal(formMap,obj["dragDomType"]);
        obj["formControlObj"]=formCreatorFactory.create(obj["formMapObj"],obj["dragDomType"]);
        obj["formlevel"]=parseInt(obj["formControlObj"].formDom.dataset.level);
        obj["formControlId"]=dragEvent.toElement.dataset.controlid;
      }
      else{
        var formObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");

        obj["formControlObj"]={
          formDom:formObj
        };
        obj["formlevel"]=parseInt(formObj.dataset.level);
        obj["formControlId"]=dragEventBus.getDragKey("controlId");
      }
    }

    return obj;
  };


  dragEventBus.regStartEvent("contextDropStart",function(e){
    var dragObj=_getDragObj(e);

    e.dataTransfer.setData("text",dragObj.currentControlType);
    dragEventBus.setDragKey("controlType",dragObj.currentControlType);
    dragEventBus.setDragKey("controlId",e.srcElement.dataset.controlid);

  });

  dragEventBus.regOverEvent("contextDropOver",function(e){


    if(dragEventBus.getDragKey("controlId")!==undefined){
      return;
    }
    else{

      var dragObj=_getDragObj(e);
      if(dragObj.helpLine.x.style.opacity!="1"){
         dragObj.helpLine.x.style.opacity="1";
      }

      /*添加表单元素操作*/
      if(dragObj.dragPlaneLevel-dragObj.formlevel===-1||dragObj.dragPlaneLevel-dragObj.formlevel===1){

      }/*添加表单元素前或后操作*/
      else if(dragObj.dragPlaneLevel-dragObj.formlevel===0){
          /*元素后方插入*/
        if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)>=0){

            dragObj.helpLine.x.style.left=dragObj.dragPlane.clientWidth+18+dragObj.dragPlane.offsetLeft+"px";
          /*元素前方插入*/
        }else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)<0){

            dragObj.helpLine.x.style.left=dragObj.dragPlane.offsetLeft+16+"px";

        }
      }

    }


  });

  dragEventBus.regEndEvent("contextDropEnd",function(e){

    var dragObj=_getDragObj(e);

        /*生成表单对象*/

        /*获取拖拽对象*/

        /*绑定事件*/

        /*添加表单元素操作*/
        if(dragObj.dragPlaneLevel-dragObj.formlevel===-1){

            dragObj.dragPlane.appendChild(dragObj.formControlObj.formDom);

        }/*添加表单元素前或后操作*/
        else if(dragObj.dragPlaneLevel-dragObj.formlevel===0){
            var insertObj={
              newDom:dragObj.formMapObj,
              controlId:dragObj.formControlId
            }
            //dragEventBus.setDragKey("controlId",e.srcElement.dataset.controlid);


            /*替换元素操作*/
            if(dragEventBus.getDragKey("controlId")!=undefined){

              //var replaceHtml=tools.getHtml(document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']"));
              //var replaceObj=tools.parseDom(replaceHtml);

              var removeObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceOffsetLeft=replaceObj.offsetLeft;

              var targetObj=e.toElement;
              for(var i in targetObj){
                console.log(i,targetObj[i]);
              }
              console.log("offsetParent.Left",targetObj.offsetParent.offsetLeft);
              console.log("replaceObj.Left",replaceObj.offsetParent.offsetLeft);
              console.log(targetObj.x);
              //tools.insertBefore();
              console.log("replaceObj",replaceObj);


              if(replaceObj.dataset.controlid===targetObj.dataset.controlid){
                console.log("控件自身不能为拖拽对象");
                return;
              }

              if(replaceObj.parentNode==null){
                console.log("父对象为空");
                return;
              }
              else{
                removeObj.parentNode.removeChild(removeObj);
              }

              if(replaceOffsetLeft<=targetObj.offsetLeft){
                console.log("小于");
                tools.insertAfter(replaceObj,targetObj);
                //targetObj.parentNode.appendChild(replaceObj);
              }
              else{
                console.log("大于");
                console.log("当前拖动的对象",replaceObj,"目标对象:",targetObj);
                targetObj.parentNode.insertBefore(replaceObj,targetObj);

              }

              //changeDom.targetDom.parentNode.insertBefore(changeDom.formDom,changeDom.targetDom);
              //targetObj.parentNode.appendChild(replaceObj);


            }else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)>=0){
              /*元素后方插入*/
              console.log("后方插入");
              formCreatorFactory.append(insertObj,dragObj.dragDomType);

          }else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)<0){
              /*元素前方插入*/
              console.log("前方插入");
              formCreatorFactory.before(insertObj,dragObj.dragDomType);
          }
        }
        dragObj.helpLine.x.style.opacity="0";
        dragObj.helpLine.y.style.opacity="0";


  });

});
