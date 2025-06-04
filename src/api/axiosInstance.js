import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.ddalkkug.kro.kr",
  // withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("로그인이 필요합니다."); // SPA 방식으로 이동
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
