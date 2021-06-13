<template>
  <div class="login-box">
    <div class="form-box"></div>
    <img src="../../assets/login_banner_ele.png" alt="" class="login-pic" />
  </div>
</template>

<script>
export default {
  name: "login",
};
</script>

<style>
.login-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    height: 100%;
}
.login-box .form-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
}
</style>
