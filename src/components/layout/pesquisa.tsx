//TODO fazer nav bar para pesquisa com .map e .filter para filtrar os dados
// Será conectado no caminho userEdit

export default function Pesquisa({ valor, setValor, onPesquisar, onLimpar }) {
  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded-md bg-gray-50">
          <option>Nome</option>
        </select>
        <select className="border p-2 rounded-md bg-gray-50">
          <option>Contém</option>
        </select>

        <input
          type="text"
          placeholder="Valor"
          className="border p-2 rounded-md flex-1 outline-blue-500"
          value={valor}
          onChange={(e) => setValor(e.target.value)} // Atualiza o termoBusca, mas não filtra ainda
        />
      </div>

      <div className="flex gap-2">
        <button className="bg-amber-400 font-bold p-2 rounded-md px-4">
          + Condição
        </button>
        <button className="bg-amber-400 font-bold p-2 rounded-md px-4">
          Grupo
        </button>
        <button
          onClick={onLimpar}
          className="bg-red-500 text-white p-2 rounded-md px-4"
        >
          Limpar
        </button>
        <button
          onClick={onPesquisar}
          className="bg-sky-500 text-white p-2 rounded-md px-4"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}
