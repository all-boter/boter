import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { isJwtExpired } from "@/common";
import { useEffect } from "react";
import { SocketConnector } from "@/common/socketConnector";

export function PrivateRoute() {

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const socketConnector = new SocketConnector(token);
      console.log('%c=useEffect-AppRouter-2', 'color:red', socketConnector)
    }
  }, [])

  return Cookies.get('token') && isJwtExpired(Number(Cookies.get('exp'))) ? <Outlet /> : <Navigate to={'/'} replace={true} />;
}