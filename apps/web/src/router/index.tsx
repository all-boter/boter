import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import App from "../pages";
import { Editor } from "../pages/editor";
import { Login } from "../pages/login";
import { Dashbord } from "../pages/dashbord";
import { PrivateRoute } from "./privateRoute";
import PageNotFound from "../pages/pageNotFound";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<App />} />
        </Route>
        <Route path="/login" element={<Outlet />}>
          <Route index element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/editor" element={<Editor />}/>
          <Route path="/dashbord" element={<Outlet />}>
            <Route index element={<Dashbord />} />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </Router>
  );
}
