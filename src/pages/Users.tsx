import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pesquisa from "../components/layout/pesquisa";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [termoBusca, setTermoBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("");

  const navigate = useNavigate();

  const usuariosExibidos = usuarios.filter((user) => {
    if (!filtroAtivo) return true;
    return user.name.toLowerCase().includes(filtroAtivo.toLowerCase());
  });

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await fetch(
          "https://sistema-notificacao-escolar-back.onrender.com/api/User/UserList",
        );
        const dados = await response.json();
        setUsuarios(Array.isArray(dados) ? dados : []);
      } catch (error) {
        console.error("Erro ao carregar lista de usuários", error);
      } finally {
        setLoading(false);
      }
    }
    carregarUsuarios();
  }, []);

  const aoPesquisar = () => setFiltroAtivo(termoBusca);
  const aoLimpar = () => {
    setTermoBusca("");
    setFiltroAtivo("");
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(
          `https://sistema-notificacao-escolar-back.onrender.com/api/User/${id}`,
          { method: "DELETE" },
        );
        if (response.ok) {
          setUsuarios(usuarios.filter((user) => user.id !== id));
          alert("Usuário excluído com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao excluir usuário", error);
      }
    }
  };

  const formatarData = (dataIso) => {
    if (!dataIso) return "";

    const data = new Date(dataIso);

    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Carregando lista...</div>
    );

  return (
    <div className="min-h-screen mx-auto p-4 bg-gray-100 shadow-md rounded-lg">
      <Pesquisa
        valor={termoBusca}
        setValor={setTermoBusca}
        onPesquisar={aoPesquisar}
        onLimpar={aoLimpar}
      />

      <div className="space-y-4">
        {usuariosExibidos.length > 0 ? (
          usuariosExibidos.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center border-l border-[#34a0a4]"
            >
              <div className="grid grid-cols-5 gap-2 flex-1">
                <p>
                  <strong>Nome:</strong> {user.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {user.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {user.telefone}
                </p>
                <p>
                  <strong>Função:</strong>
                  {user.role}
                </p>
                <p>
                  <strong>Criado em:</strong>
                  {formatarData(user.createdAt)}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => navigate(`/EditUser/${user.id}`)}
                  className="bg-[#34a0a4] hover:bg-[#288a8a] text-white px-3 py-1 rounded text-sm transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 m-10">
            Nenhum usuário encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
