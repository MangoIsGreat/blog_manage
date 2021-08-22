import instance from "../utils/request";

// 登陆接口
export function login(data) {
  return instance({
    url: "/admin/login",
    method: "post",
    data,
  });
}
