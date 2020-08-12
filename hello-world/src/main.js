import Vue from 'vue'
import App from './App.vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'


Vue.use(VueFullPage);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
