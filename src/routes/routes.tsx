import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import AdminPainel from "../pages/AdminPainel";
import Boletim from "../pages/Boletim";
import DashboardPage from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Warnings from "../pages/Warnings";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar />
      <main className="flex-1 overflow-y-auto bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = localStorage.getItem("role")?.toLowerCase() || "";

  const hasAcess = allowedRoles
    .map((roles) => roles.toLowerCase())
    .includes(role);

  if (!hasAcess) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AdminLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/warnings" element={<Warnings />} />
          <Route path="/boletim" element={<Boletim />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "Teacher", "Principal"]}
              />
            }
          >
            <Route path="/dashpage" element={<DashboardPage />} />
            <Route path="/AdminPainel" element={<AdminPainel />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<h1>Página não encontrada! Verifique a URL.</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
