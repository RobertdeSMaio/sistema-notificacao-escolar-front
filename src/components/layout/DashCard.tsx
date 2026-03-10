import { falar } from "../../Features/services/ttsCards";

export default function DashCards() {
  const dados = [
    { id: 1, text: "Dash" },
    { id: 2, text: "Info" },
  ];

  const itemDash = dados.find((item) => item.id === 1);
  const itemInfo = dados.find((item) => item.id === 2);

  return (
    <div className="w-full p-6 flex flex-col gap-8 ">
      <div className="h-80 w-full max-w-7-xl bg-[#D9D9D9] rounded-lg shadow-md p-6">
        <p className="font-bold text-[#0A96A6]">{itemDash?.text}</p>
        <button
          className="rounded-md border-2 mt-4"
          onClick={() => falar(itemDash?.text || "Sem texto")}
        >
          Ouvir
        </button>
      </div>

      <div className="h-40 w-full max-w-7-xl bg-[#D9D9D9] rounded-lg shadow-md p-6">
        <p className="font-bold text-[#0A96A6]">{itemInfo?.text}</p>
        <button
          className="rounded-md border-2 mt-4"
          onClick={() => falar(itemInfo?.text || "Sem texto")}
        >
          Ouvir
        </button>
      </div>
    </div>
  );
}
