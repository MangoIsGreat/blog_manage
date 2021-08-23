<template>
  <div class="blog-container">
    <el-table height="430" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="动态ID"> </el-table-column>
      <el-table-column prop="userInfo.id" label="作者ID"> </el-table-column>
      <el-table-column prop="userInfo.nickname" label="作者名">
      </el-table-column>
      <el-table-column width="250" prop="content" label="内容">
      </el-table-column>
      <el-table-column prop="likeNum" label="点赞数"> </el-table-column>
      <el-table-column
        width="160"
        :formatter="filterTime"
        prop="created_at"
        label="创建日期"
      >
      </el-table-column>
      <el-table-column width="140" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="removeItem(scope.row)" type="text">删除</el-button>
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
  </div>
</template>

<script>
import { getCommentList, deleteDynComm } from "../../../../api/dynamic";
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
    this.getCommentList();
  },
  methods: {
    filterTime(row) {
      return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
    },
    removeItem(item) {
      this.$confirm(`您确定要删除这条评论吗？`, "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDynComm({
            commentId: item.id,
          }).then((res) => {
            if (res.error_code === 0) {
              this.$message.success("删除成功！");

              this.getCommentList();
            } else {
              this.$message.error("删除失败！");
            }
          });
        })
        .catch(() => {});
    },
    // 页码改变
    handleSizeChange(num) {
      this.limit = num;

      this.getCommentList();
    },
    // 页容量改变
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;

      this.getCommentList();
    },
    getCommentList() {
      getCommentList({
        pageIndex: this.pageIndex,
        pageSize: this.limit,
        dynamicId: this.$route.params.dynId,
      }).then((res) => {
        console.log(8889, res);
        if (res.error_code === 0) {
          // 保存表格数据
          this.tableData = res.data.rows;

          // 保存总条数
          this.total = res.data.count;
        } else {
          this.$message.error("评论数据获取失败！");
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
