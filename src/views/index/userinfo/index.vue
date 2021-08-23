<template>
  <div class="dynamic-info-wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="账号信息" name="userinfo"><userinfo /></el-tab-pane>
      <el-tab-pane label="关注" name="attention"><attention /></el-tab-pane>
      <el-tab-pane label="粉丝" name="fans"><fans /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userinfo from "./components/User.vue";
import attention from "./components/Attention.vue";
import fans from "./components/Fans.vue";

export default {
  data() {
    return {
      activeName: "userinfo",
    };
  },
  components: {
    userinfo,
    attention,
    fans,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less">
.dynamic-info-wrapper {
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
}
</style>
