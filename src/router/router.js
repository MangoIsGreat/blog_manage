import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";

// 安装vue-router
Vue.use(VueRouter);

// 定义路由规则：
const routes = [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/index",
    component: index,
  },
];

// 创建路由实例
const router = new VueRouter({
  routes,
});

export default router;
