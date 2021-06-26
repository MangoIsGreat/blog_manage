import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import chart from "../views/index/chart/index.vue";
import enterprise from "../views/index/enterprise/index.vue";
import question from "../views/index/question/index.vue";
import subject from "../views/index/subject/index.vue";
import user from "../views/index/user/index.vue";

import { getToken } from "../utils/token";

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

router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    if (!getToken()) {
      window.alert("请先登录！");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
