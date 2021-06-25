const axios = require("axios");

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  withCredentials: true,
});

// 登陆接口
export function login(data) {
  return instance({
    url: "/login",
    method: "post",
    data,
  });
}

// 短信接口
export function sendsms(data) {
  return instance({
    url: "/sendsms",
    method: "post",
    data,
  });
}

// 注册接口
export function register(data) {
  return instance({
    url: "/register",
    method: "post",
    data,
  });
}
