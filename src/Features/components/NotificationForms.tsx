import { ErrorMessage, Field, Form, Formik } from "formik";
import { Send, User, Users } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import * as Yup from "yup";

export default function NotificationForm() {
  const [targetType, setTargetType] = useState("all");

  const validationSchema = Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    content: Yup.string().required("O conteúdo da mensagem é obrigatório"),
    recipients: Yup.array().when([], {
      is: () => targetType === "specific",
      then: (schema) => schema.min(1, "Selecione ao menos um aluno").required(),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  const studentsMock = [
    { value: "1", label: "João Silva - 3º Ano A" },
    { value: "2", label: "Maria Oliveira - 1º Ano B" },
  ];

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
              "https://sua-api.com/api/notificacao/enviar", //TODO - Substituir pela URL real do endpoint | criar endpoint no backend
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
            setSubmitting(false); // Libera o botão
          }
        }}
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Seletor de Destinatário */}
            <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setTargetType("all")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${targetType === "all" ? "bg-white shadow-sm text-[#088395]" : "text-slate-500"}`}
              >
                <Users size={18} /> Todos
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setTargetType("specific")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${targetType === "specific" ? "bg-white shadow-sm text-[#088395]" : "text-slate-500"}`}
              >
                <User size={18} /> Específicos
              </button>
            </div>

            {/* Select Condicional */}
            {targetType === "specific" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Selecione o destinatário(s)
                </label>
                <Select
                  isMulti
                  options={studentsMock}
                  className="text-slate-800"
                  isDisabled={isSubmitting}
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

            {/* Título */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Título
              </label>
              <Field
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

            {/* Mensagem */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Mensagem
              </label>
              <Field
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

            {/* Botão de Envio com Feedback */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-white 
                ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-[#088395] hover:bg-[#066a7a]"}`}
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
