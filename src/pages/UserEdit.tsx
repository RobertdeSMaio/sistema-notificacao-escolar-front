import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pesquisa from "../components/layout/pesquisa";

export default function EditarUsuario() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await fetch(
          `https://sistema-notificacao-escolar-back.onrender.com/api/user/${id}`,
        );
        const dados = await response.json();
        setUserData(dados);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarUsuario();
  }, [id]);

  if (loading)
    return <div className="p-4 text-center">Carregando dados...</div>;
  if (!userData)
    return <div className="p-4 text-center">Usuário não encontrado.</div>;

  return (
    <div className="min-h-screen mx-auto p-2 bg-gray-100 shadow-md rounded-lg">
      <Pesquisa />
      <ol className="mb-4 bg-white p-4 rounded-lg shadow grid grid-cols-3 gap-2">
        <li className="font-medium">
          Nome: <span className="font-normal">{userData.nome}</span>
        </li>
        <li className="font-medium">
          E-mail: <span className="font-normal">{userData.email}</span>
        </li>
        <li className="font-medium">
          Telefone: <span className="font-normal">{userData.telefone}</span>
        </li>
      </ol>
    </div>
  );
}
