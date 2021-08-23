<template>
  <div class="blog-container">
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="动态编号">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.dynId"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者ID">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.author"
          ></el-input>
        </el-form-item>
        <el-form-item label="话题">
          <el-select size="small" v-model="formInline.theme">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.themeName"
              :value="item.themeName"
            ></el-option>
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
        <el-table-column width="120" prop="id" label="动态ID">
        </el-table-column>
        <el-table-column width="120" prop="theme" label="话题">
        </el-table-column>
        <el-table-column width="120" prop="userInfo.id" label="作者ID">
        </el-table-column>
        <el-table-column width="120" prop="userInfo.nickname" label="作者名">
        </el-table-column>
        <el-table-column width="120" prop="content" label="内容">
        </el-table-column>
        <el-table-column width="120" prop="likeNum" label="点赞数">
        </el-table-column>
        <el-table-column width="120" prop="commNum" label="评论数">
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
            <el-button
              @click="$router.push(`/home/dynamic/${scope.row.id}`)"
              type="text"
              >详情</el-button
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
  dynamicList,
  typeList,
  dynamicRemove,
  hiddenRemove,
} from "../../../api/dynamic";
import dayjs from "dayjs";

export default {
  data() {
    return {
      formInline: {
        dynId: "",
        author: "",
        theme: "",
      },
      typeList: [], // 动态类型列表
      tableData: [],
      editFormVisible: false,
      pageIndex: 1, // 页码
      limit: 5, // 每页数据条数
      pageSizes: [5, 10, 15, 20], // 页容量选项
      total: 0, // 总条数
    };
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
    showEdit(item) {
      // 显示对话框
      this.editFormVisible = true;

      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    removeItem(item) {
      this.$confirm(`您确定要删除这条动态吗？`, "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dynamicRemove({
            dynamicId: item.id,
          }).then((res) => {
            if (res.error_code === 0) {
              this.$message.success("删除成功！");

              this.getBlogList();
            } else {
              this.$message.error("删除失败！");
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
          this.typeList = res.data;
        } else {
          this.$message.error("博客类型数据获取失败！");
        }
      });
    },
    getBlogList() {
      dynamicList({
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
