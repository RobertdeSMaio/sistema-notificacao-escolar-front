import DashCards from "../components/layout/DashCard";
import SideBar from "../components/layout/SideBar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />
      <DashCards />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3"></div>
    </div>
  );
}
