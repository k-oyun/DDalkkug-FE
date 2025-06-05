import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.ddalkkug.kro.kr/api/v1",
  //withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token =
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQ5MTE1NjczfQ.CNCzSvPj24gea5QJZVE1ndlr4kf1HnLahpxQM2y__2jM6WII_I7CKnRG18BKrSDh0e9MVIvyokKIzTVALk3eSA";
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // alert("로그인이 필요합니다.");
      router.push("/login"); // SPA 방식으로 이동
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
