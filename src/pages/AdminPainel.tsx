import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
// O SideBar deve estar FORA da tag <Form> para não bugar a navegação
import SideBar from "../components/layout/SideBar";
import NotificationCard from "../Features/notifications/components/NotificationCard";
import NotificationForm from "../Features/notifications/components/NotificationForms";

interface NotificationValues {
  title: string;
  content: string;
  target: "all" | "specific";
  recipients: string[];
}

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
  const [previewValues, setPreviewValues] = useState<NotificationValues>({
    title: "",
    content: "",
    target: "all",
    recipients: [],
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />
      <div className="w-full flex ">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 p-6">
          <div className="p-10">
            <h1 className="text-xl font-bold text-slate-700 p-10">
              Painel de Disparo de Notificação
            </h1>

            <Formik
              initialValues={previewValues}
              onSubmit={(values) => console.log("Enviado:", values)}
            >
              <Form className="bg-white p-6 rounded-lg shadow-sm">
                <FormObserver
                  onChange={(values) => {
                    setPreviewValues({
                      ...values,
                      target: values.recipients.length > 0 ? "specific" : "all",
                    });
                  }}
                />
                <NotificationForm />
              </Form>
            </Formik>
          </div>

          <section className="mt-10 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-slate-600 mb-4 self-start p-2">
              Prévia
            </h2>
            <div className="w-full max-w-2xl">
              <NotificationCard
                title={previewValues.title}
                content={previewValues.content}
                type={previewValues.target}
                date={new Date()}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
