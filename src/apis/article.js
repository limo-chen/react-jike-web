//封装和文章相关的接口函数
import { request } from "@/utils";

export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}
// 提交文章表单
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 更新文章
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
    data,
  });
}

// 获取文章列表 axios里面的params参数是通过params选项来设置的
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除列表
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

// 获取文章详情  id是我们需要的参数，当实参放过来就行  method: "GET"这个不写也行，默认就是get
export function getArticleByAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "GET",
  });
}
