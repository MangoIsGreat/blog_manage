import instance from "../utils/request";

// 获取用户信息
export function userInfo() {
  return instance({
    url: "/admin/userInfo",
    method: "get",
  });
}
