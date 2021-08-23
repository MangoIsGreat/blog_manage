<template>
  <div class="dynamic-info-wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="编辑" name="edit"><edit /></el-tab-pane>
      <el-tab-pane label="评论" name="comment"><comment /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from "./components/Edit.vue";
import comment from "./components/Comment.vue";

export default {
  data() {
    return {
      activeName: "edit",
    };
  },
  components: {
    edit,
    comment,
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
