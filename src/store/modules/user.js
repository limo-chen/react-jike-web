// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user.js";

const userStore = createSlice({
  name: "user",
  //数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  //   同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // localstorage也存一份

      _setToken(action.payload);
    },
    setUseInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUseInfo(state) {
      state.userInfo = {};
      state.token = "";
      removeToken();
    },
  },
});

// 解构出actionCreater
const { setToken, setUseInfo, clearUseInfo } = userStore.actions;
// 获取reducer函数
const useReducer = userStore.reducer;

// 异步方法，完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await loginAPI(loginForm);
    console.log(loginForm);
    //提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};
// 获取个人用户信息的异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    //1，获取个人信息的接口调用
    const res = await getProfileAPI();
    // 2，拿到个人信息的dispatch action 存下来
    dispatch(setUseInfo(res.data));
  };
};
export { setToken, fetchLogin, fetchUserInfo, clearUseInfo };
export default useReducer;
