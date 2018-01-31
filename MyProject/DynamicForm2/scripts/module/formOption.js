/**
 * 表单属性工厂
 * @return {[object]} 属性对象
 */
define(function(){
  /*
  var appendPlane=document.getElementById("js-option-content");
  var formPlane=document.getElementById("js-formOptionPlane");
  var btnSave=document.getElementById("btn-formEdit-save");
  var editMaskList=document.querySelectorAll(".custom-form-editMask");



   */



  var formOptionMap={
    "form":{
      editOption:{
            method:{
              attrName:"method",
              el:"select",
              notNull:true,
              defaultVal:{
                get:"get",
                post:"post"
              }
            },
            action:{
              attrName:"action",
              el:"input",
              notNull:true
            },
            enctype:{
              attrName:"enctype",
              el:"select",
              notNull:true,
              defaultVal:{
                "application/x-www-form-urlencoded":"application/x-www-form-urlencoded",
                "multipart/form-data":"multipart/form-data",
                "text/plain":"text/plain"
              }
            }
      }
    },
    "label":{
      editOption:{
        html:{
          attrName:"label",
          el:"input",
          type:"text"
        }
      }
    },
    "input":{
      editOption:{
        name:{
          attrName:"name",
          el:"input",
          notNull:true,
          class:"am-form-field"
        },
        placeholder:{
          attrName:"placeholder",
          el:"input",
          class:"am-form-field"
        },
        type:{
          attrName:"type",
          el:"select",
          defaultVal:{
            text:"text",
            email:"email",
            number:"number",
            tel:"tel"
          }
        }
      }
    },
    "checkbox":{
      editOption:{
        value:{
          attrName:"value",
          el:"input",
          notNull:true,
          class:"am-form-field"
        },
        name:{
          attrName:"name",
          el:"input",
          notNull:true,
          class:"am-form-field"
        },
        text:{
          attrName:"text",
          el:"input",
          notNull:true
        },
        checked:{
          attrName:"checked",
          el:"checkbox",
          type:"checkbox",
          label:"是否选中"
        }
      }
    },
    "select":{
        editOption:{
          name:{
            attrName:"name",
            el:"input",
            notNull:true,
            class:"am-form-field"
          },
          data:{
            attrName:"select",
            title:"新增option值",
            type:"dynamic_select",
            el:"dynamic_select"
          }
        }
    },
    "radio":{
      editOption:{
        value:{
          attrName:"value",
          el:"input",
          notNull:true,
          class:"am-form-field"
        },
        text:{
          attrName:"text",
          el:"input",
          notNull:true
        },
        name:{
          attrName:"name",
          el:"input",
          notNull:true,
          class:"am-form-field"
        },
        checked:{
          attrName:"checked",
          el:"checkbox",
          type:"checkbox"
        }
      }
    },
    "file":{
      editOption:{
        name:{
          attrName:"name",
          el:"input",
          notNull:true,
          class:"am-form-field"
        }
        /*
        postUrl:{
          attrName:"postUrl",
          el:"input",
          class:"am-form-field"
        },
        postType:{
          attrName:"postType",
          el:"select",
          defaultVal:{
            "get":"get",
            "post":"post"
          }
        }
        */
      }
    },
    "multiline":{
      editOption:{
        name:{
          attrName:"name",
          el:"input",
          class:"am-form-field",
          notNull:true
        }
      }
    }





  }


  return formOptionMap;
});
