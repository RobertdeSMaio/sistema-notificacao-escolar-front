import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditarUsuario() {
  const { id } = useParams();
  const [userData, setUserData] = useState({ nome: "", email: "", cpf: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await fetch(`https://sua-api.com/api/usuario/${id}`);
        const dados = await response.json();
        setUserData(dados);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    }
    carregarUsuario();
  }, [id]);

  if (loading) return <div>Carregando dados...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg"></div>
  );
}
