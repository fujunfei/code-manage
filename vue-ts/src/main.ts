import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import antComponents from './components/ant'

const app =createApp(App).use(store).use(router)
antComponents.forEach(i => app.use(i))


app.mount("#app");
