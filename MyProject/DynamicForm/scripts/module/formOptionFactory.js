
define(["tools"],function(tools,formOption){
  /*显示或隐藏选项*/
  function _displayOption(type){
    document.getElementById("js-formOptionPlane").display=type;
  }

  function _clearOption(){
    document.getElementById("js-formOptionPlane").innerHTML="";
  }


  var _createContext={



  }


  function _createOption(typeObj,type){
    var editOption=typeObj.editOption;
    var optionDom=document.createElement("div");
    var plane=document.getElementById("js-option-content");

    for(var elName in editOption){
      console.log("创建的元素名称为:",elNmae);
      console.log("创建元素为:",editOption[elName]);

      var elObj=editOption[elName];
      var wrap=document.createElement("div");
      wrap.setAttribute("class","item-option-colum");

      var label=document.createElement("label");
      label.innerHTML=elObj.title;

      var el=document.createElement(elObj.el);
      el.setAttribute("placeholder",elObj.title);

      wrap.appendChild(label);
      wrpa.appendChild(el);
      plane.appendChild(wrap);
    }

    var el=document.createElement(editOption.el);
  }


  //var formOptionFactory=function()


  return {
    displayOption:_displayOption,
    clearOption:_clearOption
  }

});
