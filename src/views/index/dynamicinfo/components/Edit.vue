<template>
  <div class="component-wrapper">
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <el-form-item class="dynamic-content" label="标题">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="form.content"
          resize="none"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select size="small" v-model="form.theme">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.themeName"
            :value="item.themeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateDynamic">修改</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { typeList, getOneDynamic, updateDyn } from "../../../../api/dynamic";

export default {
  data() {
    return {
      typeList: [], // 动态类型列表
      form: {
        theme: "",
        content: "", // 标题
      },
    };
  },
  created() {
    // 获取tag类型
    this.getTypeList();

    // 获取动态信息
    this.getDynamic();
  },
  methods: {
    getTypeList() {
      typeList().then((res) => {
        if (res.error_code === 0) {
          this.typeList = res.data;
        } else {
          this.$message.error("博客类型数据获取失败！");
        }
      });
    },
    getDynamic() {
      getOneDynamic({ id: this.$route.params.dynId }).then((res) => {
        if (res.error_code === 0) {
          this.form.theme = res.data.theme;
          this.form.content = res.data.content;
        } else {
          this.$message.error("动态信息获取失败！");
        }
      });
    },
    updateDynamic() {
      updateDyn({ id: this.$route.params.dynId, ...this.form }).then((res) => {
        if (res.error_code === 0) {
          this.$message.success("修改成功！");

          this.$router.go(-1);
        } else {
          this.$message.error("修改失败!");
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
