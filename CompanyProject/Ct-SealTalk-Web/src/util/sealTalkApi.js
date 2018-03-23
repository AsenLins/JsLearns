
/*引用jquery*/
var $form=require("../util/jquery.form.min");
var $=require("expose-loader?$!jquery");


/*注册用户到集团融云api*/
function register(key,fn){
    $("#postForm").ajaxSubmit({
        url:"http://mobileapi.centanet.com/passport/json/reply/InsertHKUserInfoRequest",
        type:"post",
        data:{"ProviderKey":key},
        success:function(data){
            console.log("调用注册返回：",data);
            if(fn!=null){
                fn.call(this,data);
            }
        },
        error:function(){
            console.log("出错了");
        }
    });
}

function getToken(UserType,UserNo,fn){
    $("#postForm").ajaxSubmit({
        url:"http://10.58.8.232/bizcommon/853/json/reply/RCTokenRequest",
        type:"post",
        data:{"UserType":UserType,"UserNo":UserNo},
        success:function(data){
            console.log('调用token返回:',data);
            if(fn!=null){
                fn.call(this,data);
            }
        },
        error:function(){
            console.log("出错了");
        }
    });

    
}

function sendMes(sender,target,msgType,MsgContent,ExtensionName,fn){

    var param={
        CityCode:"853",
        AppName:"sealTalkWeb-Test",
        TargetValue:"u_"+sender,
        RcSender:"u_"+sender,
        RcReceiver:"s_853_"+target,
        msgType:msgType,
        MsgContent:MsgContent,
        SendToRc:"YES",
        ExtensionName:ExtensionName
    }
    var paramStr=JSON.stringify(param);
    //console.log(paramStr);
    //console.log($("#postForm").ajaxSubmit);
    //$.support.cors = true;
    /*
    $.ajax({
        url:"http://localhost:8002/api/CentalineMes/SendMessToCentaline",
        //url:"http://10.58.8.232/bizcommon/853/json/reply/MessageRecordRequest",
        type:"post",
        data:param,
        success:function(data){
            console.log('调用发送信息返回:',data);
            if(fn!=null){
                fn.call(this,data);
            }
        },
        error:function(){
            console.log("出错了");
        }
    });*/

    /*集团服务器不支持application/json的跨域请求，只能通过代理服务器请求。*/
    $("#postForm").ajaxSubmit({
        //url:"http://localhost:8002/api/CentalineMes/SendMessToCentaline",
        url:"http://10.68.2.9:/Centaline-SealTalkSever/api/CentalineMes/SendMessToCentaline",
        type:"post",
        data:param,
        success:function(data){
            console.log('调用发送信息返回:',data);
            if(fn!=null){
                fn.call(this,data);
            }
        },
        error:function(){
            console.log("出错了");
        }
    });   

    /*
    $("#postForm").ajaxSubmit({

        url:"http://10.58.8.232/bizcommon/853/json/reply/MessageRecordRequest",
        type:"post",
        data:paramStr,
        headers:{
            "Content-Type":"application/json",
            "Accept-Encoding":"gzip, deflate"
        },
        processData:false,
        success:function(data){
            console.log('调用发送信息返回:',data);
            if(fn!=null){
                fn.call(this,data);
            }
        },
        error:function(){
            console.log("出错了");
        }
    });
    */
    
}



module.exports={
    register:register,
    getToken:getToken,
    sendMes:sendMes
}