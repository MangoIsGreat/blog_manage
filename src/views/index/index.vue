<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/index_logo.png" alt="" class="logo" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt="" class="user-icon" />
        <span class="user-name"
          >{{ userInfo.username }}，您好</span
        >
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
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
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
import { userLogout } from "../../api/user";
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
      this.$confirm("你真的要离开我这个网站吗？", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        userLogout().then((res) => {
          if (res.data.code === 200) {
            removeToken();
            this.$store.state.userInfo = {};
            this.$router.push("/login");
          }
        });
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
    background-color: #E8E9EC;
  }
}
</style>
