import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import AdminPainel from "../pages/AdminPainel";
import Boletim from "../pages/Boletim";
import DashboardPage from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Warnings from "../pages/Warnings";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <div className="flex h-screen w-full overflow-hidden">
          <SideBar />

          <main className="flex-1 overflow-y-auto bg-slate-100">
            <Routes>
              <Route path="/adminpainel" element={<AdminPainel />} />
              <Route path="/boletim" element={<Boletim />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashpage" element={<DashboardPage />} />
              <Route path="/warnings" element={<Warnings />} />
              <Route
                path="*"
                element={<h1>Página não encontrada! Verifique a URL.</h1>}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}
