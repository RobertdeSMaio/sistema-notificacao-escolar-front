import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  // Estados para controlar a visibilidade de cada campo de senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Obrigatório"),
      cpf: Yup.string()
        .matches(/^\d{11}$/, "O CPF deve conter 11 dígitos numéricos")
        .required("Obrigatório"),
      email: Yup.string().email("E-mail inválido").required("Obrigatório"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("Obrigatório"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas não conferem")
        .required("Obrigatório"),
    }),
    onSubmit: (values) => {
      console.log("Dados prontos para o Banco:", values);

      navigate("/");
    },
  });

  return (
    <main className="bg-gray-100 shadow-md flex min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#31A8A8] p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col"
      >
        <h1 className="text-2xl font-bold text-black p-5 text-center">
          Register
        </h1>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            {...formik.getFieldProps("name")}
            className={`p-2 bg-gray-100 border rounded-lg outline-none shadow-sm transition-all ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300 focus:border-gray-500"
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-xs">{formik.errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            {...formik.getFieldProps("cpf")}
            className={`p-2 bg-gray-100 border rounded-lg outline-none shadow-sm transition-all ${
              formik.touched.cpf && formik.errors.cpf
                ? "border-red-500"
                : "border-gray-300 focus:border-gray-500"
            }`}
          />
          {formik.touched.cpf && formik.errors.cpf && (
            <span className="text-red-500 text-xs">{formik.errors.cpf}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            className={`p-2 bg-gray-100 border rounded-lg outline-none shadow-sm transition-all ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300 focus:border-gray-500"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs">{formik.errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...formik.getFieldProps("password")}
              className={`w-full bg-gray-100 p-2 border rounded-md outline-none shadow-sm transition-all ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
            />
            <button
              type="button" // Essencial para não submeter o form ao clicar
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 hover:text-gray-800"
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-xs">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Campo Repetir Senha */}
        <div className="flex flex-col gap-1 mb-10">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Repetir senha
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className={`w-full p-2 border bg-gray-100 rounded-md outline-none shadow-sm transition-all ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-sky-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-500 text-white p-2 rounded-md font-bold hover:bg-gray-600 transition-colors shadow-md"
        >
          Registrar
        </button>
      </form>

      <div className="flex h-screen w-full items-center justify-center p-10 text-center text-[#0A96A6]">
        <h2 className="text-2xl font-bold">
          "É a educação que faz o futuro parecer um lugar de esperança e
          transformação”. Marianna Moreno"
        </h2>
      </div>
    </main>
  );
}
