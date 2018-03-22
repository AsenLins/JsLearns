<template>

<div class="t-wrap">

    <form id="postForm" method="post"></form>

    <van-nav-bar fixed="true" :title="title" ></van-nav-bar>

    <div class="t-inputBody" id="t-inputBody" @click="closeEmoJiPlane">

            
            <div v-for="item in chat.mesBody" :key="item.mesId" class="t-chat left" :class="[item.class]"  >
                <div>
                    <img src="../assets/testPic.jpg" class="t-chat-pic" :class="[item.class]"  />
                </div>
                <div class="t-chat-content" :class="[item.class]"  >
                    <template v-if="item.mesType=='text'">
                        {{item.content}}
                    </template> 
                    <template v-if="item.mesType=='image'">
                        <img @click="privewImg" :src="item.file" />
                    </template>             
                    <template v-if="item.mesType=='unknow'">
                        未识别的消息类型
                    </template>
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
           <div @click="sendMes" class="t-control-btn t-control-send"> <i class="icon iconfont icon-fasongduilie t-control-btn " /></div>
        </van-col>   
    </div>



    <div class="t-emoJiPlane " :class="{'t-emoJiPlane-show':emoJiOption.show}" >
        <van-swipe class="t-emoJiSwipe">
            <!--
            <van-swipe-item class="t-emoJiSwipeItem">
                <van-col span="3" :key="emoJiItem.code" v-for="emoJiItem in emoJiOption.emoJiData.emoJiList" >
                  
                    <div @click="emojiSelect" class="t-emoJiItem" :data-code="emoJiItem.code" v-html="emoJiItem.html"></div>
                </van-col>
             
            </van-swipe-item>
            -->
            <van-swipe-item class="t-emoJiSwipeItem" >
        
                <van-col span="3" :key="emoJiItem.code" v-for="emoJiItem in emoJiOption.emoJiData.emoJiQQList" >
                    <div @click="emojiSelect" class="t-emoJiItem" :data-html="emoJiItem.html" :data-code="emoJiItem.code" v-html="emoJiItem.html"></div>
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
    <input id="photo_camera" type="file" name="file"  capture="camera" hidden />
    <input id="photo_list" type="file" name="file" accept="image/*"  hidden />
</div>
</template>


<script>

/*引入页面需要的样式以及vant组件*/
import {NavBar,Actionsheet,Icon,Loading,ImagePreview,Row,Col,Button,Popup,Field,Toast,Swipe,SwipeItem} from 'vant';
import "../assets/css/font/iconfont.css";
import "../../node_modules/emoji-awesome/dist/css/emojione.min.css";

/*引入表情需要用到的js*/
var qqWechatEmotionParser=require('qq-wechat-emotion-parser');


/*页面业务代码块*/
var sealTalkApi=require("../util/sealTalkApi");
var range=require("../util/range");
var emoji=require('../util/emoji');
var RongIMLib=require("../util/RongIMLib-2.2.7.min");
var protobuf=require("../util/protobuf-2.2.7.min");





