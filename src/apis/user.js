import { request } from "@/utils";

// 1,封装登录请求
export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

// 2，获取用户信息
export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
