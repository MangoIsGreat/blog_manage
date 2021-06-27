import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import chart from "../views/index/chart/index.vue";
import enterprise from "../views/index/enterprise/index.vue";
import question from "../views/index/question/index.vue";
import subject from "../views/index/subject/index.vue";
import user from "../views/index/user/index.vue";

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
    path: "/index",
    component: index,
    children: [
      {
        path: "subject",
        component: subject,
      },
      {
        path: "chart",
        component: chart,
      },
      {
        path: "enterprise",
        component: enterprise,
      },
      {
        path: "question",
        component: question,
      },
      {
        path: "user",
        component: user,
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
      Message.error("你还未登录，请先登录！");
      next("/login");
    } else {
      userInfo().then((res) => {
        if (res.data.code === 200) {
          res.data.data.avatar =
            process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
          // 将用户数据保存到仓库
          store.commit("changeUserInfo", res.data.data);
          next();
        } else if (res.data.code === 206) {
          Message.warning("token认证失败！");
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
