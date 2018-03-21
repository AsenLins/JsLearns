<template>

<div class="t-wrap">

    <van-nav-bar fixed="true" :title="title" ></van-nav-bar>

    
    <div class="t-inputBody">
        <p>p1111111111111111</p>
        <p>p222222222222222</p>
        <input type="button" id="btn_test"  value="测试" />
        <div class="t-chat left">
            <div >
                <img src="../assets/testPic.jpg" class="t-chat-pic" />
            </div>
            <div class="t-chat-content left">
                雷猴。              
            </div>
        </div>

        <div class="t-chat right">
            <div >
                <img src="../assets/testPic2.jpg" class="t-chat-pic right" />
            </div>

            <div  class="t-chat-content right" >
                你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐
            </div>
        </div>


        <div class="t-chat right">
            <div>
                <img src="../assets/testPic2.jpg" class="t-chat-pic right" />
            </div>

            <div class="t-chat-content right img" >
                <img src="../assets/testPic.jpg"  />
            </div>
        </div>



    </div>

    <div class="t-inputPlane">
        <van-col span="3"> 
            <div @click="showActionSelect" class="t-control-btn"> <van-icon name="add-o" /></div>
        </van-col>
         <van-col span="3"> 
            <div @click="showEmoJiPlane" class="t-control-btn t-control-emoji"> <i class="icon iconfont icon-xiaolian t-control-btn " /></div>
        </van-col>  

        <van-col  span="15">
            <div id="t-input" class="t-input"  contentEditable="true" >请输入信息...</div>
            <div class="t-input-line" ></div>
            <!--
            <van-cell-group>
            <van-field v-model="value" placeholder="请输入信息..." />
            </van-cell-group>
            -->
        </van-col>

        <van-col span="3"> 
           <div class="t-control-btn t-control-send"> <i class="icon iconfont icon-fasongduilie t-control-btn " /></div>
        </van-col>   
    </div>



    <div class="t-emoJiPlane " :class="{'t-emoJiPlane-show':emoJiOption.show}" >
        <van-swipe class="t-emoJiSwipe">

            <van-swipe-item class="t-emoJiSwipeItem">
                <van-col span="3" :key="emoJiItem.code" v-for="emoJiItem in emoJiOption.emoJiData.emoJiList" >
                  
                    <div @click="emojiSelect" class="t-emoJiItem" :data-code="emoJiItem.code" v-html="emoJiItem.html"></div>
                </van-col>
             
            </van-swipe-item>

            <van-swipe-item class="t-emoJiSwipeItem" >
        
                <van-col span="3" :key="emoJiItem.code" v-for="emoJiItem in emoJiOption.emoJiData.emoJiQQList" >
                    <div @click="emojiSelect" class="t-emoJiItem" :data-code="emoJiItem.code" v-html="emoJiItem.html"></div>
                </van-col>

            </van-swipe-item>

        </van-swipe>

    </div>



    <van-actionsheet :title="actionOption.title" v-model="actionOption.show">
     <div class="t-actionPlane">
        <van-col  span="3">
            <van-button v-on:click="showPhotoActionSelect" size="normal"><van-icon name="photograph" /></van-button>
            <div @click="showPhotoActionSelect" class="t-actionPlane-tip">{{actionOption.photoTitle}} </div> 
        </van-col>

     </div>
    </van-actionsheet>



    <van-actionsheet close-on-click-overlay="true" v-model="actionPhotoOption.show" title="" >
        <div class="actionPhotoOption">
            <van-row >
                <a @click="selectPhoto"> 拍照上传</a>
            </van-row>
            <van-row >
                <a @click="selectPhotoByList"> 从相册中选取</a>
            </van-row>
            <van-row  >
                <a @click="hidePhotoActionSelect"> 取消</a>
            </van-row>

        </div>
    </van-actionsheet>

</div>
</template>

<script>

/*引入页面需要的样式以及vant组件*/
import {NavBar,Actionsheet,Icon,Loading,ImagePreview,Row,Col,Button,Popup,Field,Toast,Swipe,SwipeItem} from 'vant';
import "../assets/css/font/iconfont.css";
import "../../node_modules/emoji-awesome/dist/css/emojione.min.css";

/*引入表情需要用到的js*/
var qqWechatEmotionParser=require('qq-wechat-emotion-parser');
var emoji=require('../util/emoji');



