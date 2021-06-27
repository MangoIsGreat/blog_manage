<template>
  <el-dialog
    class="addDialog"
    center
    title="新增学科"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "../../../../api/subject";
export default {
  data() {
    return {
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      },
      formLabelWidth: "80px",
      //   添加表单验证规则
      addFormRules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "学科名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          subjectAdd(this.addForm).then((res) => {
            if (res.code === 201) {
              this.$message.warning("学科编号已经存在，请重新输入！");
            } else if (res.code === 200) {
              this.$message.success("恭喜你，新增成功啦！");
              //   关闭弹窗
              this.$parent.addFormVisible = false;
              // 调用父组件的获取数据方法
              this.$parent.getSubList();
            }
          });
        } else {
          this.$message.error("新增失败！");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
.addDialog {
  .el-dialog {
    width: 602px;
  }
  .el-dialog__header {
    background: linear-gradient(to right, #01c4fa, #1394fa);
    span {
      color: white;
    }
    i {
      color: white;
    }
  }
}
</style>
