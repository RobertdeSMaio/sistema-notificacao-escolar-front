import { useEffect, useState } from "react";

export default function NotificationCard({ notification }) {
  const [recipientNames, setRecipientNames] = useState<string[]>([]);

  const dataFormatada = notification.createdAt
    ? new Date(notification.createdAt).toLocaleDateString("pt-BR")
    : "Data indisponível";

  const handleOuvir = () => {
    const texto = `${notification.title}. ${notification.content}`;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (notification.target === "all" || !notification.recipientsIds) return;

    const ids = notification.recipientsIds.split(",").filter(Boolean);

    Promise.all(
      ids.map(
        (id) =>
          fetch(
            `https://sistema-notificacao-escolar-back.onrender.com/api/User/${id}`,
          )
            .then((res) => res.json())
            .then((user) => user.name)
            .catch(() => id), // se falhar, mostra o id mesmo
      ),
    ).then((names) => setRecipientNames(names));
  }, [notification.recipientsIds]);

  return (
    <div className="bg-[#ffffff] p-4 rounded-md shadow-md flex flex-col min-h-55 max-h-87.5 relative border-t-4 border-[#088395] transition-transform hover:scale-[1.02]">
      <span
        className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm ${
          notification.target === "all"
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-blue-100 text-blue-700 border border-blue-200"
        }`}
      >
        {notification.target === "all" ? "GERAL" : "DIRETO"}
      </span>

      <div className="flex flex-col gap-2">
        <h3
          className="text-[#088395] font-bold text-lg pr-12 truncate"
          title={notification.title}
        >
          {notification.title || "Sem Título"}
        </h3>
        <button
          onClick={handleOuvir}
          className="w-fit border border-black px-3 py-0.5 text-xs font-semibold rounded hover:bg-white transition-colors active:bg-gray-100"
        >
          Ouvir
        </button>
      </div>

      <div className="mt-4 text-gray-700 text-sm grow overflow-y-auto custom-scrollbar">
        <p className="leading-relaxed whitespace-pre-wrap">
          {notification.content || "Nenhum conteúdo disponível."}
        </p>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-400 flex justify-between items-center text-[10px] text-gray-500 font-medium">
        <span className="font-bold uppercase tracking-wider">
          {notification.author || "Sistema / Admin"}
        </span>
        <span>{dataFormatada}</span>
      </div>
      {notification.target !== "all" && recipientNames.length > 0 && (
        <div className="mt-2 text-[10px] text-blue-500">
          Para: {recipientNames.join(", ")}
        </div>
      )}
    </div>
  );
}
