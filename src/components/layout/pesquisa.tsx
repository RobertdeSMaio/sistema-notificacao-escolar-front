//TODO fazer nav bar para pesquisa com .map e .filter para filtrar os dados
// Será conectado no caminho userEdit

export default function Pesquisa({ valor, setValor, onPesquisar, onLimpar }) {
  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded-md bg-gray-50">Nome</select>
        <select className="border p-2 rounded-md bg-gray-50">Contém</select>

        <input
          type="text"
          placeholder="Valor"
          className="border p-2 rounded-md flex-1 outline-[#34a0a4]"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onLimpar}
          className="bg-red-500 text-white p-2 rounded-md px-4 hover:bg-red-900"
        >
          Limpar
        </button>
        <button
          onClick={onPesquisar}
          className="bg-sky-500 text-white p-2 rounded-md px-4 hover:bg-sky-900"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}
