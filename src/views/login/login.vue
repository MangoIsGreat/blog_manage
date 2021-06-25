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
      <el-form ref="regForm" :model="regForm" :rules="regRules">
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            name="image"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="昵称"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <img class="register-captcha" :src="regCaptchaUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16"
              ><el-input v-model="regForm.rcode" autocomplete="off"></el-input
            ></el-col>
            <el-col :span="7" :offset="1">
              <el-button :disabled="time != 0" @click="getMessageCode">{{
                time == 0 ? "获取用户验证码" : `还有${time}S继续获取`
              }}</el-button>
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
import { login, sendsms, register } from "../../api/login";
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

    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 判断手机号格式
        const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("老铁，你的邮箱写错了噢"));
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
        code: "",
      },
      regForm: {
        phone: "",
        code: "",
        avatar: "",
        email: "",
        password: "",
        rcode: "",
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
      regRules: {
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
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 18,
            message: "用户名长度为2到18",
            trigger: "change",
          },
        ],
        rcode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change",
          },
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
      },
      // 验证码地址
      captchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      dialogFormVisible: false, // 注册框是否弹出
      formLabelWidth: "65px",
      regCaptchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      time: 0, // 倒计时时间
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads",
      imageUrl: "",
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
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.phone,
            //     password: this.form.password,
            //     code: this.form.captcha,
            //   },
            // })
            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.captcha,
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
    changeRegCaptcha() {
      this.regCaptchaUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&${Date.now()}`;
    },
    handleAvatarSuccess(res, file) {
      // 保存头像地址
      this.regForm.avatar = res.data.file_path;
      // 生成本地的临时地址
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload() {},
    getMessageCode() {
      if (this.time == 0) {
        // 手机号判断
        const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(this.regForm.phone)) {
          return this.$message.error("手机号格式错误！");
        }
        if (this.regForm.code == "" || this.regForm.code.length != 4) {
          return this.$message, error("验证码格式错误！");
        }

        // 开启倒计时：
        this.time = 60;
        const interId = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            clearInterval(interId);
          }
        }, 1000);

        // axios({
        //   url: process.env.VUE_APP_BASEURL + "/sendsms",
        //   method: "post",
        //   withCredentials: true,
        //   data: {
        //     phone: this.regForm.phone,
        //     code: this.regForm.code,
        //   },
        // })
        sendsms({
          phone: this.regForm.phone,
          code: this.regForm.code,
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("短信验证码是：" + res.data.data.captcha);
          }
        });
      } else {
      }
    },
    submitRegForm() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          // 验证成功
          // axios({
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   method: "post",
          //   data: {
          //     username: this.regForm.username,
          //     phone: this.regForm.phone,
          //     email: this.regForm.email,
          //     avatar: this.regForm.avatar,
          //     password: this.regForm.password,
          //     rcode: this.regForm.rcode,
          //   },
          // })
          register({
            username: this.regForm.username,
            phone: this.regForm.phone,
            email: this.regForm.email,
            avatar: this.regForm.avatar,
            password: this.regForm.password,
            rcode: this.regForm.rcode,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("注册成功！");
              this.dialogFormVisible = false;
            }
          });
        } else {
          this.$message.error("验证失败");

          return false;
        }
      });
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
