import instance from "../utils/request";

// 学科 新增
export function subjectAdd(data) {
  return instance({
    url: "/subject/add",
    method: "post",
    data,
  });
}

// 博客 列表
export function blogList(params) {
  return instance({
    url: "/blog/list",
    method: "get",
    params,
  });
}

// 学科 编辑
export function subjectEdit(data) {
  return instance({
    url: "/subject/edit",
    method: "post",
    data,
  });
}

// 学科 删除
export function subjectRemove(data) {
  return instance({
    url: "/subject/remove",
    method: "post",
    data,
  });
}

// 切换状态
export function subjectStatus(data) {
  return instance({
    url: "/subject/status",
    method: "post",
    data,
  });
}
