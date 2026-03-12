import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuarioCompletoOriginal, setUsuarioCompletoOriginal] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      telefone: "",
      cpf: "",
      role: "",
    },
    onSubmit: async (values) => {
      const payload = { ...usuarioCompletoOriginal, ...values, id: id };
      try {
        const response = await fetch(
          `https://sistema-notificacao-escolar-back.onrender.com/api/User/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          alert("Usuário atualizado!");
          navigate("/Users");
        } else {
          const errorDetail = await response.json();
          console.error("Detalhes do erro 400:", errorDetail);
          alert("Erro ao atualizar usuário. Verifique os dados.");
        }
      } catch (error) {
        console.error("Erro ao atualizar", error);
      }
    },
  });

  useEffect(() => {
    if (id) {
      fetch(
        `https://sistema-notificacao-escolar-back.onrender.com/api/User/${id}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setUsuarioCompletoOriginal(data);

          formik.setValues({
            name: data.name || "",
            email: data.email || "",
            cpf: data.cpf || "",
            telefone: data.telefone || "",
            role: data.role || "",
          });
        })
        .catch((err) => console.error("Erro ao buscar usuário", err));
    }
  }, [id]);

  return (
    <div className="p-8 min-h-screen mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            name="name"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="E-mail"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            name="cpf"
            type="cpf"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.cpf}
            placeholder="CPF"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            name="telefone"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.telefone}
            placeholder="Telefone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Função
          </label>
          <input
            name="role"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.role}
            placeholder="Admin, Parent, Student, Teacher, Principal"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`px-4 py-2 rounded text-white transition ${
              formik.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {formik.isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/Users")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