function ready(vueObj){
    vueObj.loading.message="连接服务中";

    var appKey="kj7swf8ok1g32";
    var RongIMClient = RongIMLib.RongIMClient;
    var config = { };
    if (protobuf) {
        config.protobuf = protobuf;
    }
    //初始化
    RongIMClient.init(appKey,null,{protobuf:protobuf});
    var _instance = RongIMClient.getInstance();
    vueObj.rong._instance=_instance;
    vueObj.rong.RongIMClient=RongIMClient;


    sealTalkApi.getToken("U",vueObj.chat.userId,function(data){
    var token=data.Result;

    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            console.info(status)   
            switch (status) {
                case RongIMLib.ConnectionStatus.CONNECTED:
                     console.log("链接成功");
                    break;
                case RongIMLib.ConnectionStatus.CONNECTING:
                    console.log('正在链接');
                    break;
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    console.log('断开连接');
                   
                    break;
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    console.log('其他设备登录');
                    break;
                  case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                    console.log('域名不正确');
                    break;
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    console.log('网络不可用');
                    break;
                }

        }
    });
    
    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            // 判断消息类型
            // showTips("新消息，类型为：" + message.messageType);
            // showResult("新消息",message,start);
            console.log(message);
            switch(message.messageType){
                case RongIMClient.MessageType.TextMessage:
                    var hasHtml=document.getElementById("recMes").innerHTML;
                    document.getElementById("recMes").innerHTML=hasHtml+"<div>"+
                    message.content.content+"</div>";
                    /*
                    显示消息方法： 
                    消息里是 原生emoji
                    RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
                    */
                    break;
                case RongIMClient.MessageType.VoiceMessage:
                    // 对声音进行预加载                
                    // message.content.content 格式为 AMR 格式的 base64 码
                    break;
                case RongIMClient.MessageType.ImageMessage:
                   // message.content.content => 图片缩略图 base64。
                   // message.content.imageUri => 原图 URL。
                   break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                   // message.content.extension => 讨论组中的人员。
                   break;
                case RongIMClient.MessageType.LocationMessage:
                   // message.content.latiude => 纬度。
                   // message.content.longitude => 经度。
                   // message.content.content => 位置图片 base64。
                   break;
                case RongIMClient.MessageType.RichContentMessage:
                   // message.content.content => 文本消息内容。
                   // message.content.imageUri => 图片 base64。
                   // message.content.url => 原图 URL。
                   break;
                case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.CommandMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.UnknownMessage:
                    // do something...
                   break;
                default:
                    // do something...
            }
        }
    });


    RongIMClient.connect(token, {
        onSuccess: function(userId) {
             Toast.clear();
            console.log("链接成功，用户id：" + userId);
            //sendMessage();
            //getConversationList();
        },
        onTokenIncorrect: function() {
            console.log('token无效');
              Toast.clear();
        },
        onError:function(errorCode){
          var info = '';
          Toast.clear();
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = 'appkey不正确';
              break;
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
          }
          console.log(info);
        }
    });



    });




}

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
          emoJiData:emoji.init(),
          show:false
      },
      chat:{
          send:[],
          rec:[],
          privewImg:[],
          inputRange:null,
          userId:"",
          targetId:"",
          mesBody:[]
      },
     rong:{
         _instance:null,
         RongIMClient:null
     },
    loading:null
    }
  },
  created:function(){

    this.loading=Toast.loading({
        mask: true,
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '加载中'
    });



  },
  mounted:function(){


    this.$nextTick(function () {
      /*初始化输入框*/
      this.chat.inputRange=new range("t-input");
         
      /*注册用户UI到中原集团，用于调用集团融云api */
      var vueObj=this;
      sealTalkApi.register("asenlins",function(data){
          console.log("UserId",data.Result);
          vueObj.chat.userId=data.Result;
          vueObj.loading.message="注册用户信息";
          if(vueObj.chat.userId!==""&&vueObj.chat.targetId!=""){
                ready(vueObj);
          }
      });

      sealTalkApi.register("1708587",function(data){
          console.log("UserId",data.Result);
          vueObj.chat.targetId=data.Result;
          vueObj.loading.message="获取联系人";
          if(vueObj.chat.userId!==""&&vueObj.chat.targetId!=""){
               ready(vueObj);

          }          
      });
    });

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
        document.getElementById("photo_camera").click();
    },
    selectPhotoByList:function(){
        this.actionPhotoOption.show=false;
        document.getElementById("photo_list").click();
    },
    showEmoJiPlane:function(){
        if(this.emoJiOption.show==true){
            this.emoJiOption.show=false;
        }else{
            this.emoJiOption.show=true;
        }
        
    },
    closeEmoJiPlane:function(){
        this.emoJiOption.show=false;
    },
    emojiSelect:function(e){

        if(e.srcElement.nodeName!="IMG"){
            return;
        }
        var currentDom=e.srcElement;
        var parent=currentDom.parentNode;
   
        var img=document.createElement("img");
        img.src=currentDom.src;
        img.setAttribute("data-code",parent.dataset.code);
        this.chat.inputRange.insetDom(img);
        console.log("select emoji",parent.dataset.code);

    },
    sendMes:function(e){
        console.log(this.chat);
        var sendMes=this.chat.inputRange.getMes();
        var msg = new RongIMLib.TextMessage({content:sendMes,extra:"附加信息"});
        var conversationtype = RongIMLib.ConversationType.PRIVATE;
        var userId=this.chat.userId;
        var targetId = this.chat.targetId; //targetId; //"tester";
        console.log(targetId);
        var _instance=this.rong._instance;
        _instance.sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {

                    console.log(message);
                    console.log(JSON.stringify(message, null, '\t'));
                    sealTalkApi.sendMes(userId,"1708587","text",sendMes,function(data){
                        console.log("调用集团api返回的是",data);
                    });
                },
                onError: function (errorCode,message) {
                    console.log(errorCode);

                }
        });


            /*
             {
                mesId:"1",
                content:"这是一条测试信息",
                mesType:"text",
                mesIsRec:false,
                time:"",
                userPic:"",
                class:"left"
             },
             {
                mesId:"1",
                content:"这是一条测试信息",
                mesType:"image",
                mesIsRec:false,
                time:"",
                file:"../assets/testPic.jpg",
                userPic:"",
                class:"right"
             }
             */


    },
    privewImg:function(e){
        var currentDom=e.srcElement;
        ImagePreview([
            currentDom.src
        ]);
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
    border-radius: 5px;
    padding: 3px;

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
    margin-top: 3px;
    margin-left:3px;
    margin-right: 3px;
    border-radius: 2px;
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
