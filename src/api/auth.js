import axios from "./AxiosInstance";

export const useAuthApi = () => {
  const register = async (email, password, name) => {
    return await axios.post("/api/v1/member/register", {
      email,
      password,
      name,
    });
  };

  const login = async (email, password) => {
    return await axios.post("/api/v1/member/login", { email, password });
  };

  const sendEmail = async (email) => {
    return await axios.post("/api/v1/member/verify-email", { email });
  };

  const verifyEmail = async (code) => {
    return await axios.post("/api/v1/member/verification-email-code", { code });
  };

  const sendResetEmail = async (email) => {
    return await axios.post("/api/v1/member/reset-password/request", { email });
  };

  const verifyResetEmail = async (code, newPassword) => {
    return await axios.post("/api/v1/member/reset-password/confirm", {
      code,
      newPassword,
    });
  };

  return {
    register,
    login,
    sendEmail,
    verifyEmail,
    sendResetEmail,
    verifyResetEmail,
  };
};
export default useAuthApi;
