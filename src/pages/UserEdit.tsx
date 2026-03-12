import { useEffect, useState } from "react";
import Pesquisa from "../components/layout/pesquisa";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await fetch(
          "https://sistema-notificacao-escolar-back.onrender.com/api/user/{id}",
        );
        const dados = await response.json();

        setUsuarios(dados);
      } catch (error) {
        console.error("Erro ao carregar lista de usuários", error);
      } finally {
        setLoading(false);
      }
    }
    carregarUsuarios();
  }, []);

  if (loading)
    return <div className="p-10 text-center">Carregando lista...</div>;

  return (
    <div className="min-h-screen mx-auto p-4 bg-gray-100 shadow-md rounded-lg">
      <Pesquisa />

      <div className="space-y-4">
        {usuarios.length > 0 ? (
          usuarios.map((user) => (
            <ol
              key={user.id}
              className="bg-white p-4 rounded-lg shadow grid grid-cols-3 gap-2 border-l-4 border-blue-500"
            >
              <li>
                <strong>Nome:</strong> {user.nome}
              </li>
              <li>
                <strong>E-mail:</strong> {user.email}
              </li>
              <li>
                <strong>Telefone:</strong> {user.telefone}
              </li>
            </ol>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Nenhum usuário encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
