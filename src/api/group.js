import axios from "@/api/axiosInstance";

export const useGroupApi = () => {
  const groupInfo = async () => {
    return await axios.get("/group-info");
  };

  return {
    groupInfo,
  };
};
export default useGroupApi;
