import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (loading) return <div className="p-10 text-center">Carregando...</div>;
  if (!aviso)
    return <div className="p-10 text-center">Notificação não encontrada.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#088395]">{aviso.title}</h1>
      <p className="text-gray-700 mt-4">{aviso.content}</p>
      <div className="mt-6 text-sm text-gray-500">
        <span>{aviso.author}</span> ·{" "}
        <span>{new Date(aviso.createdAt).toLocaleDateString("pt-BR")}</span>
      </div>
    </div>
  );
}
