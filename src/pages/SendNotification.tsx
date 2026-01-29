import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import NotificationCard from "../Features/notifications/components/NotificationCard";
import NotificationForm from "../Features/notifications/components/NotificationForms";

interface NotificationValues {
  title: string;
  content: string;
  target: "all" | "specific";
  recipients: string[];
}

interface FormObserverProps {
  onChange: (values: NotificationValues) => void;
}

const FormObserver = ({ onChange }: FormObserverProps) => {
  const { values } = useFormikContext<NotificationValues>();

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
};

export default function SendNotificationPage() {
  const [previewValues, setPreviewValues] = useState<NotificationValues>({
    title: "",
    content: "",
    target: "all",
    recipients: [],
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h1 className="text-xl font-bold text-slate-700 mb-4">
            Painel de Disparo
          </h1>
          <Formik
            initialValues={previewValues}
            onSubmit={(values) => console.log("Enviado:", values)}
          >
            <Form>
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
        </section>

        <section className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-700 mb-4 self-start">
            Prévia da Notificação
          </h2>
          <div className="sticky top-8 w-full flex justify-center">
            <NotificationCard
              title={previewValues.title}
              content={previewValues.content}
              type={previewValues.target}
              // 4. Adicione a propriedade 'date' que o componente passou a exigir
              date={new Date()}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
