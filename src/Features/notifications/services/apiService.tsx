import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5279",
});

export default api;
