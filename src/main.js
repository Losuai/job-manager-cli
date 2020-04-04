// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

import VueCron from 'vue-cron'
Vue.use(VueCron);//使用方式：<vueCron></vueCron>

import Axios from 'axios'
Vue.prototype.$axios = Axios; 
//设置baseURL
// Axios.defaults.baseURL = 'https://route.showapi.com';
//设置token值    
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//请求头
Axios.defaults.headers.post['Content-Type'] = 'application/json'; 


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
