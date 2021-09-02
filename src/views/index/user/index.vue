<template>
  <div class="blog-container">
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.account"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            size="small"
            class="short-input"
            v-model="formInline.nickname"
          ></el-input>
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
        <el-table-column prop="id" label="账号ID"> </el-table-column>
        <el-table-column prop="email" label="账号"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isForbidden === true" style="color: red"
              >封禁</span
            >
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="blogReadNum" label="博客被阅读">
        </el-table-column>
        <el-table-column prop="blogLikeNum" label="博客获赞"> </el-table-column>
        <el-table-column prop="idolNum" label="关注"> </el-table-column>
        <el-table-column prop="fansNum" label="粉丝"> </el-table-column>
        <el-table-column
          width="160"
          :formatter="filterTime"
          prop="created_at"
          label="创建日期"
        >
        </el-table-column>
        <el-table-column width="140" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="forbid(scope.row)" type="text">{{
              scope.row.isForbidden === true ? "启用" : "封禁"
            }}</el-button>
            <el-button
              @click="$router.push(`/home/user/${scope.row.id}`)"
              type="text"
              >详情</el-button
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
import { getUserList, forbidden } from "../../../api/user";
import dayjs from "dayjs";

export default {
  data() {
    return {
      formInline: {
        account: "",
        nickname: "",
      },
      typeList: [], // 博客类型列表
      tableData: [],
      editFormVisible: false,
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
        vm.getBlogList();

        vm.formInline = {
          account: "",
          nickname: "",
        };

        vm.pageIndex = 1;
      }
    });
  },
  created() {
    // 获取列表数据
    this.getBlogList();
  },
  methods: {
    filterTime(row) {
      return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
    },
    forbid(item) {
      forbidden({
        id: item.id,
      }).then((res) => {
        if (res.error_code !== 0) {
          return this.$message.error(res.msg || "删除失败！");
        }

        this.$message.success(res.data);

        this.getBlogList();
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
    getBlogList() {
      getUserList({
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
