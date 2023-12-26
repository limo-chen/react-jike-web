import axios from "axios";
import { getToken } from "./token";
//根域名配置
// 响应时间
// 请求拦截器，响应拦截器

const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 添加请求拦截器  请求发送之前做一下自定义的配置
request.interceptors.request.use(
  (config) => {
    // 操作这个config 注入token数据
    // 获取到token
    // 按后端的格式要求做token拼接  config.headers.Authorization由axios提供，`Bearer ${token}`后端提供的这样的写法
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器 响应返回客户端之前做拦截，重点处理返回的数据
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { request };
