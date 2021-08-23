import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import blog from "../views/index/blog/index.vue";
import dynamic from "../views/index/dynamic/index.vue";
import news from "../views/index/news/index.vue";
import user from "../views/index/user/index.vue";
import bloginfo from "../views/index/bloginfo/index.vue";
import dynamicinfo from "../views/index/dynamicinfo/index.vue";
import newsinfo from "../views/index/newsinfo/index.vue";
import userinfo from "../views/index/userinfo/index.vue";
import { getToken, removeToken } from "../utils/token";
import { Message } from "element-ui";
import { userInfo } from "../api/user";
import store from "../store/store";

// 安装vue-router
Vue.use(VueRouter);

// 定义路由规则：
const routes = [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home",
    component: index,
    children: [
      {
        path: "blog",
        component: blog,
      },
      {
        path: "blog/:blogid",
        component: bloginfo,
      },
      {
        path: "dynamic",
        component: dynamic,
      },
      {
        path: "dynamic/:dynId",
        component: dynamicinfo,
      },
      {
        path: "news",
        component: news,
      },
      {
        path: "news/:newsId",
        component: newsinfo,
      },
      {
        path: "user",
        component: user,
      },
      {
        path: "user/:uid",
        component: userinfo,
      },
    ],
  },
];

// 创建路由实例
const router = new VueRouter({
  routes,
});

// 创建路由白名单数组
const whitePaths = ["/login"];

router.beforeEach((to, from, next) => {
  if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
    // 必须要登录才能访问
    if (!getToken()) {
      Message.error("您还未登录，请先登录！");
      next("/login");
    } else {
      userInfo().then((res) => {
        if (res.error_code === 0) {
          // 将用户数据保存到仓库
          store.commit("changeUserInfo", res.data);
          next();
        } else {
          Message.warning("认证失败！");
          removeToken();
          next("/login");
        }
      });
    }
  } else {
    next();
  }
});

export default router;
