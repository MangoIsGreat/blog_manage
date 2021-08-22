<template>
  <div class="blog-container">
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="博客编号">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.rid"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客名称">
          <el-input size="small" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select size="small" v-model="formInline.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button size="small" type="primary" @click="getBlogList"
            >搜索</el-button
          >
          <el-button size="small" @click="clear">清除</el-button>
          <el-button
            size="small"
            @click="addFormVisible = true"
            type="primary"
            icon="el-icon-plus"
            >发表博客</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%">
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
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
            <el-button @click="removeItem" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加学科对话框 -->
    <addDialog />
    <!-- 编辑学科对话框 -->
    <editDialog ref="editDialog" />
  </div>
</template>

<script>
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
import { blogList, subjectRemove, subjectStatus } from "../../../api/subject";
import dayjs from "dayjs";

export default {
  data() {
    return {
      formInline: {
        rid: "",
        status: "",
        name: "",
        username: "",
      },
      tableData: [],
      addFormVisible: false,
      editFormVisible: false,
      page: 1, // 页码
      limit: 2, // 每页数据条数
      pageSizes: [5, 10, 15, 20], // 页容量选项
      total: 0, // 总条数
    };
  },
  components: {
    addDialog,
    editDialog,
  },
  created() {
    // 获取列表数据
    this.getBlogList();
  },
  methods: {
    filterTime(row) {
      return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
    },
    showEdit(item) {
      // 显示对话框
      this.editFormVisible = true;

      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    changeStatus(item) {
      subjectStatus({
        id: item.id,
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("状态修改成功！");

          this.getBlogList();
        }
      });
    },
    removeItem(item) {
      this.$confirm(`你真的要删除 ${item.intro}`, "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          subjectRemove({
            id: item.id,
          }).then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功！");
            }
          });
        })
        .catch(() => {});
    },
    // 页码改变
    handleSizeChange(page) {
      this.page = page;

      this.getBlogList();
    },
    // 页容量改变
    handleCurrentChange(size) {
      // 保存页容量
      this.limit = size;

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
    getBlogList() {
      blogList({
        pageIndex: this.page,
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
