<template>

<div class="t-wrap">

    <van-nav-bar fixed="true" :title="title" ></van-nav-bar>


    <div class="t-inputBody">


        <div class="t-chat left">
            <div >
                <img src="../assets/testPic.jpg" class="t-chat-pic" />
            </div>
            <div class="t-chat-content left">
                雷猴。
                <i class="em em-heart"></i>
                <i class="em em-gift"></i>
                <i class="em em-bell"></i>                
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
    <div class="t-inputPlane" style="bottom:120px;">
        <van-col span="3"> 
            <div class="t-control-btn"> <van-icon name="add-o" /></div>
        </van-col>
   
        <van-col  span="18">
            <van-cell-group>
            <van-field v-model="value" placeholder="请输入信息..." /></van-cell-group>
        </van-col>

        <van-col span="3"> 
           <div class="t-control-btn t-control-send"> <i class="icon iconfont icon-fasongduilie t-control-btn " /></div>
        </van-col>   

        <div>


            
        </div>
        
        <div style="height:300px;position: relative; top:0px;">



        </div>



    </div>
    <div style="position: fixed;bottom:0px; width:100%; height:300px; background-color:white;">
        <van-swipe style="margin-top:46px; height:300px;" >
            <van-swipe-item>
                <van-col span="2">
                    <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif" alt="/:basketb">
                </van-col>

                <van-col span="2">
                    <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif" alt="/::)">
                </van-col>       



            </van-swipe-item>
            <van-swipe-item>
                <van-col span="2">
                    <i class="em em-heart"></i>
                </van-col> 

            </van-swipe-item>
        </van-swipe>

    </div>



    <van-actionsheet :title="actionOption.title" v-model="actionOption.show">
     <div class="t-actionPlane">
        <van-col  span="3">
            <van-button v-on:click="showPhotoSelect" size="normal"><van-icon name="photograph" /></van-button>
            <div class="t-actionPlane-tip">照片</div> 
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
                <a @click="hidePhotoSelect"> 取消</a>
            </van-row>

        </div>33123333
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







console.log("emoji",emoji);


/*初始化表情*/
function initEmoJi(){
    var emoJiList=[];

    for(var emojiName in emoji.baseCode){
        var type=emoji.baseSource[emojiName].type;
        var emoJiObj={}
        if(type==="js"){
            emoJiObj.html=qqWechatEmotionParser(emoji.baseCode[emojiName]);
            emoJiObj.code=emoji.baseCode[emojiName];
        }else{
            emoJiObj.html="<i class="+emoji.baseSource[emojiName].class+" />";
            emoJiObj.code=emoji.baseCode[emojiName];            
        }
        emoJiList.push(emoJiObj);
    }

    return emoJiList;
}

console.log("表情对象是",initEmoJi());


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
          title:"请选择以下操作"
      },
      actionPhotoOption:{
          show:false     
      },
      actionEmoJiOption:{
          title:"请选择表情",
          show:true
      },
      emoJiData:{
          qq:{},
          emoJi:{}
      }
    }
  },
  methods:{
    showPhotoSelect:function(){
        this.actionOption.show=false;
        this.actionPhotoOption.show=true;
    },
    hidePhotoSelect:function(){
        this.actionPhotoOption.show=false;
    },
    selectPhoto:function(){
        this.actionPhotoOption.show=false;
    },
    selectPhotoByList:function(){
        this.actionPhotoOption.show=false;
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

.t-actionPlane-tip {
    color: #596976;
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



</style>
