define(["tools"],function(tools){
  /*表单对象*/
  var formMap={
    layout:{
      title:"面板",
      icon:"iconfont icon-novigo_layout",
      enable:true,
      controlMap:
      {
        "row":{
          title:"行面板",
          el:"div",
          attr:{
            class:"item-row form-item"
          },
          dataAttrs:{
            level:1
          },
          icon:"iconfont icon-hang",
          enable:true,
          parentType:"layout"
        },
        "col":{
          title:"列面板",
          el:"div",
          attr:{
            class:"item-colum form-item",
          },
          dataAttrs:{
            level:1
          },
          icon:"iconfont icon-lie",
          enable:true,
          parentType:"layout"
        }
      }
    },
    formControl:
    {
      title:"表单",
      icon:"iconfont icon-lingjianxiangqing",
      enable:true,
      controlMap:{
        "label":{
          title:"描述",
          el:"div",
          attr:{
            class:"label"
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-biaoti",
          enable:true,
          parentType:"formControl"
        },
        "input":{
          title:"文本框",
          el:"input",
          attr:{
            type:"text"
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-wenbenkuang",
          enable:true,
          parentType:"formControl"
        },
        "radio":{
          title:"单选框",
          el:"input",
          wrap:"label",
          attr:{
            type:"radio",
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-danxuankuangxuanzhong",
          enable:true,
          parentType:"formControl"
        },
        "checkbox":{
          title:"多选框",
          el:"input",
          wrap:"label",
          attr:{
            type:"checkbox",
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-icon192",
          enable:true,
          parentType:"formControl"
        },
        "select":{
          title:"下拉框",
          el:"select",
          icon:"iconfont icon-xialakuang",
          wrap:"label",
          enable:true,
          dataAttrs:{
            level:2
          },
          parentType:"formControl"
        },
        /*
        "timepicket":{
          title:"时间选择",
          el:"input",
          icon:"iconfont icon-riqixuanze",
          enable:true,
          dataAttrs:{
            level:2
          }

        },
        */
        "multiline":{
          title:"多行文本",
          el:"textarea",
          icon:"iconfont icon-kongjian-duohangshurukuang",
          enable:true,
          dataAttrs:{
            level:2
          },
          parentType:"formControl"

        },
        "file":{
          title:"文件上传",
          el:"input",
          attr:{
            type:"file",
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-uploadPic",
          enable:true,
          parentType:"formControl"

        },
        /*
        "submit":{
          title:"提交",
          el:"input",
          attr:{
            type:"submit",
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-anniu",
          enable:true,
          parentType:"formControl"
        }
        */
        /*
        ,
        "button":{
          title:"按钮",
          el:"input",
          attr:{
            type:"button",
          },
          dataAttrs:{
            level:2
          },
          icon:"iconfont icon-anniu",
          enable:true,
        }
        */

      }
    }
  }

  /*下拉框加载的对象*/
  var layout={
    itemSelect:"iphone 6 Plus",
    layoutStyle:{},
    defaultDom:"",
    currentSize:{
      width:414,
      height:736
    },
    layoutItems:{
      "iphone 5":{
        width:320,
        height:560
      },
      "iphone 6":{
        width:375,
        height:667
      },
      "iphone 6 Plus":{
        width:414,
        height:736
      },
      "iPad":{
        width:768,
        height:1024
      }
    }
  }

  /*vue加载的对象*/
  var vueFormMap=tools.cloneObj(formMap);

  return{
    formMap:formMap,
    vueFormMap:vueFormMap,
    layout:layout
  }
});
