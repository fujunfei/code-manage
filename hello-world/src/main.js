import Vue from 'vue'
import App from './App.vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import 'fullpage.js/dist/fullpage.min.css'
// import 'fullpage.js/dist/fullpage.extensions.min.js'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'

import '@/styles/index.less' // global css


Vue.use(VueFullPage);

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
