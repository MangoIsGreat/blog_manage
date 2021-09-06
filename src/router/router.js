import Vue from "vue";
import VueRouter from "vue-router";
const login = () => import("../views/login/login.vue");
const index = () => import("../views/index/index.vue");
const blog = () => import("../views/index/blog/index.vue");
const dynamic = () => import("../views/index/dynamic/index.vue");
const news = () => import("../views/index/news/index.vue");
const user = () => import("../views/index/user/index.vue");
const bloginfo = () => import("../views/index/bloginfo/index.vue");
const dynamicinfo = () => import("../views/index/dynamicinfo/index.vue");
const newsinfo = () => import("../views/index/newsinfo/index.vue");
const userinfo = () => import("../views/index/userinfo/index.vue");
import { getToken, removeToken } from "../utils/token";
import { Message } from "element-ui";
import { userInfo } from "../api/user";
import store from "../store/store";

// 安装vue-router
Vue.use(VueRouter);

// 定义路由规则：
const routes = [
  {
    path: "/",
    component: login,
  },
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
        meta: {
          keepAlive: true, //代表需要缓存
        },
      },
      {
        path: "blog/:blogid",
        component: bloginfo,
      },
      {
        path: "dynamic",
        component: dynamic,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "dynamic/:dynId",
        component: dynamicinfo,
      },
      {
        path: "news",
        component: news,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "news/:newsId",
        component: newsinfo,
      },
      {
        path: "user",
        component: user,
        meta: {
          keepAlive: true,
        },
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
  mode:"history",
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
