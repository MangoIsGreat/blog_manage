import instance from "../utils/request";

// 获取用户信息
export function userInfo() {
  return instance({
    url: "/admin/userInfo",
    method: "get",
  });
}

// 获取所有用户账号信息
export function getUserList(params) {
  return instance({
    url: "/user/userlist",
    method: "get",
    params,
  });
}

// 获取所有用户账号信息
export function forbidden(data) {
  return instance({
    url: "/user/forbid",
    method: "post",
    data,
  });
}

// 获取单个用户信息
export function getOneUserInfo(params) {
  return instance({
    url: "/user/admin/userInfo",
    method: "get",
    params,
  });
}

// 获取单个用户关注列表
export function getUserAttentionList(params) {
  return instance({
    url: "/user/admin/userInfo/attention",
    method: "get",
    params,
  });
}

// 获取单个用户粉丝列表
export function getUserFansList(params) {
  return instance({
    url: "/user/admin/userInfo/fans",
    method: "get",
    params,
  });
}
