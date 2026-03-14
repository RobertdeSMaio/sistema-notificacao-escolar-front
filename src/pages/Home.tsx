import { useEffect, useState } from "react";
import NotificationCard from "../Features/components/NotificationCard";

export default function Home() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://sistema-notificacao-escolar-back.onrender.com/api/Notification/Get",
    )
      .then((res) => res.json())
      .then((data) => {
        const apenasGerais = data.filter((n) => n.target === "all");
        setAvisos(apenasGerais);
        setLoading(false);
      })
      .catch((err) => console.error("Erro ao buscar avisos", err));
  }, []);
  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Carregando lista...</div>
    );
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {avisos.length > 0 ? (
        avisos.map((item) => (
          <NotificationCard key={item.id} notification={item} />
        ))
      ) : (
        <p className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          Nenhum comunicado encontrado.
        </p>
      )}
    </div>
  );
}
