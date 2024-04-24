import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import App from "../pages";
import { Editor } from "../pages/editor";
import { Dashbord } from "../pages/dashbord/strategies";
import { PrivateRoute } from "./privateRoute";
import PageNotFound from "../pages/pageNotFound";
import { Bots } from "../pages/dashbord/bots";
import { Detail } from "../pages/dashbord/strategies/detail";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<App />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/editor" element={<Editor />} />
          <Route path="/dashbord" element={<Outlet />}>
            <Route index element={<Dashbord />} />
            <Route path="/dashbord/strategies" element={<Dashbord />} />
            <Route path="bots" element={<Bots />} />
            <Route path="strategy/:slug" element={<Detail />} />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
