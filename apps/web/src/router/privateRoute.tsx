import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { isJwtExpired } from "@/common";

export function PrivateRoute() {

  return Cookies.get('token') && isJwtExpired(Number(Cookies.get('exp'))) ? <Outlet /> : <Navigate to={'/'} replace={true} />;
}