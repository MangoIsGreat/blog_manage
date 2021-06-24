<template>
  <div class="login-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt="" />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              v-model="form.phone"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row>
              <el-col :span="18">
                <el-input
                  placeholder="请输入验证码"
                  v-model="form.captcha"
                  prefix-icon="el-icon-key"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <img
                  @click="changeCaptcha"
                  class="capatcha"
                  :src="captchaURL"
                  alt=""
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.checked">
              我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
                type="primary"
                >隐私条款</el-link
              >
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button
              class="register-button"
              @click="dialogFormVisible = !dialogFormVisible"
              type="success"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt="" class="login-pic" />
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <img
                class="register-captcha"
                src="../../assets/captcha.jpg"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16"
              ><el-input v-model="form.name" autocomplete="off"></el-input
            ></el-col>
            <el-col :span="7" :offset="1">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    // 自定义校验规则的函数：
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号格式
        const reg = /0?(13|14|15|18)[0-9]{9}/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("老铁，你的手机号写错了噢"));
        }
      }
    };

    return {
      // 表单数据：
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false,
      },
      // 定义校验规则：
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为6到18",
            trigger: "change",
          },
        ],
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "change",
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change",
          },
        ],
      },
      // 验证码地址
      captchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      dialogFormVisible: false, // 注册框是否弹出
      formLabelWidth: "60px",
    };
  },
  methods: {
    submitForm() {
      if (this.form.checked == false) {
        this.$message.warning("请勾选用户协议！");
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 验证成功
            axios({
              url: process.env.VUE_APP_BASEURL + "/login",
              method: "post",
              withCredentials: true,
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha,
              },
            }).then((res) => {
              console.log(res);
            });
          } else {
            // 验证失败
            this.$message.error("很遗憾，输入错误");

            return false;
          }
        });
      }
    },
    changeCaptcha() {
      this.captchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
  },
};
</script>

<style lang="less">
.login-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;

  .form-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;

    .title-box {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .title {
        font-size: 24px;
        margin-right: 14px;
      }

      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }

      .sub-title {
        font-size: 22px;
      }
    }

    .login-form {
      margin-top: 27px;

      .capatcha {
        height: 40px;
        width: 100%;
      }

      .el-checkbox {
        display: flex;
        align-items: center;

        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }

      .el-button {
        width: 100%;
        margin: 0;
      }

      .register-button {
        margin-top: 26px;
      }
    }
  }

  // 对话框
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      padding-bottom: 20px;
      .el-dialog__title {
        color: white;
      }
    }
  }
  // 注册验证码
  .register-captcha {
    height: 40px;
    width: 100%;
  }
  // 头像的样式
  // 头像居中
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
