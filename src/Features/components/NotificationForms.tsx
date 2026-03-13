import { ErrorMessage, Field, FormikProps } from "formik";
import { User, Users } from "lucide-react";
import Select from "react-select";
import { NotificationValues, SelectOption } from "../students/Iform";

interface NotificationFormProps extends FormikProps<NotificationValues> {
  students: SelectOption[];
  isLoadingStudents: boolean;
  targetType: "all" | "specific";
  setTargetType: (type: "all" | "specific") => void;
}

export default function NotificationForm({
  values,
  setFieldValue,
  errors,
  touched,
  isSubmitting,
  students,
  isLoadingStudents,
  targetType,
  setTargetType,
}: NotificationFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            setTargetType("all");
            setFieldValue("recipients", []);
          }}
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
            options={students}
            isLoading={isLoadingStudents}
            loadingMessage={() => "Carregando alunos..."}
            placeholder="Digite o nome para buscar..."
            className="text-slate-800"
            isDisabled={isSubmitting}
            value={values.recipients}
            onChange={(val) => setFieldValue("recipients", val)}
            noOptionsMessage={() => "Nenhum aluno encontrado"}
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
          placeholder="Ex: Reunião de Pais"
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
          rows={4}
          disabled={isSubmitting}
          placeholder="Digite o comunicado aqui..."
          className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#088395] outline-none disabled:bg-slate-50"
        />
        <ErrorMessage
          name="content"
          component="div"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
}
