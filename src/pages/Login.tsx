import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logoEscola from "../public/Assets/escola.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo mens 6 caracteres")
      .required("A senha é obrigatória"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      console.log("Dados do login:", values);
      const payload = {
        Email: values.email,
        Password: values.password,
      };
      try {
        const response = await axios.post(
          "https://sistema-notificacao-escolar-back.onrender.com/api/user/login",
          payload,
        );

        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } catch (error) {
        console.log("Erro no login", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          actions.setErrors({
            email: "E-mail ou senha incorretos",
          });
        } else {
          actions.setErrors({
            email:
              "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
          });
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <main className="shadow-md flex min-h-screen">
        <div className="bg-[#31A8A8] p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-black p-30 mb-6 text-center">
            <img src={logoEscola} alt="Login" />
          </h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Campo E-mail */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className={`p-2 bg-gray-100 border rounded-lg outline-none shadow-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-xs">
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col gap-1 mb-6">
              <label htmlFor="password">Senha</label>

              {/* O container do input e do botão precisa ser relative e NÃO ter flex-col */}
              <div className="relative flex items-center">
                <input
                  id="password"
                  {...formik.getFieldProps("password")}
                  // O type vem DEPOIS do getFieldProps para garantir que o estado mande
                  type={showPassword ? "text" : "password"}
                  className={`w-full bg-gray-100 p-2 border rounded-md outline-none pr-12 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 z-10 p-1 text-xs font-bold bg-gray-100 hover:text-gray-800"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-xs">
                  {formik.errors.password ===
                  "A senha deve ter pelo mens 6 caracteres"
                    ? "A senha deve ter pelo menos 6 caracteres"
                    : formik.errors.password}
                </span>
              )}
            </div>
            <div className="space-x-59">
              <button
                type="submit"
                disabled={formik.isSubmitting} // Desabilita o botão durante o envio
                className={`mt-2 bg-gray-300 text-white p-2 rounded-md font-bold hover:bg-gray-600 transition-colors ${
                  formik.isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-white hover:bg-gray-600"
                }`}
              >
                {formik.isSubmitting ? "Entrando..." : "Entrar"}
              </button>
              <Link to="/register">
                <button className="mt-2 bg-gray-300 text-white p-2 rounded-md font-bold hover:bg-gray-600 transition-colors">
                  Registrar
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:flex h-screen w-full items-center justify-center p-10 text-center text-[#0A96A6]">
          <h2 className="text-2xl font-bold">
            "É a educação que faz o futuro parecer um lugar de esperança e
            transformação”. - Marianna Moreno
          </h2>
        </div>
      </main>
    </>
  );
}
