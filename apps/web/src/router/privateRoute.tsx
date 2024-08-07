import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { isJwtExpired } from "@/common";
import { useEffect } from "react";
import { SocketConnector } from "@/common/socketConnector";
import { TOKEN_FIELD } from "@/common/constants";

export function PrivateRoute() {

  useEffect(() => {
    const token = Cookies.get(TOKEN_FIELD)
    if (token) {
      new SocketConnector(token);
    }
  }, [])

  return Cookies.get(TOKEN_FIELD) && isJwtExpired(Number(Cookies.get('exp'))) ? <Outlet /> : <Navigate to={'/'} replace={true} />;
}