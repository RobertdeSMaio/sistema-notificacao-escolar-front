import axios from "axios";

const api = axios.create({
  baseURL: "https://sistema-notificacao-escolar-back.onrender.com/index.html",
});

export default api;
