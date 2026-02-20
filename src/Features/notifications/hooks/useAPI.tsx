import { useEffect, useState } from "react";
import api from "../services/apiService";

export function ListaNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados
    api
      .get("/notificacoes")
      .then((response) => {
        setNotificacoes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar notificações:", err);
        setLoading(false);
      });
  }, []); // Array vazio significa: executa apenas uma vez ao montar o componente

  if (loading) return <p>Carregando notificações...</p>;

  return (
    <ul>
      {notificacoes.map((n) => (
        <li key={n.id}>
          <strong>{n.titulo}</strong>: {n.mensagem}
        </li>
      ))}
    </ul>
  );
}
