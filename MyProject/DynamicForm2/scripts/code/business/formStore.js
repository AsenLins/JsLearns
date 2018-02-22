
/**
 * 表单状态管理
 * @param  {object} require require对象
 * @return {object}         表单状态对象
 */


var formControlMap={
    col:{
      el:"",
      html:"",
      title:"",
      level:1,
      verify:{},
      jsDes:[],
      cssDes:[]
    },
    row:{
      el:"",
      html:"",
      title:"",
      level:1,
      verify:{},
      jsDes:[],
      cssDes:[]
    }
}

define(function(require){

  var Vuex=require("base/vue/vuex");

  function init(data){
    var fromStore=new new Vuex.Store({
      state:data,
      getters:{},
      mutations:{
        add:function(){

        },
        delete:function(){

        },
        update:function(){

        },
        change:function(){

        },
        setAttr:function(){

        },
        save:function(){
          
        }
      },
      actions:{

      }
    });
  }

  return init;

});
