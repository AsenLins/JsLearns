
var isSupportSocket =(function isSupport(APIName){
	var d = document, w = window;
	var id = "RongCloudCloud-API-Test" + new Date().getTime;
	var iframe = d.getElementById(id);
	if(!iframe){
		iframe = d.createElement("iframe");
		iframe.id = id;
		iframe.style.display = "none";
		d.body.appendChild(iframe);
	}
	var nativeAPI = iframe.contentWindow[APIName];
	var API = w[APIName];
	if(API && nativeAPI.toString() == API.toString()){
		return true;
	}
	return false;
})("WebSocket");


var basePaths={
    "vue":"lib/vue-2.1.4",
    "vant":"ui/vant.min"
};


if(isSupportSocket){
    basePaths["protobuf"]="lib/protobuf-2.2.7.min";
    basePaths["RongIMLib"]="lib/RongIMLib-2.2.7.min";
}else{
    basePaths["RongIMLib"]="lib/RongIMLib-2.2.7.min";
}

require.config({
    baseUrl:"scripts",
    paths:basePaths,
    map: {
        /*
        css:加载requirejs的css插件，该插件可以使requirejs加载css。
        */
        '*': {
          'css':'lib/css.min',
        }
    
    },
    shim:{

        /*
        vant:加载依赖的css.
        */
        "vant":{deps:['css!ui/vant.min.css']},
      }    
    
});




require(['RongIMLib','protobuf','vant'],function(RongIMLib,protobuf,vant){
    
    var appKey="cpj2xarlc74xn";
    var token=document.getElementById("token").value; //"yp9BFwcOG9J4yTZi52vW5HfBXPxCovs0ajbAO4eE0ouyFL19u1TWD4lF4W0GPSDxsSweSCdhr0lv1N0vdIi8DLI8DbqUEQeS";//"2Y869KCAiQEv5kYGBLEYycNVcJirBFljL7M07UlG8TYGGfKZKrGXWMOJBC2f8EbtTMYxsX2VSg8=";
    console.log("当前用户token:",token);
    var RongIMClient = RongIMLib.RongIMClient;
    var config = { };
    if (protobuf) {
        config.protobuf = protobuf;
    }
    //初始化
    RongIMClient.init(appKey,null,{protobuf:protobuf});
    var _instance = RongIMClient.getInstance();

    // 连接状态监听器
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
    
    
    //开始链接
    
    RongIMClient.connect(token, {
        onSuccess: function(userId) {
            console.log("链接成功，用户id：" + userId);
            //sendMessage();
            getConversationList();
        },
        onTokenIncorrect: function() {
            console.log('token无效');
        },
        onError:function(errorCode){
          var info = '';
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
    
    function getConversationList(){
        _instance.getConversationList({
            onSuccess: function(list){
                console.log(JSON.stringify(list, null, '\t'));
            },
            onError:function(errorCode){
                 console.log(errorCode);
            }
        }, null, 2);
    }

    //recMes input_content btn_send
    
    function sendMessage(textMes,targetId,success,fail){
        var msg = new RongIMLib.TextMessage({content:textMes,extra:"附加信息"});
        var conversationtype = RongIMLib.ConversationType.PRIVATE;
        var targetId = targetId; //"tester";
        _instance.sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {
                
                    console.log(message);
                    console.log(JSON.stringify(message, null, '\t'));
                    if(success!=null){
                        success.apply(this,arguments);
                    }
                },
                onError: function (errorCode,message) {
                    console.log(errorCode);
                    if(fail!=null){
                        fail.apply(this.arguments);
                    }
                }
        });
    } 


    document.getElementById("btn_send").addEventListener("click",function(){
        var text=document.getElementById("input_content").value;
        var targetId=document.getElementById("targetId").value;
        sendMessage(text,targetId,function(message){
            console.log("发送的信息是："+message);
        },function(){

        })
    });

});

