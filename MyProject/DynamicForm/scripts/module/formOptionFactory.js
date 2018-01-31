
define(["formOption","plugsAlert","tools","text!ht_optionSelect","jquery"],function(formOption,plugsAlert,tools,ht_optionHtml,$){

  /*显示或隐藏选项*/
  //console.log("text Is",html);
  var customAlter=plugsAlert;
  var formOptionMap=formOption;
  var tools=tools;
  var templateHtml=tools.parseDom(ht_optionHtml);
  var currentId;
  var nowEdit="";
  var editDom="";


  console.log(templateHtml);
  console.log(tools);
  var template={
    ht_optionHtml:tools.getVirtualDomById(templateHtml,"js-template-optionSelect"),
    ht_optionAddSelectHtml:tools.getVirtualDomById(templateHtml,"js-template-optionAddSelect")
  }

  console.log("ht_optionHtml",template.ht_optionHtml);
  console.log("ht_optionAddSelectHtml",template.ht_optionAddSelectHtml);

  //console.log("模板的html是",ht_optionHtml);
  var dom={
    appendPlane:document.getElementById("js-option-content"),
    formPlane:document.getElementById("js-formOptionPlane"),
    btnSave:document.getElementById("btn-formEdit-save")
  }

  /*面板操作类*/
  var _optionOperate={
    dom:dom,
    show:function(){
      dom.formPlane.style.cssText="display:block;";
      //console.log("thedom",dom);
    },
    hide:function(){
      dom.formPlane.style.cssText="display:none;";
    },
    setSelectBorder:function(controlid){

      var editMaskList=document.querySelectorAll(".custom-form-editMask");

      for(var index=0;index<editMaskList.length;index++){
        console.log(editMaskList[index].dataset.targetid);
        if(editMaskList[index].getAttribute("success")!=undefined){
          editMaskList[index].style.cssText="border-color:#13cf70;";
        }else if(editMaskList[index].dataset.targetid===controlid){
            editMaskList[index].style.cssText="border-color:#39a5ea;";
        }else{
            editMaskList[index].style.cssText="border-color:gray;";
        }
      }
    },
    setSelectSuccess:function(controlid){
      var editMaskList=document.querySelectorAll(".custom-form-editMask");

      for(var index=0;index<editMaskList.length;index++){
        console.log(editMaskList[index].dataset.targetid);
        if(editMaskList[index].dataset.targetid===controlid){
            editMaskList[index].style.cssText="border-color:#13cf70;";
            editMaskList[index].setAttribute("success",true);
        }
      }
    }
    ,
    unSetSelectBorder:function(){
      var editMaskList=document.querySelectorAll(".custom-form-editMask");

      for(var index=0;index<editMaskList.length;index++){
          editMaskList[index].style.cssText="border-color:gray;";
      }
    }
    ,
    clear:function(){
      dom.appendPlane.innerHTML="";
    },
    generate:function(e){
        e.preventDefault();

    },
    setCurrentId:function(id){
      currentId=id;
    },
    getCurrentId:function(){
      return currentId;
    }
  }

  var _createWrapBase=function(control,option){
    var wrap=document.createElement("div");
    wrap.setAttribute("class","item-option-colum");

    var label=document.createElement("label");
    label.innerHTML=option.attrName;

    wrap.appendChild(label);
    wrap.appendChild(control);

    return wrap;
  }


  var _createReader={
    "input":function(){

    },

    "checkbox":function(){

    },

    "select":function(){

    },

    "dynamic_select":function(){



    }





  }


  var _createWrap={

    "input":function(){

    },
    "select":function(){

    },
    "checkbox":function(){

    },
    "radio":function(){

    },
    "file":function(){

    },
    "label":function(){

    },
    "multiline":function(){

    }

  }
  /*设置控件的唯一ID*/
  var _setOptionOnlyId=function(dom){
      var controlId=dom.localName+"_"+Date.parse(new Date());
      var randomStr=  Math.floor(Math.random()*20000+1);
      controlId=controlId+"_"+randomStr;
      dom.setAttribute("data-controlId",controlId);
  }

  var _createPlugs={
    "dynamic_select":function(){
      //var dom=tools.parseDom(template.ht_optionHtml);
      console.log("创建的html是:",template.ht_optionHtml);
    }
  }

  var _createFromOption={
      "label":function(option){

      },
      "input":function(option){

        var input=document.createElement(option.el);
        input.setAttribute("class",option.class);
        input.setAttribute("placeholder",option.attrName);
        input.setAttribute("data-targetAttr",option.attrName);
        return input;

      },
      "select":function(option){

        var select=document.createElement(option.el);
        var selectList=option.defaultVal;
        select.setAttribute("data-targetAttr",option.attrName);
        for(var key in selectList){
          var seletEl=document.createElement("option");
          seletEl.innerHTML=key;
          seletEl.setAttribute("value",selectList[key]);
          select.appendChild(seletEl);
        }

        return select;

      },
      "checkbox":function(option){

        var checkbox=document.createElement("input");
        checkbox.setAttribute("type",option.el);
        checkbox.setAttribute("data-targetAttr",option.attrName);
        return checkbox;
        console.log("参数是：",option.currentType);
        console.log("类型是：",option);
      },

      "dynamic_select":function(option){
        var button=document.createElement("button");
        button.setAttribute("class","am-btn am-btn-default");
        button.innerHTML="<i class='iconfont icon-xinzeng'></i>添加数据"
        button.addEventListener("click",function(e){
          e.preventDefault();

          //template.ht_optionHtml
          var alertObj=template.ht_optionAddSelectHtml;
          alertObj.querySelector("#selectKey").setAttribute("value","");
          alertObj.querySelector("#selectValue").setAttribute("value","");

          var alertHtml=tools.getHtml(alertObj);
          //console.log("alertHtml",template.ht_optionAddSelectHtml);

          customAlter.alertHtml({
            title:"请输入添加数据",
            html:alertHtml,
            success:function(){
              var selectKey=document.getElementById("selectKey");
              var selectValue=document.getElementById("selectValue");
              if(selectKey.value===""){
                return;
              }
              var newDom=tools.getVirtualDomById(templateHtml,"js-template-optionSelect");
              _setOptionOnlyId(newDom);
              newDom.querySelector("input[name='name']").value=selectKey.value;
              newDom.querySelector("input[name='value']").value=selectValue.value;
              dom.appendPlane.appendChild(newDom);

              newDom.querySelector(".am-btn-primary").addEventListener("click",function(e){
                console.log(e);
                e.preventDefault();
                var item=tools.parentUntilByAttr(e.srcElement,"class","item-option-row").parentNode;
                var keys=item.querySelector("input[name='name']").value;
                var value=item.querySelector("input[name='value']").value;
                var alertUpdateObj=template.ht_optionAddSelectHtml;
                console.log("theInput",alertUpdateObj.querySelector("#selectKey"));
                console.log("keys",keys);
                console.log("value",value);
                alertUpdateObj.querySelector("#selectKey").setAttribute("value",keys);
                alertUpdateObj.querySelector("#selectValue").setAttribute("value",value);
                alertUpdateObj.setAttribute("data-targetOption",item.dataset.controlid);
                var alertUpdateHtml=tools.getHtml(alertUpdateObj);
                console.log("alertUpdateHtml",alertUpdateHtml);
                customAlter.alertHtml({
                  title:"请输入修改的数据",
                  html:alertUpdateHtml,
                  success:function(){
                    var selectKey=document.getElementById("selectKey");
                    var selectValue=document.getElementById("selectValue");
                    var targetId=selectValue.parentNode.parentNode.dataset.targetoption;
                    if(selectKey.value===""){
                      return;
                    }
                    console.log("targetId",targetId);
                    var updateItem=document.querySelector("[data-controlid='"+targetId+"']");
                    console.log("updateItem",updateItem);
                    updateItem.querySelector("input[name='name']").value=selectKey.value;
                    updateItem.querySelector("input[name='value']").value=selectValue.value;

                  }
                })

              });
              newDom.querySelector(".am-btn-danger").addEventListener("click",function(e){
                e.preventDefault();
                var parent=tools.parentUntilByAttr(e.srcElement,"id","js-option-content");
                var item=tools.parentUntilByAttr(e.srcElement,"class","item-option-row").parentNode;
                console.log("parent",parent);
                console.log("item",item);

                parent.removeChild(item);
                //alert("prev2");

              });
            }
          });

          _createPlugs["dynamic_select"]();
          //_event["dynamic_select"](e);
        });

        return button;

      },


      "radio":function(typeObj,type,planes,valueObj){

      },
      "file":function(typeObj,type,planes,valueObj){

      },
      "label":function(typeObj,type,planes,valueObj){

      },
      "multiline":function(typeObj,type,planes,valueObj){

      }
  }


  function _createOption(option){
    console.log("传进去的选项是：",option);


    for(var key in option.optionMap.editOption){
      var current=option.optionMap.editOption[key];
      var optionControl=_createFromOption[current.el](current);
      //var optionWrap=_createWrap[option.type](option);
      var optionBaseWrap=_createWrapBase(optionControl,current);
      dom.appendPlane.appendChild(optionBaseWrap);

      console.log(optionControl);
      console.log(key,current);
      //var optionWrap=_createWrap[option.type](option);
    }



    return;

  }

  function _saveOption(formId,controlId,planeid){
    var form=document.getElementById(formId);
    var formControls=document.querySelectorAll("#"+formId+" [name]");
    var formList=document.querySelectorAll("#js-option-content [data-targetattr]");
    var targetControl=document.querySelector("[data-controlid='"+controlId+"']");
    var plane=document.querySelector("[data-controlid='"+planeid+"']");
    var formType=plane.dataset.type;
    console.log("controlId",controlId);
    console.log("targetControl",targetControl);

    for(var index=0;index<formList.length;index++){

      var currentOption=formList[index];
      var attr=currentOption.getAttribute("data-targetattr");
      var attrValue=currentOption.value;
      if(attrValue!==undefined&&attrValue!==""){

        switch(formType){
          case "label":
            targetControl.innerHTML=attrValue;
          break;
          case "checkbox":
            var checkbox=targetControl.childNodes[0];
            if(attr==="text"){
              targetControl.removeChild(targetControl.childNodes[1]);
              var textdom;
              if(targetControl.querySelector("text")!=undefined){
                 textdom=document.createElement("text");
              }
              else{
                 textdom=document.createElement("text");
              }

              textdom.innerHTML=attrValue;
              checkbox.parentNode.appendChild(textdom);
            }
            else{
              checkbox.setAttribute(attr,attrValue);
            }


          break;
          case "radio":
          var radio=targetControl.childNodes[0];
          if(attr==="text"){
            targetControl.removeChild(targetControl.childNodes[1]);
            var textdom;
            if(targetControl.querySelector("text")!=undefined){
               textdom=document.createElement("text");
            }
            else{
               textdom=document.createElement("text");
            }

            textdom.innerHTML=attrValue;
            radio.parentNode.appendChild(textdom);
          }
          else{
            radio.setAttribute(attr,attrValue);
          }

          break;

          case "select":
          console.log("the select is","select");
          var select=targetControl.childNodes[0];
          var formPlane=document.getElementById("js-option-content");
          var optionList=formPlane.querySelectorAll("[data-controlid]");
          console.log("optionList",optionList);
          for(var itemIndex =0; itemIndex<optionList.length;itemIndex++){
            var option=optionList[itemIndex];

            var keys=option.querySelector("input[name='name']").value;
            var value=option.querySelector("input[name='value']").value;
            var newOption=document.createElement("option");
            newOption.innerHTML=value;
            newOption.setAttribute("value",keys);
            select.appendChild(newOption);
            console.log("option",option);
          }
            //data-controlid
          break;


          default:
            targetControl.setAttribute(attr,attrValue);
          break;
        }


      }else{
        customAlter.alertTip({
          title:"系统提示",
          text:"请填写改表单控件的值。",
          type:"warning"
        });
        return false;
      }
    }
    console.log("formList",formList);
    console.log(formControls);
    console.log(form);
    return true;
  }


  //var formOptionFactory=function()


 return{
   optionCreate:_createOption,
   optionOperate:_optionOperate,
   saveOption:_saveOption,
   
 }
 /*
  return {
    displayOption:_displayOption,
    clearOption:_clearOption,
    createOption:_createOption,
    saveOption:_saveOption,
    optionOperate:_optionOperate
  }
 */
});
