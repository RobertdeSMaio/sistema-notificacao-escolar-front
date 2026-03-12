import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    fetch(
      `https://sistema-notificacao-escolar-back.onrender.com/api/User/UpdateU/${id}`,
    )
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://sistema-notificacao-escolar-back.onrender.com/api/User/UpdateU/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        alert("Usuário atualizado!");
        navigate("/Users");
      }
    } catch (error) {
      console.error("Erro ao atualizar", error);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
      <form onSubmit={handleSalvar} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nome"
        />
        <input
          className="w-full border p-2 rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="E-mail"
        />
        <input
          className="w-full border p-2 rounded"
          value={formData.telefone}
          onChange={(e) =>
            setFormData({ ...formData, telefone: e.target.value })
          }
          placeholder="Telefone"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
