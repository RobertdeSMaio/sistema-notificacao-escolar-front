export default function Cards() {
  const dados = [
    { id: 1, text: "Atualização de forms" },
    { id: 2, text: "O grêmio estudantil.." },
  ];

  const itemNot1 = dados.find((item) => item.id === 1);
  const itemNot2 = dados.find((item) => item.id === 2);

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 w-full max-w-7-xl">
        {[1, 2].map((item) => (
          <div className="h-80 bg-[#D9D9D9] rounded-md shadow-md hover:shadow-xl transition-all p-6">
            <p className="font-bold text-[#0A96A6]">
              {item === 1 ? itemNot1?.text : itemNot2?.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