var range=function(targetId){
    var option={
        target:document.getElementById(targetId),
        range:null,
        lastRange:0
    };
    this.option=option;

    option.target.addEventListener("focusout",function(){
        var selection = window.getSelection();
        var range=selection.getRangeAt(0);
        option.lastRange=range.endOffset;
        option.range=range;    
        console.log("focus out");  
        /*
            console.log("EndRange",option.lastRange);
            console.log("range.startContainer",range);
            console.log("range.startContainer",range.startContainer);
            var text=document.createTextNode("dc");
            range.insertNode(text,range.startContainer);
            option.target.focus();
            range.setStart(range.startContainer,6);
            range.setEnd(range.startContainer,6);
            selection.removeAllRanges();
            selection.addRange(range); 
         */  
        
    });

};


range.prototype.insetDom=function(dom){

        var range=this.option.range;
        var target=this.option.target;


        var dom=document.createElement("i");
        dom.className="em em-smile"
        range.insertNode(dom,range.startContainer); 

        //range.insertNode(dom,range.startContainer); 
        var selection = window.getSelection();
        var insertRange=selection.getRangeAt(0);
        var lastRange=insertRange.endOffset;
        var startRange=insertRange.startOffset;


        console.log("insertRange",insertRange);
        
        console.log("lenght",dom.length);
        console.log("range",this.option.range);
        
        if(dom.nodeName!="#text"){
           dom=dom.nextSibling;
        }

        
        insertRange.setStart(dom,0);
        insertRange.setEnd(dom,0);
        selection.removeAllRanges();
        selection.addRange(insertRange); 
        
        //range.insertNode(text,range.startContainer);
        target.focus();

}


var range;
window.onload=function(){


var inputRange=new range("t-input");
console.log("inputRange",inputRange);


document.addEventListener("keyup",function(){
    var oControlRange = document.getSelection();
    var range=oControlRange.getRangeAt(0);
    console.log("key up range",range);
    if (oControlRange(0).tagName.toUpperCase() == "IMG"||oControlRange(0).tagName.toUpperCase()=="I") {
    alert("您在图片或I上按了键！")
    }
});


document.getElementById("t-input").addEventListener("click",function(e){
    console.log("keyup",e);
});

document.getElementById("t-input").addEventListener("fouse",function(e){
    console.log("fousein",e);
});


document.getElementById("btn_test").addEventListener("click",function(){
    var text=document.createTextNode("dcname");
    inputRange.insetDom(text);
});


}











/*初始化表情*/
function initEmoJi(){
    var emoJiList=[];
    var emoJiQQList=[];

    for(var emojiName in emoji.baseCode){
        var type=emoji.baseSource[emojiName].type;
        var emoJiObj={}
        if(type==="js"){
            emoJiObj.html=qqWechatEmotionParser(emoji.baseCode[emojiName]);
            emoJiObj.code=emoji.baseCode[emojiName];
            emoJiQQList.push(emoJiObj);  
        
        }else if(type==="class"){
            emoJiObj.html="<i class='em "+emoji.baseSource[emojiName].name+"' ></i>";
            emoJiObj.code=emoji.baseCode[emojiName]; 
            emoJiList.push(emoJiObj);           
        }
 
    }

    return {
        emoJiList:emoJiList,
        emoJiQQList:emoJiQQList
    };
}

var emoJiObj=initEmoJi();

console.log(emoJiObj.emoJiList);

//console.log("表情对象是",initEmoJi());


//var qqItem=


//Toast('不可发送空消息....');

export default {
  components:{
    [NavBar.name]: NavBar,
    [Actionsheet.name]:Actionsheet,
    [Icon.name]:Icon,
    [Row.name]:Row,
    [Col.name]:Col,
    [Button.name]:Button,
    [Popup.name]:Popup,
    [Field.name]:Field,
    [Toast.name]:Toast,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem
  },
  name: 'sealTalkApp',
  data () {
    return {
      title:"与Amy聊天中",
      actionOption:{
          show:false,
          title:"请选择以下操作",
          photoTitle:"照片"
      },
      actionPhotoOption:{
          show:false     
      },
      actionEmoJiOption:{
          title:"请选择表情",
          show:true
      },
      emoJiOption:{
          emoJiData:emoJiObj,
          show:false
      },
      chat:{
          send:[],
          rec:[],
          privewImg:[]
      }
    }
  },
  methods:{
    showActionSelect:function(){
        this.actionOption.show=true;
        this.emoJiOption.show=false;

    },
    hidePhotoActionSelect:function(){
        this.actionPhotoOption.show=false;
    },
    showPhotoActionSelect:function(){
        this.actionPhotoOption.show=true;
        this.actionOption.show=false;
    },
    selectPhoto:function(){
        this.actionPhotoOption.show=false;
    },
    selectPhotoByList:function(){
        this.actionPhotoOption.show=false;
     
    },
    showEmoJiPlane:function(){
        this.emoJiOption.show=true;
    },
    emojiSelect:function(e){
        console.log("select emoji",e);
    },
    sendMes:function(e){

    }
  }
}
</script>


