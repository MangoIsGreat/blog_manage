import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/base.css";

// 安装ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router, // 将路由实例挂载到vue对象上
  render: h => h(App)
}).$mount('#app')
