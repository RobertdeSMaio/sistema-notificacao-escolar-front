import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Classes from "../Features/components/Classes";
import NotificationForm from "../Features/components/NotificationForms";

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
    const timeout = setTimeout(() => {
      onChange(values);
    }, 10);

    return () => clearTimeout(timeout);
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
    <main className="min-h-full flex-1">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 p-6">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
          <Classes />
        </div>
        <div className="p-10">
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
        </div>
      </div>
    </main>
  );
}
