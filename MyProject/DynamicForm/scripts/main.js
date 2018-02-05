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
    "formOptionFactory":"formOptionFactory",
    "nprogress":"../../plugs/nprogress/nprogress",
    "notie":"../../plugs/notie/notie.min",
    "sweetalert2":"../../plugs/sweetalert2/sweetalert2.min",
    "domReady":"../../plugs/requirePlus/domReady",
    "text":"../../Plugs/requirePlus/text",
    "ht_optionSelect":"../template/option_select.html",
    "jquery":"../../Plugs/jquery/jquery-1.9.1.min"
  }
});


/*初始化页面基础数据，以及事件*/

//dragula([$('left-copy'), $('right-copy')], { copy: true });




require(["formMap","dragEventBus","tools","nprogress","notie","sweetalert2","domReady"],
function(formMap,dragEventBus,tools,nprogress,notie,swal,domReady){

  /*按钮颜色 #4d82d6*/

  /*
  swal({
    title: '表单生成中!',
    text: '表单正在生成中,请等待...',
    onOpen: () => {
      console.log("生成中...");
      swal.showLoading()
    }
  }).then((result) => {

    swal({
      type: 'success',
      title: '生成成功,表单ID为DFWOWEQRW4K21',
      html: '可点击地址预览: '
      + "<a href='http://formParam/form?id=4232133'>http://formParam/form?id=4232133</a>"
      + "<div>表单地址为:<a href='http://baidu.com/form?id=DFWOWEQRW4K21'></a></div>"
    });
    if (result.dismiss === 'timer') {


    }
  });
  */



  /*初始化*/
  domReady(function(){
    console.log("ready");

    nprogress.start();
    nprogress.inc();
    var baseDom={
      formPlane:document.getElementById("js-formDragPlane"),
      form:document.getElementById("js-form"),
      btn_Clear:document.getElementById("js-control-clear"),
      btn_Form:document.getElementById("js-control-attr")
    }

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


    window.dragEventBus=dragEventBus;
    document.getElementById("js-control-clear").addEventListener("click",function(){
      swal({
      title: '是否清空当前面板?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if(result.value){
        var jsForm=document.getElementById("js-form");
        jsForm.innerHTML="";
      }
    })
    });

    nprogress.done();
  });


  //baseDom btn_Clear btn_Form
  //nprogress.done();


});



/*控件选项逻辑*/

require(["formOption","tools","formOptionFactory","domReady"],
function(formOptionMap,tools,formOptionFactory,domReady){
  var formOptionMap=formOptionMap;
  var tools=tools;
  var formOptionFactory=formOptionFactory;
  var optionOperate=formOptionFactory.optionOperate;
  var optionCreate=formOptionFactory.optionCreate;
  console.log("formOptionFactory",formOptionFactory);

  window.formOptionClick=function(e){

    var controlid=e.srcElement.dataset.targetid;
    var planeid=e.srcElement.dataset.controlid;
    var currentid=optionOperate.getCurrentId();
    if(controlid===currentid){
      optionOperate.show();
      return;
    }


    optionOperate.setCurrentId(controlid);
    optionOperate.clear();
    optionOperate.show();
    optionOperate.setSelectBorder(controlid);
    optionCreate({
      optionMap:formOptionMap[e.srcElement.dataset.type],
      currentType:e.srcElement.dataset.type,
      targetPlane:document.getElementById("js-option-content")
    });

    document.getElementById("btn-formEdit-save").setAttribute("data-targetid",controlid);
    document.getElementById("btn-formEdit-save").setAttribute("data-planeid",planeid);
    //optionOperate.hide();
    console.log(optionOperate);

  }

  window.formEditClick=function(e){
    console.log("提交的e",e);
    console.log("提交的e的id",e.currentTarget.dataset.targetid);
    var planeid=e.currentTarget.dataset.planeid;
    var contorlid=e.currentTarget.dataset.targetid;
    var result=formOptionFactory.saveOption("js-option-content",contorlid,planeid);
    if(result){
      console.log("是否成功",result);
      optionOperate.clear();
      optionOperate.hide();
      optionOperate.setSelectSuccess(contorlid);
    }
  }

  $("#js-control-create").on("click",function(){

    var failSize=$(".custom-form-editMask").size();
    var successSize=$(".custom-form-editMask[success]").size();
    if(failSize===0){
      return;
    }




    if(failSize-successSize===0){
      console.log("success");
      var useDoms="";
      var myarray=[];

      var List=document.querySelectorAll(".custom-form-editMask[success]");
      var ListPlane=document.querySelectorAll("#js-form .form-item");
        console.log("ListPlane Size:",ListPlane.length);
      for(var index=0;index<ListPlane.length;index++){
        console.log("ListPlane",ListPlane[index]);
        var currentPlane=ListPlane[index];
        var planeChild=ListPlane[index].childNodes;
        var html="";
        for(var cindex=0;cindex<planeChild.length;cindex++){
          var current=planeChild[cindex];
          var replaceDom=current.childNodes[1];

          //var replaceDom=List[index].parentNode.childNodes[1];
          var parentNode=replaceDom.parentNode;
          parentNode.removeChild(parentNode.childNodes[1]);

          html=html+parentNode.innerHTML;
          parentNode.appendChild(replaceDom);
        }


        var inputWrap=document.createElement("div");
        inputWrap.setAttribute("class","create-"+currentPlane.className);

        inputWrap.innerHTML=html;

        useDoms=useDoms+tools.getHtml(inputWrap);
      }

      var postBtn=document.createElement("button");
      postBtn.setAttribute("class","am-btn am-btn-success am-btn-block btn-bottom");
      postBtn.innerHTML="提交";
      useDoms=useDoms+tools.getHtml(postBtn);

      /*
      for(var index=0;index<List.length;index++){
        var doms=document.createElement("div");
        var replaceDom=List[index].parentNode.childNodes[1];
        var parentNode=List[index].parentNode;
        var wrap=List[index].parentNode.parentNode;
        List[index].parentNode.removeChild(List[index].parentNode.childNodes[1]);

        var inputWrap=document.createElement("div");
        inputWrap.setAttribute("class","create-"+wrap.className);
        var html=parentNode.innerHTML;
        inputWrap.innerHTML=html;

        parentNode.appendChild(replaceDom);
        useDoms=useDoms+tools.getHtml(inputWrap);

      }
      */
      console.log(useDoms);


      var id=Date.parse(new Date());
      var createObj={
        id:id,
        createForm:$("#js-form").html(),
        useForm:useDoms
      }
      $("#js-formprevPlane").empty();
      $("#js-formprevPlane").append(useDoms);
      console.log("useDom33333",useDoms);
    }
    else{
      console.log("fail");
    }

    console.log($(".custom-form-editMask[success]").size());

  });



});