<style>
body,html{
    height: 100%;
    color: #596978;
    font-family: 微软雅黑;


}
.t-wrap{
    height: 100%;
}
.t-actionPlane{
    margin-top: 1em;
    margin-bottom: 1.5em;
    margin-left: 1em;
    height: 100px;
}
.t-actionPlane-tip{
    width:100%; 
    text-align:center;
    font-size: 1em;
}
.actionPhotoOption div{
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #e1e1e1;
}
.actionPhotoOption:last-child{
    margin-top: 10px;
    border-bottom: 0px;
}

.t-inputBody{
    padding-top: 56px;
    padding-bottom: 56px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    background-color:#f4f8fb;
    overflow: scroll;
}

.t-inputPlane{
    position: fixed;
    bottom:0px;
    width: 100%;
    height: 44px;
    z-index: 9;
    border-top: 1px solid #e1e1e1;
    background-color: white;
}

.van-icon-photograph{
    font-size:1em;
}
.t-actionPlane-tip {
    color: #596976;
    font-size: 14px;
    padding-left: 1px;    
}

.t-control-btn{
    height: 44px;
    margin-top: 0.35em;
    margin-left: 0.1em;
    font-size: 1.6em;
    text-align: center;
}

.t-control-send{
    font-size: 1.1em;
    margin-top:0.35em;
}

.t-control-emoji{
    font-size: 1.1em;
    margin-top: 0.44em;
}

.van-icon{
    color:#596976;
}
.t-chat{
    width: 100%;
    min-height: 80px;

}
.t-chat.left >div{
    float:left;
}

.t-chat.right>div{
    float:right;
}

.t-chat::after{
    display: block;
    content: "";
    clear:both;
}

.t-chat-pic{
    margin-left: 1em;
    max-height: 40px;
    border-radius: 100px;
}

.t-chat-content{
    position: relative;
    top: 0px;
    margin-top: 20px;
    padding: 1em;
    margin-bottom: 15px;
    /*background-color: #dd0a20;*/
    border-radius: 25px;
    color: white;
    max-width: 56%;
    
    background: linear-gradient(to bottom right, #ea1e4c , #dd0a20);
}
.t-chat-content.left::after{
    position: absolute;
    content: "";
    top: -3px;
    left: -4px;
    height: 0;
    width: 0;
    border-top: 15px solid transparent;
    border-right: 24px solid #ea1e4c;
    border-bottom: 15px solid transparent;
    transform: rotate(20deg);
    border-radius: 100px;
}
.t-chat-content.left{
    margin-left: 1em;
    box-shadow: -1px 2px 20px -5px #ea1e4c;
}
.t-chat-content.right{
    background: white;
    color: #586A79;
    box-shadow: -1px 2px 20px -5px gray;
}
.t-chat-content.right::after{
    position: absolute;
    content: "";
    top: -3px;
    right: -4px;

    height: 0;
    width: 0;
    border-top: 15px solid transparent;
    border-right: 24px solid white;
    border-bottom: 15px solid transparent;
    transform: rotate(156deg);
    border-radius: 100px;
}


.t-chat-content.img{
    padding: 0.3em;
    border-radius: 10px;
}

.t-chat-content img{
    max-width: 120px;
    border-radius: 10px;
}

.t-chat-pic.right{
    margin-right: 15px;
    margin-left:0.8em;
}

    
.t-emoJiPlane{
    position: fixed;
    bottom:-200px;
    width:100%; 
    height:200px; 
    background-color:white;
    padding-bottom: 46px;
}

.t-emoJiSwipe{
    margin-top:5px; 
    padding:0.4em; 
    height:175px;
}

.t-emoJiSwipeItem{
    overflow-y:scroll;
}
.t-emoJiItem{
    margin-bottom: 10px;
}

.t-emoJiPlane-show{
    bottom:0px;
}

.t-input{
    /*
    min-height: 25px;
    overflow-y: auto;
    max-height:150px; 
    */
    height:25px;
    margin-top:8px; 
    margin-right:10px; 
    margin-left:5px; 
    font-size:14px; 
    outline:none;
    overflow-y:auto;

}
.t-input-line{
    margin-left:5px; 
    border-top:1px solid #596978; 
    height:1px; 
    width:98%;
}
</style>
