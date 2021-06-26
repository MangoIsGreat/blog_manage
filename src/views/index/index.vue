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
        <span class="user-name">{{userInfo.username}}，您好</span>
        <el-button type="primary" size="small">退出</el-button>
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
import { getToken, removeToken } from "../../utils/token";
import { userInfo } from "../../api/user";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      userInfo: {},
    };
  },
  beforeCreate() {
    if (!getToken()) {
      this.$message.error("你还没有登陆！");
    //   this.$router.push("/login");
    }
  },
  created() {
    userInfo().then((res) => {
      if (res.data.code === 200) {
        res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
        this.userInfo = res.data.data;
      } else if (res.data.code === 206) {
        this.$message.warning("token信息验证失败！");
        removeToken();
        // this.$router.push("/login");
      }
    });
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;

  .my-header {
    // background-color: skyblue;
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
    // background-color: green;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: purple;
  }
}
</style>
