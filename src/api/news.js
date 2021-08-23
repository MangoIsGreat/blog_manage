import instance from "../utils/request";

// 资讯 列表
export function newsList(params) {
  return instance({
    url: "/admin/news/list",
    method: "get",
    params,
  });
}

// 获取tag类型
export function typeList() {
  return instance({
    url: "/newstype/list",
    method: "get",
  });
}

// 资讯 删除
export function newsRemove(data) {
  return instance({
    url: "/admin/news/delete",
    method: "post",
    data,
  });
}

// 获取某一篇资讯
export function getOneNews(data) {
  return instance({
    url: "/admin/news/info",
    method: "get",
    params: data,
  });
}

// 更新"资讯"
export function updateNews(data) {
  return instance({
    url: "/admin/news/update",
    method: "post",
    data,
  });
}

// 资讯图片上传
export function uploadNewsImg(formData) {
  return instance({
    url: "/upload",
    method: "post",
    formData,
    headers: { contentType: false, processData: false },
  });
}
