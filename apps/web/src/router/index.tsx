import App from "@/pages";
import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { Editor } from "@/pages/editor";
import { Dashbord } from "@/pages/dashbord/strategies";
import { Bots } from "@/pages/dashbord/bots";
import { StgDetail } from "@/pages/dashbord/strategies/detail";
import PageNotFound from "@/pages/pageNotFound";
import Test from "@/pages/test";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<App />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/editor/:source?/:codeId" element={<Editor />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashbord" element={<Outlet />}>
            <Route index element={<Dashbord />} />
            <Route path="/dashbord/strategies" element={<Dashbord />} />
            <Route path="/dashbord/strategy/:stgId" element={<StgDetail />} />
            <Route path="bots" element={<Bots />} />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
