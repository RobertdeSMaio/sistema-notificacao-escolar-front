export default function NotificationCard({ notification }) {
  return (
    <div className="bg-[#D9D9D9] p-4 rounded-md shadow-md flex flex-col min-h-[200px] relative border-t-4 border-[#088395]">
      {/* Badge de tipo no topo superior direito */}
      <span
        className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full ${notification.target === "all" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
      >
        {notification.target === "all" ? "GERAL" : "DIRETO"}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-[#088395] font-bold text-lg pr-12">
          {notification.title}
        </h3>
        <button className="w-fit border border-black px-3 py-0.5 text-xs rounded hover:bg-gray-200 transition">
          Ouvir
        </button>
      </div>

      {/* Texto do recado preso no meio */}
      <div className="mt-4 text-gray-700 text-sm flex-grow">
        <p className="leading-relaxed">{notification.content}</p>
      </div>

      {/* Rodapé fixo embaixo */}
      <div className="mt-4 pt-2 border-t border-gray-400 flex justify-between items-center text-[10px] text-gray-500">
        <span className="font-bold uppercase tracking-wider">
          Teacher / Admin
        </span>
        <span>11/03/2026</span>
      </div>
    </div>
  );
}
