<template>
  <div class="blog-info-wrapper">
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <el-form-item class="blog_name" label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select size="small" v-model="form.type">
          <div v-for="(item, index) in typeList" :key="index">
            <el-option
              v-if="![20000].includes(item.tag_type)"
              :label="item.tag_name"
              :value="item.tag_type"
            ></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item class="blog_name" label="内容">
        <mavon-editor
          style="width: 1160px; height: 420px"
          ref="md"
          @imgAdd="$imgAdd"
          :boxShadow="false"
          @change="input"
          @save="input"
          class="writing-wrapper-body-editor"
          :ishljs="true"
          v-model="handbook"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { typeList, getOneNews, uploadNewsImg, updateNews } from "../../../api/news";

export default {
  name: "bloginfo",
  data() {
    return {
      form: {
        title: "",
        type: 0,
      },
      typeList: [], // 文章类型
      handbook: "",
      mdValue: "", // mavon-editor输入的内容
      rMdValue: "", // mavon-editor输入的内容解析后
      writeContent: "", // 使用正则过滤掉标签之后的文本
    };
  },
  created() {
    // 获取tag类型
    this.getTypeList();

    // 获取博客信息
    this.getNewsInfo();
  },
  methods: {
    onSubmit() {
      updateNews({
        id: this.$route.params.newsId,
        title: this.form.title,
        content: this.handbook,
        description: this.writeContent,
        tag: this.form.type,
      }).then((res) => {
        if (res.error_code === 0) {
          this.$message.success("更新博客成功！");

          this.$router.go(-1);
        } else {
          this.$message.error("更新博客失败！");
        }
      });
    },
    getTypeList() {
      typeList().then((res) => {
        if (res.error_code === 0) {
          this.typeList = res.data.rows;
        } else {
          this.$message.error("博客类型数据获取失败！");
        }
      });
    },
    getNewsInfo() {
      getOneNews({ newsId: this.$route.params.newsId }).then((res) => {
        if (res.error_code === 0) {
          this.form.title = res.data.title;
          this.form.type = res.data.NewsType.tagType;
          this.handbook = res.data.content;
        } else {
          this.$message.error("资讯详情获取失败！");
        }
      });
    },
    input(value, render) {
      this.mdValue = value;
      this.rMdValue = render;
      //   过滤解析字符串中的标签;
      const reg = /<\/?.+?\/?>/g; // 过滤的正则
      const content = render.replace(reg, ""); // 使用正则替换
      this.writeContent = content.substr(0, 100);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formData = new FormData();
      formData.append("file", $file);
      formData.append("type", "content");
      uploadNewsImg({ formData }).then((res) => {
        if (res.error_code === 0) {
          this.$refs.md.$imglst2Url([[pos, res.url]]);
        } else {
          this.$message.error("上传失败!");
        }
      });
    },
  },
};
</script>

<style lang="less">
.blog-info-wrapper {
  padding: 30px 50px 30px 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;

  .blog_name {
    width: 400px;
  }
}
</style>