/*控件拖拽逻辑*/
/*
存在的问题
select无法被拖动
排序拖动有误（fixed）
板块拖动未实现(finish)
删除功能未实现
表单基础属性，
控件属性
*/

require(["formMap","tools","formCreatorFactory","dragEventBus","formOption","notie"],
function(formMap,tools,formCreatorFactory,dragEventBus,formOption,notie){
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
    obj["path"]=dragEvent.path;

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
      var parentNode;
      if(dragObj.dragPlane.getAttribute("data-level")!==undefined){
        parentNode=dragObj.dragPlane;
      }
      else{
        parentNode=tools.parentUntil(dragObj.dragPlane,"data-level",1);
      }



      if(dragObj.dragPlaneLevel-dragObj.formlevel===-1||dragObj.dragPlaneLevel-dragObj.formlevel===1){
        dragObj.helpLine.x.style.opacity="0";
        dragObj.helpLine.y.style.opacity="0";
      }/*添加表单元素前或后操作*/
      else if(dragObj.dragPlaneLevel-dragObj.formlevel===0){
        //if()
        //console.log("className",parentNode.className);
        if(parentNode.className=="item-row"){
          if(dragObj.helpLine.x.style.opacity!="1"){
             dragObj.helpLine.x.style.opacity="1";
          }

            /*元素后方插入*/
          if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)>=0){

              dragObj.helpLine.x.style.left=dragObj.dragPlane.clientWidth+18+dragObj.dragPlane.offsetLeft+"px";
            /*元素前方插入*/
          }else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)<0){

              dragObj.helpLine.x.style.left=dragObj.dragPlane.offsetLeft+16+"px";
          }
        }

        else if(parentNode.className=="item-colum"){

          if(dragObj.helpLine.y.style.opacity!="1"){
             dragObj.helpLine.y.style.opacity="1";
          }

          /*元素前方插入*/
          if(dragObj.dragPosition.y-(dragObj.dragPlane.clientHeight/2)>=0){

            console.log("后方",tools.getPosition(dragObj.dragPlane));
            //dragObj.helpLine.y.style.top=dragObj.dragPosition.y-(dragObj.dragPlane.clientHeight/2)+ dragObj.dragPlane.offseTop+"px";
            dragObj.helpLine.y.style.top=tools.getPosition(dragObj.dragPlane).Y-126+dragObj.dragPlane.clientHeight+"px";

            /*元素后方插入*/
          }else if(dragObj.dragPosition.y-(dragObj.dragPlane.clientHeight/2)<0){
              console.log("前方",tools.getPosition(dragObj.dragPlane));
              dragObj.helpLine.y.style.top=tools.getPosition(dragObj.dragPlane).Y-126+"px";
              //dragObj.helpLine.y.style.top=dragObj.dragPlane.offsetTop+16+"px";
          }
        }

      }
      else{

      }
    }


  });

  dragEventBus.regEndEvent("contextDropEnd",function(e){


    var dragObj=_getDragObj(e);
    dragObj.helpLine.x.style.opacity="0";
    dragObj.helpLine.y.style.opacity="0";

        /*添加表单元素操作*/
        if(dragObj.dragPlaneLevel-dragObj.formlevel===-1){
            console.log("插入面板");
            dragObj.dragPlane.appendChild(dragObj.formControlObj.formDom);

        }/*添加表单元素前或后操作*/
        else if(dragObj.dragPlaneLevel-dragObj.formlevel===0){
            var insertObj={
              newDom:dragObj.formMapObj,
              controlId:dragObj.formControlId,
              path:dragObj.path
            }

            /*替换元素操作*/
            if(dragEventBus.getDragKey("controlId")!=undefined){

              var removeObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
              var replaceOffsetLeft=replaceObj.offsetLeft;

              var targetObj=e.toElement;

              var targetPosition=tools.getPosition(targetObj);
              var replacePosition=tools.getPosition(replaceObj);
              console.log("替换的对象是：",replaceObj);
              console.log("目标对象是：",targetObj);

              if(targetObj.dataset.level!="1"&&targetObj.getAttribute("data-isControlPlane")==undefined){
                console.log(e.path);
                for(var index=0;index<e.path.length;index++){

                  if(e.path[index].getAttribute("data-isControlPlane")!=undefined){
                    targetObj=e.path[index];
                    break;
                  }
                }
                console.log("修改的对象是：",targetObj);
                console.log("没发目标");
              }

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

              /*横向替换到节点后*/
              if(replacePosition.X<=targetPosition.X&&replacePosition.Y==targetPosition.Y){
                console.log("[横向]替换到节点后");
                tools.insertAfter(replaceObj,targetObj);
                //targetObj.parentNode.appendChild(replaceObj);
              }else if(replacePosition.X>targetPosition.X&&replacePosition.Y==targetPosition.Y){
                /*横向替换到节点前*/
                console.log("[横向]替换到节点前");
                targetObj.parentNode.insertBefore(replaceObj,targetObj);
              }else if(replacePosition.Y<=targetPosition.Y){
                /*纵向替换到节点后*/
                console.log("[纵向]替换到节点后");
                tools.insertAfter(replaceObj,targetObj);
              }else if(replacePosition.Y>targetPosition.Y){
                /*纵向替换到节点前*/
                console.log("[纵向]纵向替换到节点前");
                targetObj.parentNode.insertBefore(replaceObj,targetObj);
              }

              //changeDom.targetDom.parentNode.insertBefore(changeDom.formDom,changeDom.targetDom);
              //targetObj.parentNode.appendChild(replaceObj);


            }
            /*插入新元素的操作*/
            else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)>=0){
              /*元素后方插入*/
              console.log("元素后方插入新节点");
              formCreatorFactory.append(insertObj,dragObj.dragDomType);

            }else if(dragObj.dragPosition.x-(dragObj.dragPlane.clientWidth/2)<0){
              /*元素前方插入*/
              console.log("元素前方插入新节点");
              formCreatorFactory.before(insertObj,dragObj.dragDomType);
            }

        }
        //console.log(document.getElementById("js-form").height);

        /*删除操作*/
        if(dragObj.dragPlane.className.indexOf("dragDelete")>-1){
          var deleteObj=document.querySelector("[data-controlid='"+dragEventBus.getDragKey("controlId")+"']");
          deleteObj.parentNode.removeChild(deleteObj);
        }

        if(dragObj.dragPlaneLevel-dragObj.formlevel<-1&&dragObj.dragPlane.className.indexOf("dragDelete")<0){
          notie.alert({ type: 4, text: '请先拖拽面板，再拖拽表单控件.', position: 'bottom',time: 4});
        }

        if(document.getElementById("js-formDragPlane").scrollTop>0){
          document.getElementById("js-form").style.height="auto";
        }

        else{
          document.getElementById("js-form").style.height="100%";
        }
        dragObj.helpLine.x.style.height=document.getElementById("js-form").offsetHeight+"px";
  });


});
