import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationCard from "../Features/components/NotificationCard";

export default function NotificationDetail() {
  const { id } = useParams();
  const [avisos, setAviso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    const url =
      role === "Admin"
        ? "https://sistema-notificacao-escolar-back.onrender.com/api/Notification/Get"
        : `https://sistema-notificacao-escolar-back.onrender.com/api/Notification/Get?userId=${userId}`;

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
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
      {avisos.length > 0 ? (
        avisos.map((item) => (
          <NotificationCard key={item.id} notification={item} />
        ))
      ) : (
        <p>Nenhum comunicado encontrado.</p>
      )}
    </div>
  );
}
