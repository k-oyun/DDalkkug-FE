import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.ddalkkug.kro.kr/api/v1",
  //withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token =
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQ5NTE0NjI2fQ.xeXSBEitIgKstY5MPWCd0S9qQfOP017zLBwvCoLDmLVYlcSRaksEHRCsyz3zexAQ46KpRVyO0v3RGsaFOuL8RQ";
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
