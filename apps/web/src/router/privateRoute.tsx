import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export function isJwtExpired(exp: number): boolean {
  const expirationTime = exp * 1000;
  const currentTime = Date.now();

  return currentTime < expirationTime;
}


export function PrivateRoute() {

  return Cookies.get('token') ? <Outlet /> : <Navigate to={'/login'} replace={true} />;
}