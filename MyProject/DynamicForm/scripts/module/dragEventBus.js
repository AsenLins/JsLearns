

/**
 * 拖拽事件广播（EventBus）
 * @return {object} 拖拽事件广播对象
 */

define(function(){
  var dragEventBus=(function(){
      var ErrorMes={
        "5001":"该事件已注册"
      };

      var dragParam={
         dragKey:""
      };

      var dragEvent={
        StartRegEvent:{},
        OverRegEvent:{},
        EndRegEvent:{}
      };

      function _regDragEvent(regName,eventName,fn) {
        if(dragEvent[regName][eventName]!==undefined){
          throw ErrorMes["5001"];
          return;
        }
        dragEvent[regName][eventName]=fn;
      }

      function _unbindDragEvent(regName,eventName) {
        delete dragEvent[regName][eventName];
      }

      function _runDragEvent(regName,event) {
        var currentDragEvent=dragEvent[regName];
        for(var eventName in currentDragEvent){
          currentDragEvent[eventName].call(this,event);
        }
      }

      function regStartEvent(eventName,fn){
          _regDragEvent("StartRegEvent",eventName,fn);
      }

      function regOverEvent(eventName,fn) {
          _regDragEvent("OverRegEvent",eventName,fn);
      }

      function regEndEvent(eventName,fn){
          _regDragEvent("EndRegEvent",eventName,fn);
      }

      function unbindStartEvent(eventName) {
          _unbindDragEvent("StartRegEvent",eventName);
      }

      function unbindOverEvent(eventName) {
          _unbindDragEvent("OverRegEvent",eventName);
      }

      function unbindEndEvent(eventName) {
          _unbindDragEvent("EndRegEvent",eventName);
      }
      function setDragKey(key,val) {
        dragParam[key]=val;
      }
      function getDragKey(key){
        return dragParam[key];
      }


      return{
        regStartEvent:regStartEvent,
        regOverEvent:regOverEvent,
        regEndEvent:regEndEvent,
        unbindStartEvent:unbindStartEvent,
        unbindOverEvent:unbindOverEvent,
        unbindEndEvent:unbindEndEvent,
        setDragKey:setDragKey,
        getDragKey:getDragKey,

        dragStart:function(e){

          _runDragEvent("StartRegEvent",e);

        },

        dragOver:function(e){
          _runDragEvent("OverRegEvent",e);
          e.preventDefault();
        },

        dragEvent:function(e){
          _runDragEvent("EndRegEvent",e);
          e.preventDefault();
        }

      };

  })();

  return dragEventBus;

});
