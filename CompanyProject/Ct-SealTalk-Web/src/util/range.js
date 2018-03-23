var qqWechatEmotionParser=require('qq-wechat-emotion-parser');

var range=function(targetId){
    var option={
        target:document.getElementById(targetId),
        range:null,
        lastRange:0,
        defaultMes:"请输入信息..."
    };
    this.option=option;
    //this.option.target.focus();
    
    option.target.addEventListener("focusout",function(e){
        var selection = window.getSelection();
        var range=selection.getRangeAt(0);
        var currentDom=e.srcElement;
        option.lastRange=range.endOffset;
        option.range=range;  

        setTimeout(function(){
            var sendMes=currentDom.innerHTML
            
            if(sendMes===""){
                //currentDom.innerHTML=option.defaultMes;
            }  
            console.log(e);
        },1000);

    });

    option.target.addEventListener("click",function(e){
        var currentDom=e.srcElement;
      
        var sendMes=currentDom.innerHTML;
        console.log("sendMes",sendMes);
        if(sendMes===option.defaultMes){
            currentDom.innerHTML="";
        }
        currentDom.focus();
    });


};


range.prototype.insetDom=function(dom){

        var range=this.option.range;
        var target=this.option.target;

        if(range==null){
            range=document.createRange();
            range.setStart(this.option.target,1);
            range.setEnd(this.option.target,1);
            this.option.range=range;
            this.option.target.innerHTML="";
        }

        range.insertNode(dom,range.startContainer); 

        var selection = window.getSelection();
        var insertRange=selection.getRangeAt(0);
        var lastRange=insertRange.endOffset;
        var startRange=insertRange.startOffset;

        if(dom.nodeName!="#text"){
           dom=dom.nextSibling;
        }
        insertRange.setStart(dom,0);
        insertRange.setEnd(dom,0);
        insertRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(insertRange); 
        target.focus();

}

range.prototype.clear=function(){
    this.option.target.innerHTML="";
}

range.prototype.getMes=function(){
    var currentDom=this.option.target;
    var sendMes=currentDom.innerHTML;
    console.log("原始值",sendMes);
    var imgreg=/<img[^>]+>/g;
    var matchArray=sendMes.match(imgreg);
    console.log(matchArray);
    if(matchArray!=null){
        for(var index=0;index<matchArray.length;index++){
            var data_codereg=/data-code=\".*\"/;
            var dataCode=matchArray[index].match(data_codereg)[0];
            var codereg=/\".*\"/;
            var code=dataCode.match(codereg)[0].replace(/\"/g,"");
            sendMes=sendMes.replace(matchArray[index],code);
            console.log(dataCode.match(codereg)[0].replace(/\"/g,""));
        }
    }
    sendMes=sendMes.replace(/&nbsp;/g," ");
    sendMes=sendMes.replace(/<br>/g,"\n");
    sendMes=sendMes.replace(/<[^>]+>/g,"\n");
    console.log(sendMes);
    return sendMes;
    ///<[^>]+>/g
    //console.log(str.match(reg));
    //console.log(reg.test(str));
    //console.log("测试的图片为：",reg);
}
range.prototype.changeMes=function(mesHtml){
    return qqWechatEmotionParser(mesHtml);
}


module.exports=range;