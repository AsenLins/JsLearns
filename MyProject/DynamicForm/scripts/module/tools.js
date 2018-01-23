define(function(){
  /**
   * 根据key值查找对象的值
   * @param       {object} targetObj 目标对象
   * @param       {object} keyName   查找的键值对
   * @return      {object}           返回对应的值
   */
  function _findObjVal(targetObj,keyName) {
    var _obj;
    for(var key in targetObj){

      if(key==keyName){
        _obj=targetObj[key];
        return _obj;
      }

      else if(typeof(targetObj[key])==="object"){
        _obj=_findObjVal(targetObj[key],keyName);
        if(_obj!==undefined){
          return _obj;
        }
      }
    }
    return _obj;
  }

  function _parseDom(html){
    var wrapDom=document.createElement("div");
    wrapDom.innerHTML=html;
    return wrapDom.childNodes;
  }

  function _getHtml(dom){
    var wrapDom=document.createElement("div");
    wrapDom.appendChild(dom);
    return wrapDom.innerHTML;
  }

  /**
   * 对象元素深拷贝（只支持值类型和对象类型，暂未支持兼容数组）。
   * @param       {[object]} targetObj 拷贝对象
   * @constructor
   * @return      object           完成拷贝的新的对象
   */
  function _cloneObj(targetObj){
    var _obj={};
    for(var key in targetObj){
      if(typeof(targetObj[key])==="object"){
        _obj[key]=_cloneObj(targetObj[key]);
      }
      else{
        _obj[key]=targetObj[key];
      }
    }
    return _obj;
  }

  /**
   * 映射对象值
   * @param       {[object]} targetObj 映射目标
   * @param       {[object]} mapObj    被映射对象
   * @constructor
   * @return      {[object]}           映射完成的对象
   */
  function _objMapTo(targetObj,mapObj) {
    for(var key in  targetObj){
      targetObj[key]=mapObj[key];
    }
    return targetObj;
  }

  /**
   * 插入到指定元素后方
   * @param       {[object]} newElement    [插入的元素]
   * @param       {[object]} targetElement [目标元素]
   * @constructor
   */
  function _insertAfter(newElement, targetElement){
    console.log("添加的元素是：",newElement);
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
    // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parent.appendChild(newElement);
    }
    else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
  }

  return{
    findObjVal:_findObjVal,
    cloneObj:_cloneObj,
    objMapTo:_objMapTo,
    insertAfter:_insertAfter,
    getHtml:_getHtml,
    parseDom:_parseDom
  }

});
