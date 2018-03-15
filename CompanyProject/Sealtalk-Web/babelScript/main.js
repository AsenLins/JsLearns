

var isSupportSocket = function isSupport(APIName) {
    var d = document,
        w = window;
    var id = "RongCloudCloud-API-Test" + new Date().getTime;
    var iframe = d.getElementById(id);
    if (!iframe) {
        iframe = d.createElement("iframe");
        iframe.id = id;
        iframe.style.display = "none";
        d.body.appendChild(iframe);
    }
    var nativeAPI = iframe.contentWindow[APIName];
    var API = w[APIName];
    if (API && nativeAPI.toString() == API.toString()) {
        return true;
    }
    return false;
}("WebSocket");

var basePaths = {
    "vue": "lib/vue-2.1.4",
    "vant": "ui/vant.min",
    "upload": "lib/upload"
};

if (isSupportSocket) {
    basePaths["protobuf"] = "lib/protobuf-2.2.7.min";
    basePaths["RongIMLib"] = "lib/RongIMLib-2.2.7.min";
} else {
    basePaths["RongIMLib"] = "lib/RongIMLib-2.2.7.min";
}

require.config({
    baseUrl: "scripts",
    paths: basePaths,
    map: {
        /*
        css:加载requirejs的css插件，该插件可以使requirejs加载css。
        */
        '*': {
            'css': 'lib/css.min'
        }

    },
    shim: {
        /*上次组件*/
        'upload': {
            exports: 'upload'
        },
        /*
        vant:加载依赖的css.
        */
        "vant": { deps: ['css!ui/vant.min.css'] }
    }

});

require(['RongIMLib', 'protobuf', 'vant', 'upload'], function (RongIMLib, protobuf, vant, upload) {

    var appKey = "cpj2xarlc74xn";
    var token = document.getElementById("token").value; //"yp9BFwcOG9J4yTZi52vW5HfBXPxCovs0ajbAO4eE0ouyFL19u1TWD4lF4W0GPSDxsSweSCdhr0lv1N0vdIi8DLI8DbqUEQeS";//"2Y869KCAiQEv5kYGBLEYycNVcJirBFljL7M07UlG8TYGGfKZKrGXWMOJBC2f8EbtTMYxsX2VSg8=";
    console.log("当前用户token:", token);
    var RongIMClient = RongIMLib.RongIMClient;
    var config = {};
    if (protobuf) {
        config.protobuf = protobuf;
    }
    //初始化
    RongIMClient.init(appKey, null, { protobuf: protobuf });
    var _instance = RongIMClient.getInstance();

    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            console.info(status);
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
            switch (message.messageType) {
                case RongIMClient.MessageType.TextMessage:
                    var hasHtml = document.getElementById("recMes").innerHTML;
                    document.getElementById("recMes").innerHTML = hasHtml + "<div>" + message.content.content + "</div>";
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
        onSuccess: function (userId) {
            console.log("链接成功，用户id：" + userId);
            //sendMessage();
            getConversationList();
        },
        onTokenIncorrect: function () {
            console.log('token无效');
        },
        onError: function (errorCode) {
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

    function getConversationList() {
        _instance.getConversationList({
            onSuccess: function (list) {
                console.log(JSON.stringify(list, null, '\t'));
            },
            onError: function (errorCode) {
                console.log(errorCode);
            }
        }, null, 2);
    }

    //recMes input_content btn_send

    function sendMessage(textMes, targetId, success, fail) {
        var msg = new RongIMLib.TextMessage({ content: textMes, extra: "附加信息" });
        var conversationtype = RongIMLib.ConversationType.PRIVATE;
        var targetId = targetId; //"tester";
        _instance.sendMessage(conversationtype, targetId, msg, {
            onSuccess: function (message) {

                console.log(message);
                console.log(JSON.stringify(message, null, '\t'));
                if (success != null) {
                    success.apply(this, arguments);
                }
            },
            onError: function (errorCode, message) {
                console.log(errorCode);
                if (fail != null) {
                    fail.apply(this.arguments);
                }
            }
        });
    }

    function sendImageMessage(targetId, success, fail) {
        /*
        文档：http://www.rongcloud.cn/docs/api/js/ImageMessage.html
              需自行解决文件上传
        上传插件（含获取缩略图方法）: https://github.com/rongcloud/rongcloud-web-im-upload
        
        缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K
        压缩：https://github.com/rongcloud/rongcloud-web-im-upload/blob/master/resize.html
        */

        var content = {
            imageUri: "http://rongcloud.cn/images/newVersion/log_wx.png",
            content: getBase64Image()
        };

        var msg = new RongIMLib.ImageMessage(content);
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var start = new Date().getTime();
        _instance.sendMessage(conversationType, targetId, msg, {
            onSuccess: function (message) {
                //markMessage(message);
                if (success != null) {
                    success.apply(this, message);
                }
                console.log("发送图片消息 成功", message, start);
            },
            onError: function (errorCode, message) {
                console.log("发送图片消息 失败", message, start);
                if (error != null) {
                    error.apply(this, success);
                }
            }
        });
    }

    //获取base64假数据方法
    function getBase64Image() {
        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;

        var context = canvas.getContext("2d");
        context.font = "20pt Arial";
        context.fillStyle = "blue";
        context.fillText("RongCloud.cn", 10, 20);
        var content = canvas.toDataURL("image/jpeg");
        content = content.replace("data:image/jpeg;base64,", "");
        return content;
    }

    document.getElementById("btn_send").addEventListener("click", function () {
        var text = document.getElementById("input_content").value;
        var targetId = document.getElementById("targetId").value;
        sendMessage(text, targetId, function (message) {
            console.log("发送的信息是：" + message);
        }, function () {});
    });

    document.getElementById("btn_sendImage").addEventListener("click", function () {
        document.getElementById("imgfiles").click();
    });

    document.getElementById("imgfiles").addEventListener("change", function () {
        console.log("file Select is Change");
        var uploadFile = document.getElementById("imgfiles").files[0];
        ImgToBase64(uploadFile, 400, function (base) {
            var privewimg = document.getElementById("imgPriview");
            console.log(privewimg);
            privewimg.setAttribute("src", base);

            console.log("上传的base是", base);
            var targetId = document.getElementById("targetId").value;
            sendImageMessage(targetId, function (message) {
                console.log("图片发送成功");
            }, function (message) {});
        });

        /*
        var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = document.getElementById("imgfiles").files[0]; //$("#imgfiles")[0].files[0];
        var imgUrlBase64;
        
        console.log("上传的图片是：",file);
        if (file) {
            //将文件以Data URL形式读入页面  
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
              //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
              if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                    alert( '上传失败，请上传不大于2M的图片！');
                    return;
                }else{
                    //执行上传操作
                    alert(reader.result);
                }
            }
         }   
         */
    });

    function ImgToBase64(file, maxLen, callBack) {
        var img = new Image();

        var reader = new FileReader(); //读取客户端上的文件
        reader.onload = function () {
            var url = reader.result; //读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
            img.src = url; //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
        };
        img.onload = function () {
            //生成比例
            var width = img.width,
                height = img.height;
            //计算缩放比例
            var rate = 1;
            if (width >= height) {
                if (width > maxLen) {
                    rate = maxLen / width;
                }
            } else {
                if (height > maxLen) {
                    rate = maxLen / height;
                }
            };
            img.width = width * rate;
            img.height = height * rate;
            //生成canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var base64 = canvas.toDataURL('image/jpeg', 0.9);
            callBack.call(this, base64);
            //callBack(base64);
        };
        reader.readAsDataURL(file);
    }
});