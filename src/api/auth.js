import axios from "./AxiosInstance";

export const useAuthApi = () => {
  const register = async (email, password, nickname) => {
    return await axios.post("/member/register", {
      email,
      password,
      nickname,
    });
  };

  const login = async (email, password) => {
    return await axios.post("/member/login", { email, password });
  };

  const sendEmail = async (email) => {
    return await axios.post("/member/verify-email", { email });
  };

  const verifyEmail = async (code) => {
    return await axios.post("/member/verification-email-code", { code });
  };

  const sendResetEmail = async (email) => {
    return await axios.post("/member/reset-password/request", { email });
  };

  const verifyResetEmail = async (code, newPassword) => {
    return await axios.post("/member/reset-password/confirm", {
      code,
      newPassword,
    });
  };

  const getUserInfo = async () => {
    return await axios.get("/member/user-info");
  };

  return {
    register,
    login,
    sendEmail,
    verifyEmail,
    sendResetEmail,
    verifyResetEmail,
    getUserInfo,
  };
};
export default useAuthApi;
