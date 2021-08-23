<template>
  <div class="blog-container">
    <el-table height="430" :data="tableData" style="width: 100%">
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
      <el-table-column prop="blogReadNum" label="博客被阅读"> </el-table-column>
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
  </div>
</template>

<script>
import { getUserAttentionList } from "../../../../api/user";
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1, // 页码
      limit: 5, // 每页数据条数
      pageSizes: [5, 10, 15, 20], // 页容量选项
      total: 0, // 总条数
    };
  },
  created() {
    // 获取列表数据
    this.getAttentionList();
  },
  methods: {
    filterTime(row) {
      return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
    },
    // 页码改变
    handleSizeChange(num) {
      this.limit = num;

      this.getAttentionList();
    },
    // 页容量改变
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;

      this.getAttentionList();
    },
    getAttentionList() {
      getUserAttentionList({
        pageIndex: this.pageIndex,
        pageSize: this.limit,
        id: this.$route.params.uid,
      }).then((res) => {
        console.log(990, res)
        if (res.error_code === 0) {
          // 保存表格数据
          this.tableData = res.data.rows;

          // 保存总条数
          this.total = res.data.count;
        } else {
          this.$message.error("关注列表获取失败！");
        }
      });
    },
  },
};
</script>

<style lang="less">
.blog-container {
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
