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
        <p className="font-bold text-[#0A96A6]">Título: {itemDash?.text}</p>
      </div>

      <div className="h-40 w-full max-w-7-xl bg-[#D9D9D9] rounded-lg shadow-md p-6">
        <p className="font-bold text-[#0A96A6]">
          Informativo: {itemInfo?.text}
        </p>
        <p></p>
      </div>
    </div>
  );
}
