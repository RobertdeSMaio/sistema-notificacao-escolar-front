import { Field, Form, Formik } from "formik";
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

      <Formik
        initialValues={userData}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const resp = await fetch(`https://sua-api.com/api/usuario/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          if (resp.ok) alert("Usuário atualizado!");
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm">Nome</label>
            <Field name="nome" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm">E-mail</label>
            <Field name="email" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm">CPF</label>
            <Field
              name="cpf"
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
          </div>

          <button
            type="submit"
            className="bg-[#088395] text-white px-4 py-2 rounded"
          >
            Salvar Alterações
          </button>
        </Form>
      </Formik>
    </div>
  );
}
