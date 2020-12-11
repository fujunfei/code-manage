import Vue from 'vue'
import App from './App.vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import 'fullpage.js/dist/fullpage.min.css'
// import 'fullpage.js/dist/fullpage.extensions.min.js'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import {Table} from 'element-ui-fujf'
import 'element-ui-fujf/lib/theme-chalk/index.css'
import contextmenu from "vue-contextmenujs"

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import VueRouter from 'vue-router'
import routes from '@/router'
import store from '@/store'

import '@/styles/index.less' // global css
// import '@/styles/variables/defaultTheme.css'   改为按需加载
// import '@/styles/variables/greenTheme.css'
// import '@/styles/variables/orangeTheme.css'
// import '@/styles/variables/pinkTheme.css'


Vue.prototype.$echarts = echarts;
Vue.use(VueFullPage);
Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'small' });
Vue.use(Table)
Vue.use(contextmenu)

// Vue.config.productionTip = false
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

