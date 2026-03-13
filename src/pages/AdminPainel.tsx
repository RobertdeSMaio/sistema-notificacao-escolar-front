import { Form, Formik, useFormikContext } from "formik";
import { Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import NotificationCard from "../Features/components/NotificationCard";
import NotificationForm from "../Features/components/NotificationForms";
import {
  NotificationFormikHelpers,
  NotificationPayload,
  NotificationValues,
  SelectOption,
  UserFromApi,
} from "../Features/students/Iform";

const FormObserver = ({
  onChange,
}: {
  onChange: (values: NotificationValues) => void;
}) => {
  const { values } = useFormikContext<NotificationValues>();

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
};

export default function AdminPainel() {
  const [targetType, setTargetType] = useState<"all" | "specific">("all");
  const [students, setStudents] = useState<SelectOption[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

  const [previewValues, setPreviewValues] = useState<NotificationValues>({
    title: "",
    content: "",
    target: "all",
    recipients: [] as SelectOption[],
  } as NotificationValues);

  const handlePreviewChange = useCallback((values: NotificationValues) => {
    setPreviewValues(values);
  }, []);

  useEffect(() => {
    async function loadStudents() {
      setIsLoadingStudents(true);
      try {
        const response = await fetch(
          "https://sistema-notificacao-escolar-back.onrender.com/api/User",
        );
        if (response.ok) {
          const data: UserFromApi[] = await response.json();
          const formatted = data
            .filter((u) => u.role === "Student")
            .map((u) => ({
              value: u.id,
              label: `${u.name} - ${u.cpf}`,
            }));
          setStudents(formatted);
        }
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
      } finally {
        setIsLoadingStudents(false);
      }
    }
    loadStudents();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    content: Yup.string().required("A mensagem é obrigatória"),
    recipients: Yup.array().when([], {
      is: () => targetType === "specific",
      then: (schema) => schema.min(1, "Selecione ao menos um aluno").required(),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  const handleSubmit = async (
    values: NotificationValues,
    { resetForm, setSubmitting }: NotificationFormikHelpers,
  ) => {
    const payload: NotificationPayload = {
      title: values.title,
      content: values.content,
      target: targetType,
      recipientsIds:
        targetType === "specific"
          ? values.recipients.map((r: SelectOption) => r.value)
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
        const errorData = await response.json().catch(() => ({}));
        alert(`Erro ao enviar: ${errorData.message || "Verifique os dados."}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-full p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna de Visualização */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700 ml-2">
            Visualização em Tempo Real
          </h3>
          <div className="sticky top-6">
            <NotificationCard
              notification={{ ...previewValues, target: targetType }}
            />
          </div>
        </div>

        <div className="bg-white p-2 rounded-xl">
          <Formik<NotificationValues>
            initialValues={previewValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formikProps) => (
              <Form className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <FormObserver onChange={handlePreviewChange} />

                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Enviar Comunicado
                </h2>

                <NotificationForm
                  {...formikProps}
                  students={students}
                  isLoadingStudents={isLoadingStudents}
                  targetType={targetType}
                  setTargetType={setTargetType}
                />

                <button
                  type="submit"
                  disabled={formikProps.isSubmitting}
                  className={`w-full mt-8 font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-white 
                    ${formikProps.isSubmitting ? "bg-slate-400" : "bg-[#088395] hover:bg-[#066a7a]"}`}
                >
                  <Send size={18} />
                  {formikProps.isSubmitting
                    ? "Enviando..."
                    : "Disparar Notificação"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
