export default function CardWarnings() {
  const dados = [
    { id: 1, text: "Atualização de forms" },
    { id: 2, text: "O grêmio estudantil.." },
    { id: 3, text: "Fulaninho" },
    { id: 4, text: "Siclaninho" },
    { id: 5, text: "Aulas" },
    { id: 6, text: "Férias" },
  ];

  const itemAv1 = dados.find((item) => item.id === 1);
  const itemAv2 = dados.find((item) => item.id === 2);
  const itemAv3 = dados.find((item) => item.id === 3);
  const itemAv4 = dados.find((item) => item.id === 4);
  const itemAv5 = dados.find((item) => item.id === 5);
  const itemAv6 = dados.find((item) => item.id === 6);

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7-xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-80 bg-[#D9D9D9] rounded-md shadow-md hover:shadow-xl transition-all p-6"
          >
            <p className="font-bold text-[#0A96A6]">
              {item === 1
                ? itemAv1?.text
                : item === 2
                  ? itemAv2?.text
                  : item === 3
                    ? itemAv3?.text
                    : item === 4
                      ? itemAv4?.text
                      : item === 5
                        ? itemAv5?.text
                        : itemAv6?.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
