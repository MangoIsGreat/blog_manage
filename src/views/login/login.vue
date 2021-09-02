<template>
  <div class="login-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt="" />
        <span class="title">管理后台</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              v-model="form.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-form-pwd">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="login-form-checked">
            <el-checkbox v-model="form.checked">
              我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
                type="primary"
                >隐私条款</el-link
              >
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt="" class="login-pic" />
  </div>
</template>

<script>
import { login } from "../../api/login";
import { setToken } from "../../utils/token";
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
          callback(new Error("请输入正确的手机号！"));
        }
      }
    };

    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 判断手机号格式
        const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱！"));
        }
      }
    };

    return {
      // 表单数据：
      form: {
        username: "",
        password: "",
        checked: false,
      },
      // 定义校验规则：
      rules: {
        username: [{ required: true, validator: checkEmail, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
          {
            min: 6,
            max: 32,
            message: "密码长度为6到32",
            trigger: "change",
          },
        ],
      },
      formLabelWidth: "65px",
    };
  },
  methods: {
    submitForm() {
      if (this.form.checked == false) {
        this.$message.warning("请勾选用户协议！");
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            login({
              account: this.form.username,
              secret: this.form.password,
            }).then((res) => {
              if (res.error_code !== 0) {
                this.$message.error(res.data.message);
              } else if (res.error_code === 0) {
                this.$message.success("登录成功！");
                setToken(res.token);
                this.$router.push("/home/blog");
              }
            });
          } else {
            // 验证失败
            this.$message.error("请输入正确的账号密码！");

            return false;
          }
        });
      }
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
    width: 400px;
    height: 460px;
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
      margin-top: 35px;

      .el-form-item {
        margin-bottom: 40px;
      }

      .login-form-pwd {
        margin-bottom: 15px;
      }

      .login-form-checked {
        margin-bottom: 20px;
      }

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
}
</style>
