import Vue from 'vue'
import template from './template.vue'
import App from './Home.vue'

new Vue({
    el:'#myTemplate',
    render:h=>  h(template)
});
new Vue({
  el: '#myApp',
  render: h => h(App)
})