/**
 * 表单生成工厂
 * 主要负责生成表单元素，以及
 * @return {[object]} [工厂方法]
 */
define(["tools","formUI"],function(tools,ui){


  var formCreatorFactory=(function(tools,ui){
      var tools=tools;
      var currentUI=ui.amazeUI;
      /*错误提示对象*/
      var errorMes={
        "4001":"未知元素",
        "4101":"未能获取要被修改的dom元素"
      }

      /*设置对象的attr属性*/
      var _setAttr=function(option,dom,attrListName,isDataAttr){
        var prefix="";
        if(option[attrListName]===undefined){
          return;
        }
        if(isDataAttr){
          prefix="data-";
        }
        for(attrName in option[attrListName]){
          dom.setAttribute(prefix+attrName,option[attrListName][attrName]);
        }
      };


      /*设置拖拽事件*/
      var _setDropEvent=function(dom){
          dom.setAttribute("draggable",true);
          dom.setAttribute("ondragstart","dragEventBus.dragStart(event)");
      }


      /*设置控件的唯一ID*/
      var _setOnlyId=function(dom){
          var controlId=dom.localName+"_"+Date.parse(new Date());
          dom.setAttribute("data-controlId",controlId);
      }

      /*设置控件的html字符串*/
      var _wrapInnerHtmlStr=function(dom){
          var wrapDom=document.createElement("div");
          wrapDom.appendChild(dom);
          return wrapDom;
      }

      /*设置控件Ui的Class*/
      var _setUiClass=function(controlType,dom){
          if(currentUI[controlType]===undefined){
            return;
          }
          //console.log(controlType);
          var uiClass=currentUI[controlType]["className"];
          dom.setAttribute("class",uiClass);
      }

      /*设置特殊控件的函数*/
      var _setSpecial={
        "label":function(controlType,dom){
          dom.innerHTML=controlType;
        }
      }

      /*创建表单元素*/
      var _create=function(option,type){
        var wrapDom,formDom;
        if(option.el===undefined){
          throw errorMes["4001"];
        }

        formDom=document.createElement(option.el);
        _setAttr(option,formDom,"attr",false);
        _setUiClass(type,formDom);

        if(option.wrap!==undefined){
            wrapDom=document.createElement(option.wrap);
            wrapDom.appendChild(formDom);
            wrapDom.innerHTML=wrapDom.innerHTML+option.attr.type;
            formDom=wrapDom;
        }

        if(_setSpecial[type]!==undefined&&typeof(_setSpecial[type])==="function"){
          _setSpecial[type](type,formDom);
        }

        _setAttr(option,formDom,"dataAttrs",true);
        _setDropEvent(formDom);
        _setOnlyId(formDom);

        var innerHtmlStr=_wrapInnerHtmlStr(formDom).innerHTML;

        return {
          formDom:formDom,
          formHtml:innerHtmlStr
        };
      }


      /*获取需要改动的dom元素*/
      var _getChangeDom=function(option,type){

        var changeDom={
          targetDom:document.querySelector("[data-controlId='"+option.controlId+"']") //document.getElementById(option.controlId)
        };

        if(option.newDom!==undefined){
            changeDom.formDom=_create(option.newDom,type).formDom;
        }

        else if(option.controlId!==undefined){
            changeDom.formDom=document.querySelector("[data-controlId='"+option.controlId+"']"); //_create(option.newDom);
        }

        if(changeDom.formDom===undefined){
          throw ["4101"];
        }

        return changeDom;
      }

      /*创建表单元素*/
      var createContext=function(option,type){
          return _create(option,type);
      }

      //var createContext=function()

      /*追加表单元素到目标元素之后*/
      var appendContext=function(option,type){
          var changeDom=_getChangeDom(option,type);
          tools.insertAfter(changeDom.formDom,changeDom.targetDom);
      }

      /*追加元素到目标元素之前*/
      var beforeContext=function(option,type){
          var changeDom=_getChangeDom(option,type);
          changeDom.targetDom.parentNode.insertBefore(changeDom.formDom,changeDom.targetDom);
      }

      var replaceContext=function(replaceObj){

      }

      return{
        create:createContext,
        append:appendContext,
        before:beforeContext
      }

  })(tools,ui);

  return formCreatorFactory;

});
