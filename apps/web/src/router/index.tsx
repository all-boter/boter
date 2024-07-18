import App from "@/pages";
import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { Editor } from "@/pages/editor";
import { Dashbord } from "@/pages/dashbord/strategies";
import { Bots } from "@/pages/dashbord/bots";
import PageNotFound from "@/pages/pageNotFound";
import { BotDetail } from "@/pages/bot-detail";
import { NotifierPage } from "@/pages/notifier";
import { Backtest } from "@/pages/backtest";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<App />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/editor/:source?/:stgId" element={<Editor />} />
          <Route path="/bot/:botId" element={<BotDetail />} />
          <Route path="/dashbord" element={<Outlet />}>
            <Route index element={<Dashbord />} />
            <Route path="/dashbord/strategies" element={<Dashbord />} />
            <Route path="bots" element={<Bots />} />
            <Route path="notifier" element={<NotifierPage />} />
            <Route path="backtest" element={<Backtest />} />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
