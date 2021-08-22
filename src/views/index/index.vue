<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="isCollapse = !isCollapse"></i>
        <h1 class="title">得到</h1>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt="" class="user-icon" />
        <span class="user-name">{{ userInfo.nickname }}，您好</span>
        <el-button @click="logout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/home/blog">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="/home/dynamic">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">动态管理</span>
          </el-menu-item>
          <el-menu-item index="/home/news">
            <i class="el-icon-document"></i>
            <span slot="title">资讯管理</span>
          </el-menu-item>
          <el-menu-item index="/home/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/information">
            <i class="el-icon-bell"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
          <el-menu-item index="/home/data">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from "../../utils/token";

export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    logout() {
      this.$confirm("您确定要退出登录吗？", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeToken();
        this.$store.state.userInfo = {};
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;

  .my-header {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
        cursor: pointer;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-style: 24px;
        color: #5aa9ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .user-icon {
        border-radius: 50%;
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .user-name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: #e8e9ec;
  }
}
</style>
