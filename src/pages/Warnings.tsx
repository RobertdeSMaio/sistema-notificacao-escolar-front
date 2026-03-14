import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationCard from "../Features/components/NotificationCard";

export default function NotificationDetail() {
  const { id } = useParams();
  const [aviso, setAviso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://sistema-notificacao-escolar-back.onrender.com/api/Notification/Get/${id}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setAviso(data);
        setLoading(false);
      })
      .catch((err) => console.error("Erro ao buscar aviso", err));
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Carregando lista...</div>
    );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {aviso ? (
        <NotificationCard key={aviso.id} notification={aviso} />
      ) : (
        <p>Nenhum comunicado encontrado.</p>
      )}
    </div>
  );
}
