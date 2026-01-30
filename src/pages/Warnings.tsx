import Cards from "../components/layout/CardWarnings";
import SideBar from "../components/layout/SideBar";

export default function Warnings() {
  return (
    <>
      <div className="flex min-h-screen bg-slate-100">
        <SideBar />
        <Cards />
      </div>
    </>
  );
}
