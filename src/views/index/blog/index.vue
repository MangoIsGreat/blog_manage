<template>
  <div class="blog-container">
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="博客编号">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.blogId"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者ID">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.author"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select size="small" v-model="formInline.type">
            <div v-for="(item, index) in typeList" :key="index">
              <el-option
                v-if="![10000, 10001].includes(item.tag_type)"
                :label="item.tag_name"
                :value="item.tag_type"
              ></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button size="small" type="primary" @click="getBlogList"
            >搜索</el-button
          >
          <el-button size="small" @click="clear">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="body-card">
      <el-table height="420" :data="tableData" style="width: 100%">
        <el-table-column width="120" prop="id" label="博客ID">
        </el-table-column>
        <el-table-column width="120" prop="title" label="博客名">
        </el-table-column>
        <el-table-column width="120" prop="User.id" label="作者ID">
        </el-table-column>
        <el-table-column width="120" prop="User.nickname" label="作者名">
        </el-table-column>
        <el-table-column width="120" prop="Tag.tagName" label="类型">
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isShow === true">展示</span>
            <span style="color: red" v-else>隐藏</span>
          </template>
        </el-table-column> -->
        <el-table-column width="120" prop="blogLikeNum" label="点赞数">
        </el-table-column>
        <el-table-column width="120" prop="blogReadNum" label="阅读数">
        </el-table-column>
        <el-table-column width="120" prop="commentNum" label="评论数">
        </el-table-column>
        <el-table-column
          width="160"
          :formatter="filterTime"
          prop="created_at"
          label="创建日期"
        >
        </el-table-column>
        <el-table-column width="140" fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="hiddenItem(scope.row)" type="text">{{
              scope.row.isShow === true ? "隐藏" : "展示"
            }}</el-button> -->
            <el-button
              @click="$router.push(`/home/blog/${scope.row.id}`)"
              type="text"
              >编辑</el-button
            >
            <el-button @click="removeItem(scope.row)" type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  blogList,
  typeList,
  blogRemove,
  hiddenRemove,
} from "../../../api/blog";
import dayjs from "dayjs";

export default {
  data() {
    return {
      formInline: {
        blogId: "",
        author: "",
        type: "",
      },
      typeList: [], // 博客类型列表
      tableData: [],
      pageIndex: 1, // 页码
      limit: 5, // 每页数据条数
      pageSizes: [5, 10, 15, 20], // 页容量选项
      total: 0, // 总条数
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        [
          "/",
          "/home",
          "/home/dynamic",
          "/home/blog",
          "/home/news",
          "/home/user",
        ].includes(from.path)
      ) {
        vm.pageIndex = 1;
        vm.formInline = {
          blogId: "",
          author: "",
          type: "",
        };

        vm.getBlogList();

        // // 获取tag类型
        vm.getTypeList();
      }
    });
  },
  created() {
    // 获取列表数据
    this.getBlogList();

    // 获取tag类型
    this.getTypeList();
  },
  methods: {
    filterTime(row) {
      return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
    },
    removeItem(item) {
      this.$confirm(`您确定要删除博客 ${item.title} 吗？`, "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          blogRemove({
            id: item.id,
          }).then((res) => {
            if (res.error_code === 0) {
              this.$message.success("删除成功！");

              this.getBlogList();
            } else {
              this.$message.error(res.msg || "删除失败！");
            }
          });
        })
        .catch(() => {});
    },
    hiddenItem(item) {
      hiddenRemove({
        id: item.id,
      }).then((res) => {
        if (res.error_code !== 0) {
          return this.$message.error("操作失败！");
        }

        if (res.data === 0) {
          this.$message.success(`博客 ${item.title} 已经隐藏！`);

          this.getBlogList();
        } else if (res.data === 1) {
          this.$message.success(`博客 ${item.title} 已经展示！`);

          this.getBlogList();
        }
      });
    },
    // 页码改变
    handleSizeChange(num) {
      this.limit = num;

      this.getBlogList();
    },
    // 页容量改变
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;

      this.getBlogList();
    },
    clear() {
      for (const key in this.formInline) {
        if (Object.hasOwnProperty.call(this.formInline, key)) {
          this.formInline[key] = "";
        }
      }

      this.getBlogList();
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
    getBlogList() {
      blogList({
        pageIndex: this.pageIndex,
        pageSize: this.limit,
        ...this.formInline,
      }).then((res) => {
        if (res.error_code === 0) {
          // 保存表格数据
          this.tableData = res.data.rows;

          // 保存总条数
          this.total = res.data.count;
        } else {
          this.$message.error("博客列表数据获取失败！");
        }
      });
    },
  },
};
</script>

<style lang="less">
.blog-container {
  .head-card {
    .el-form-item__content {
      width: 149px;
    }
    .short-input .el-form-item__content {
      width: 100px;
    }
    .btn-form-item .el-form-item__content {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 0;
      margin-right: 30px;
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .body-card {
    margin-top: 19px;
  }
}
</style>
