import { FormikHelpers } from "formik";

export interface UserFromApi {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: "Admin" | "Student" | "Teacher" | "Principal";
  isActive: boolean;
  telefone?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface NotificationValues {
  title: string;
  content: string;
  target: "all" | "specific";
  recipients: SelectOption[];
}

export interface NotificationPayload {
  title: string;
  content: string;
  target: "all" | "specific";
  recipientsIds: string[];
}

export type NotificationFormikHelpers = FormikHelpers<NotificationValues>;
