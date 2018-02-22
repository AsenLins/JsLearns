

define(function(require){
  var Vue=require("base/vue/vue");

  Vue.component('auto-input',{
    template:"<input v-on:click='testClick' type='input'/>",
    data:function(){
      return {
        placeholder:""

      }
    },
    Created:function(){
      console.log(this);
      console.log("auto-input is Create");
    },
    methods:{
      change:function(){

      },
      testClick:function(){
        alert("cool");
      }
    }
  });
  Vue.component('auto-radio',{
    template:"#auto-radio",
    data:function(){

    }
  });

  Vue.component("auto-checkbox",{
    template:"#auto-checkbox",
    data:function(){

    }
  });

  Vue.component("auto-imgUpload",{
    template:"#auto-imgUpload",
    data:function(){

    }
  });

  Vue.component("auto-fileUpload",{
    template:"#auto-fileUpload",
    data:function(){

    }
  });

  Vue.component("auto-textarea",{
    template:"#auto-textarea",
    data:function(){

    }
  });






});
