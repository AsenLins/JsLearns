/**
 * 表单属性工厂
 * @return {[object]} 属性对象
 */
define(function(){
  var formOptionMap={
    "form":{
      editOption:{
            metod:{
              title:"method",
              el:"select",
              defaultVal:{
                get:"get",
                post:"post"
              }
            },
            action:{
              title:"action",
              el:"input"
            },
            enctype:{
              title:"enctype",
              el:"select",
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
          title:"标题内容",
          el:"input",
          type:"text"
        }
      }
    },
    "input":{
      editOption:{
        name:{
          title:"name",
          el:"input"
        },
        placeholder:{
          title:"placeholder",
          el:"input"
        },
        type:{
          title:"type",
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
          title:"value",
          el:"input"
        },
        name:{
          title:"name",
          el:"input"
        },
        checked:{
          title:"checked",
          el:"checkbox"
        }
      }
    },
    "select":{
        editOption:{
          name:{
            title:"name",
            el:"input"
          }
        }
    },
    "radio":{
      editOption:{
        value:{
          title:"value",
          el:"input"
        },
        name:{
          title:"name",
          el:"input"
        },
        checked:{
          title:"checked",
          el:"checkbox"
        }
      }
    },
    "file":{
      editOption:{
        name:{
          title:"name",
          el:"input"
        },
        postUrl:{
          title:"postUrl",
          el:"input"
        },
        postType:{
          title:"postType",
          el:"select",
          defaultVal:{
            "get":"get",
            "post":"post"
          }
        }
      }
    },
    "multiline":{
      editOption:{
        name:{
          title:"name",
          el:"input"
        }
      }
    }





  }



  var formOptionFactory=(function(){

     function _init(){

     }





      return{
        update:null
      };
  })();


  return formOptionFactory;
});
