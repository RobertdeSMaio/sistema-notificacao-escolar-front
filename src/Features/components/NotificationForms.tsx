import { ErrorMessage, Field, Form, Formik } from "formik";
import { Send, User, Users } from "lucide-react";
import { useEffect, useState } from "react"; // Adicionado useEffect
import Select from "react-select";
import * as Yup from "yup";

export default function NotificationForm() {
  const [targetType, setTargetType] = useState("all");
  const [students, setStudents] = useState([]); // Estado para alunos reais
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

  // Busca os alunos do banco de dados ao carregar o componente
  useEffect(() => {
    async function fetchStudents() {
      setIsLoadingStudents(true);
      try {
        const response = await fetch(
          "https://sistema-notificacao-escolar-back.onrender.com/api/User",
        );
        if (response.ok) {
          const data = await response.json();
          // Mapeia apenas usuários com a role 'Student' para o formato do React-Select
          const formattedStudents = data
            .filter((u) => u.role === "Student")
            .map((u) => ({
              value: u.id,
              label: `${u.name} - CPF: ${u.cpf}`,
            }));
          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Erro ao carregar estudantes:", error);
      } finally {
        setIsLoadingStudents(false);
      }
    }

    fetchStudents();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    content: Yup.string().required("O conteúdo da mensagem é obrigatório"),
    recipients: Yup.array().when([], {
      is: () => targetType === "specific",
      then: (schema) => schema.min(1, "Selecione ao menos um aluno").required(),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Enviar Comunicado
      </h2>

      <Formik
        initialValues={{ title: "", content: "", recipients: [] }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          const payload = {
            title: values.title,
            content: values.content,
            target: targetType,
            recipientsIds:
              targetType === "specific"
                ? values.recipients.map((r) => r.value)
                : [],
          };

          try {
            const response = await fetch(
              "https://sistema-notificacao-escolar-back.onrender.com/api/Notification/Post",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              },
            );

            if (response.ok) {
              alert("Notificação enviada com sucesso!");
              resetForm();
              setTargetType("all");
            } else {
              alert("Erro ao enviar a notificação.");
            }
          } catch (error) {
            console.error("Erro na rede:", error);
            alert("Não foi possível conectar ao servidor.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setTargetType("all")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${
                  targetType === "all"
                    ? "bg-white shadow-sm text-[#088395]"
                    : "text-slate-500"
                }`}
              >
                <Users size={18} /> Todos
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setTargetType("specific")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${
                  targetType === "specific"
                    ? "bg-white shadow-sm text-[#088395]"
                    : "text-slate-500"
                }`}
              >
                <User size={18} /> Específicos
              </button>
            </div>

            {targetType === "specific" && (
              <div className="space-y-2">
                <label
                  htmlFor="recipients-select"
                  className="block text-sm font-medium text-slate-700"
                >
                  Selecione o destinatário(s)
                </label>
                <Select
                  id="recipients-select"
                  instanceId="recipients-select"
                  isMulti
                  options={students} // Usando alunos do banco
                  isLoading={isLoadingStudents}
                  loadingMessage={() => "Carregando alunos..."}
                  className="text-slate-800"
                  isDisabled={isSubmitting || isLoadingStudents}
                  onChange={(val) => setFieldValue("recipients", val)}
                  placeholder="Selecione os alunos..."
                />
                {errors.recipients && touched.recipients && (
                  <div className="text-red-500 text-xs">
                    {String(errors.recipients)}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Título
              </label>
              <Field
                id="title"
                name="title"
                disabled={isSubmitting}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#088395] outline-none disabled:bg-slate-50"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-slate-700"
              >
                Mensagem
              </label>
              <Field
                id="content"
                as="textarea"
                name="content"
                rows="4"
                disabled={isSubmitting}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#088395] outline-none disabled:bg-slate-50"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-white 
                ${
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-[#088395] hover:bg-[#066a7a]"
                }`}
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send size={18} /> Disparar Notificação
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
