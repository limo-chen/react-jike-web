// 封装三个和token相关的方法：存取删
const tokenkey = "token_key";
function setToken(token) {
  localStorage.setItem(tokenkey, token);
}
function getToken() {
  return localStorage.getItem(tokenkey);
}
function removeToken() {
  return localStorage.removeItem(tokenkey);
}
export { setToken, getToken, removeToken };
