import SideBar from "../components/layout/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="min-h-screen bg-gray-100 p-8 flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3"></div>
      </main>
    </div>
  );
}
