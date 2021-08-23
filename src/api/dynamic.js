import instance from "../utils/request";

// 动态 列表
export function dynamicList(params) {
  return instance({
    url: "/admin/dynamic/list",
    method: "get",
    params,
  });
}

// 获取tag类型
export function typeList() {
  return instance({
    url: "/theme/list",
    method: "get",
  });
}

// 动态 删除
export function dynamicRemove(data) {
  return instance({
    url: "/admin/dynamic/delete",
    method: "post",
    data,
  });
}

// 获取动态
export function getOneDynamic(data) {
  return instance({
    url: "/admin/dynamic/one",
    method: "get",
    params: data,
  });
}

// 获取动态评论列表
export function getCommentList(data) {
  return instance({
    url: "/dcomment/admin/list",
    method: "get",
    params: data,
  });
}

// 更新"动态"
export function updateDyn(data) {
  return instance({
    url: "/admin/dynamic/update",
    method: "post",
    data,
  });
}

// 删除"动态"评论
export function deleteDynComm(data) {
  return instance({
    url: "/dcomment/admin/delete",
    method: "post",
    data,
  });
}
