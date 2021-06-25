<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold icon"></i>
        <img src="../../assets/index_logo.png" alt="" class="logo" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img src="../../assets/classflower.jpg" alt="" class="user-icon" />
        <span class="user-name">李达，您好</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
};
</script>

<style lang="less">
.index-container {
  height: 100%;

  .my-header {
    background-color: skyblue;
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
    background-color: green;
  }
  .my-main {
    background-color: purple;
  }
}
</style>
