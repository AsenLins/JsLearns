
define(["formOption","sweetalert2"],function(formOption,swal){
  /*显示或隐藏选项*/


  var formOptionMap=formOption;

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
        if(editMaskList[index].dataset.targetid===controlid){
            editMaskList[index].style.cssText="border-color:#39a5ea;";
        }else{
            editMaskList[index].style.cssText="border-color:gray;";
        }
      }
    },
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
    generate:function(){

    }
  }


  var _showAlter=function(option){
      swal({
      title: option.title,
      /*type: 'info',*/
      html:option.html,
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
          option.success.call(this);
        }
        else{

        }
    })

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

      "dynamic":function(option){
        var button=document.createElement("button");
        button.setAttribute("class","am-btn am-btn-default");
        button.innerHTML="<i class='iconfont icon-xinzeng'></i>添加数据"
        button.addEventListener("click",function(e){
          var dataInput=
          "<div class='item-option-colum'><input id='selectKey' type='text' placeholder='name' class='am-form-field' /></div>"
         +"<div class='item-option-colum'><input id='selectValue' type='text' placeholder='value' class='am-form-field' /></div>";
          _showAlter({
            title:"请输入添加数据",
            html:dataInput,
            success:function(){
              var selectKey=document.getElementById("selectKey");
              var selectValue=document.getElementById("selectValue");
              if(selectKey.value===""){
                return;
              }


              var dataOption=document.createElement("div");
              var dataRemove=document.createElement("button");
              dataRemove.setAttribute("class","am-btn am-btn-danger");
              dataRemove.innerHTML="<i class='iconfont icon-shanchu'></i>";
              dataOption.setAttribute("class","item-option-row");

              dataOption.innerHTML="<label style='margin-right:0.6em; line-height:39px;'>option:</label>"
              +"<input disabled='disabled'  type='text' class='am-form-field' value="+selectKey.value+" />"
              +"<input disabled='disabled'  type='text' class='am-form-field' value="+selectValue.value+" />";
              dataOption.appendChild(dataRemove);
              dom.appendPlane.appendChild(dataOption);
              //dom.appendPlane.innerHTML=dom.appendPlane.innerHTML+dataOption;
              console.log(selectKey.value);
              console.log(selectValue.value);
            }
          });
          e.preventDefault();
          return false;
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
    //var optionControl=_createFromOption[option.type](option);
    //var optionWrap=_createWrap[option.type](option);
    //var optionBaseWrap=_createWrapBase(option);

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


    //console.log(argument);
    //console.log(arguments);
    //var editOption=typeObj.editOption;
    //_createFromOption[type].apply(this,arguments);


    // typeObj,type,planes,valueObj
    //_createFromOption[type]




    return;
    /*
    var editOption=typeObj.editOption;
    var optionDom=document.createElement("div");
    console.log("append Plane",planes);

    for(var elName in editOption){
      console.log("创建的元素名称为:",elName);
      console.log("创建元素为:",editOption[elName]);

      var elObj=editOption[elName];
      var wrap=document.createElement("div");
      wrap.setAttribute("class","item-option-colum");

      var label=document.createElement("label");
      label.innerHTML=elObj.attrName;

      var el=document.createElement(elObj.el);
      el.setAttribute("placeholder",elObj.attrName);
      el.setAttribute("name",attrName);

      if(elObj.class!=undefined){
        el.setAttribute("class",elObj.class);
      }

      console.log();
      switch(elObj.el){
        case "select":
          var getSelectList=elObj.defaultVal;
          for(var key in getSelectList){
            var seletEl=document.createElement("option");
            seletEl.innerHTML=key;
            seletEl.setAttribute("value",getSelectList[key]);
            el.appendChild(seletEl);
          }
          break;
      }

      switch(elName){
        case "checked":
        console.log("create CheckEd",elObj.type);
        console.log(el);

        el.setAttribute("type",elObj.type);
        console.log(el);
        break;



        break;
      }




      console.log(planes);
      wrap.appendChild(label);
      wrap.appendChild(el);
      planes.appendChild(wrap);

    }
    */
    //var el=document.createElement(editOption.el);
  }

  function _saveOption(formId,controlId){
    var form=document.getElementById(formId);
    var formControls=document.querySelectorAll("#"+formId+" [name]");
    console.log(formControls);
    console.log(form);




  }


  //var formOptionFactory=function()

 return{
   optionCreate:_createOption,
   optionOperate:_optionOperate
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
