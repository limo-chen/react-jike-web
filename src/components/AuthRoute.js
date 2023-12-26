// 封装高阶组件

// 重定向组件 Navigate
import { Navigate } from "react-router-dom";
import { getToken } from "@/utils";
function AuthRoute({ children }) {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
  }

  return <Navigate to={"./login"} replace />;
}
export { AuthRoute };
