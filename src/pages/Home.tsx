import Cards from "../components/layout/Cards";
import SideBar from "../components/layout/SideBar";

export default function Home() {
  return (
    <>
      <div className="flex bg-slate-100">
        <SideBar />
        <Cards />
      </div>
    </>
  );
}
