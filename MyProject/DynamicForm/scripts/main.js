/*入口函数*/
require.config({
  baseUrl:"scripts/module",
  paths:{
    "formMap":"formMap",
    "tools":"tools",
    "formCreatorFactory":"formFactory",
    "dragEventBus":"dragEventBus",
    "formUI":"formUI",
    "formOption":"formOption"
  }
});


/*初始化页面基础数据，以及事件*/
require(["formMap","dragEventBus","tools"],function(formMap,dragEventBus,tools){

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

  /*绑定事件*/
  window.dragEventBus=dragEventBus;

});

/*控件拖拽逻辑*/
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
        console.log(formObj);
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

    console.log("这是注册的contextDropOver");

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
            console.log(dragObj.dragPlane);
            console.log("dragObj.dragPlaneLevel:",dragObj.dragPlaneLevel,"dragObj.formlevel:",dragObj.formlevel);
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
              console.log("元素替换的ID:",dragEventBus.getDragKey("controlId"));

              var removeObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceOffsetLeft=replaceObj.offsetLeft;
              removeObj.parentNode.removeChild(removeObj);
              console.log("parsent left",replaceObj.offsetParent);
              console.log("new left:",replaceObj.getBoundingClientRect().left);
              var targetObj=e.toElement;
              //tools.insertBefore();
              console.log("replaceObj.offsetLeft:",replaceOffsetLeft,"targetObj.offsetLeft:",targetObj.offsetLeft);
              console.log(replaceObj.offsetLeft);
              if(replaceOffsetLeft<=targetObj.offsetLeft){
                console.log("小于");
                tools.insertAfter(replaceObj,targetObj);
                //targetObj.parentNode.appendChild(replaceObj);
              }
              else{
                console.log("大于");
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
