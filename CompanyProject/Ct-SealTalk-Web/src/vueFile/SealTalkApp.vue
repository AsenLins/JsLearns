<template>

<div class="t-wrap">
    <van-nav-bar fixed="true" :title="title" ></van-nav-bar>
    <div class="t-inputBody">
        <div class="t-chat text">
            <van-col span="3">
                <img src="../assets/testPic.jpg" class="t-chat-pic" />
            </van-col>
            <van-col offset="1" class="t-chat-content" span="16">
                你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐你好，Amy姐姐
            </van-col>
        </div>

    </div>
    <div class="t-inputPlane">
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

        </div>
    </van-actionsheet>

</div>
</template>

<script>

import { NavBar,Actionsheet,Icon,Loading,ImagePreview,Row,Col,Button,Popup,Field,Toast} from 'vant';

import "../assets/css/font/iconfont.css";
Toast('不可发送空消息....');

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
    [Toast.name]:Toast
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
    background-color: #f4f8fb;
  
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

.t-chat-pic{
    margin-left: 1em;
    max-height: 40px;
    border-radius: 100px;
}
.t-chat-content{
    margin-top: 20px;
    padding: 1em;
    background-color: #dd0a20;
    border-radius: 25px;
    color: white;
}

</style>
