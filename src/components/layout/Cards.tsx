export default function Cards() {
  return (
    <div className="w-full p-10 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7-xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-80 bg-[#D9D9D9] rounded-md shadow-md hover:shadow-xl transition-all p-6"
          >
            <p className="font-bold text-[#0A96A6]">Aviso escolar 1</p>
          </div>
        ))}
      </div>
    </div>
  );
}
