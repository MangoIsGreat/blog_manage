<template>
  <div class="component-wrapper">
    <el-form
      label-suffix=" :"
      size="small"
      ref="form"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="dynamic-content" label="用户ID">{{
            userinfo.id
          }}</el-form-item></el-col
        >
        <el-col :span="14"
          ><el-form-item label="账号">{{
            userinfo.email
          }}</el-form-item></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="dynamic-content" label="昵称">{{
            userinfo.nickname
          }}</el-form-item></el-col
        >
        <el-col :span="14"
          ><el-form-item label="职业">{{
            userinfo.profession
          }}</el-form-item></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="dynamic-content" label="签名">{{
            userinfo.signature
          }}</el-form-item></el-col
        >
        <el-col :span="14"
          ><el-form-item label="文章被阅读">{{
            userinfo.blogReadNum
          }}</el-form-item></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="dynamic-content" label="文章被赞">{{
            userinfo.blogLikeNum
          }}</el-form-item></el-col
        >
        <el-col :span="14"
          ><el-form-item label="粉丝数">{{
            userinfo.fansNum
          }}</el-form-item></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="dynamic-content" label="关注">{{
            userinfo.idolNum
          }}</el-form-item></el-col
        >
        <el-col :span="14"
          ><el-form-item label="状态">
            {{ userinfo.isForbidden ? "封禁" : "启用" }}
          </el-form-item></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getOneUserInfo } from "../../../../api/user";

export default {
  data() {
    return {
      userinfo: {}, // 用户信息
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getOneUserInfo({ id: this.$route.params.uid }).then((res) => {
        if (res.error_code === 0) {
          this.userinfo = res.data;
        } else {
          this.$message.error("动态信息获取失败！");
        }
      });
    },
  },
};
</script>

<style lang="less">
.component-wrapper {
  height: 500px;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  //   border: 1px solid #e4e7ed;
  //   border-top: none;

  .dynamic-content {
    width: 500px;
  }
}
</style>
