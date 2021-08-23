import instance from "../utils/request";

// 博客 列表
export function blogList(params) {
  return instance({
    url: "/admin/blog/list",
    method: "get",
    params,
  });
}

// 获取tag类型
export function typeList() {
  return instance({
    url: "/tag/list",
    method: "get",
  });
}

// 博客 删除
export function blogRemove(data) {
  return instance({
    url: "/admin/blog/delete",
    method: "post",
    data,
  });
}

// 博客 隐藏/展示
export function hiddenRemove(data) {
  return instance({
    url: "/admin/blog/hidden",
    method: "post",
    data,
  });
}

// 获取博客信息
export function getBlogInfo(data) {
  return instance({
    url: "/admin/blog/findBlog",
    method: "get",
    params: data,
  });
}

// 博客图片上传
export function uploadBlogImg(formData) {
  return instance({
    url: "/upload",
    method: "post",
    formData,
    headers: { contentType: false, processData: false },
  });
}

// 更新博客
export function updateBlog(data) {
  return instance({
    url: "/admin/blog/update",
    method: "post",
    data,
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
