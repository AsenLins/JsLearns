/*
import Vue from 'vue';
import Vant from 'vant';
import Button from 'vant/lib/button';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/button.css';
//import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
alert("?");
*/



import Vue from 'vue';
import talkApp from "./../index.vue";

Vue.use(Button);

new Vue({
    el:"talkApp",
    render: h => h(talkApp)
});