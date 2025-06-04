import axios from "./AxiosInstance";

export const useAuthApi = () => {
  const signUp = async (email, password, name) => {
    return await axios.post("/api/v1/member/register", {
      email,
      password,
      name,
    });
  };

  const login = async (email, password) => {
    return await axios.post("/api/v1/member/login", { email, password });
  };

  return { signUp, login };
};
export default useAuthApi;
