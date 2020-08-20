import Vue from 'vue'
import App from './App.vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import 'fullpage.js/dist/fullpage.min.css'
// import 'fullpage.js/dist/fullpage.extensions.min.js'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import routes from '@/router'

import '@/styles/index.less' // global css


Vue.use(VueFullPage);
Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'small' });

// Vue.config.productionTip = false
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
