import axios from "axios";
import { getToken } from "../utils/token";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  withCredentials: true,
});

// 获取用户信息
export function userInfo() {
  return instance({
    url: "/info",
    method: "get",
    headers: {
      token: getToken(),
    },
  });
}
