import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SendNotificationPage from "../pages/SendNotification";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/notifications" element={<SendNotificationPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashpage" element={<DashboardPage />} />

          <Route
            path="*"
            element={<h1>Página não encontrada! Verifique a URL.</h1>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
