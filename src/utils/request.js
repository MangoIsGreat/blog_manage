import axios from "axios";
import { getToken } from "../utils/token";
import { encode } from "./encode";
import { Message } from "element-ui";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  // withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    config.headers["Authorization"] = encode(getToken());
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    Message.error("登录失败，请输入正确的账号和密码！");
    return Promise.reject(error);
  }
);

export default instance;
