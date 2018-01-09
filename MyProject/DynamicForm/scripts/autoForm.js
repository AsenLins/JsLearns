(function(){

/*
  input:{},
  radio:{},
  checkbox:{},
  select:{},
  timepicket{},
  Multiline:{},
  file:{}
*/

  var formMap={
    layout:{
      title:"表单"
      icon:"",
      enable:true,
      controlMap:
      {
        "row":{
          title:"行面板",
          icon:"",
          enable:true
        },
        "col":{
          title:"列面板",
          icon:"",
          enable:true
        }
      }

    },
    formControl:
    {
      title:"表单"
      icon:"",
      enable:true
      controlMap:{
        "input":{
          title:"文本框",
          icon:"",
          enable:true
        },
        "radio":{
          title:"单选框",
          icon:"",
          enable:true
        },
        "checkbox":{
          title:"多选框",
          icon:"",
          enable:true
        },
        "select":{
          title:"下拉框",
          icon:"",
          enable:true
        },
        "timepicket":{
          title:"时间选择",
          icon:"",
          enable:true
        },
        "Multiline":{
          title:"多行文本",
          icon:"",
          enable:true
        },
        "file":{
          title:"文件上传",
          icon:"",
          enable:true
        }
      }
    }


  }




  /**
   * [拖拽模块]
   * 依赖组件：
   * vue
   * Create At 2018-1-9 Asen
   * @param  {对象} formMap [数据源]
   * @return {[type]}         [description]
   */
  var drag=function(formMap){

      if(formMap==undefined){
        throw "formMap不能为空!";
      }


      var dragMenu=function(){

      }

      var dragEvent=function(){

      }

      var _init=function(){

      }
  }





  var dragMap={
    formControl:{

    },

    layout:{

    }

  };

  var drag={


  }



  var formControlOption={
      description:"",
      type:"",
      verify:{},
      name:"",
      defaultValue:"",
      attr:{


      },
      notNull:false,
      link:{
        default:"",
        linkArray:[

        ]
      },

  }

  var formControl={
      input:{},
      radio:{},
      checkbox:{},
      select:{},
      timepicket{},
      Multiline:{},
      file:{}
  };

  var layout={
      row:{},
      col:{}
  }

  var layoutOption={



  }



})(window);
