import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth",
//   baseURL: "https://api.alphaassets.biz/public/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    localStorage.removeItem("access_token");
    const navigate = useNavigate();
    navigate("/login");
  }
);

export default api;
