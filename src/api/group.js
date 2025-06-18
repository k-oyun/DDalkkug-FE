import axios from "@/api/axiosInstance";

export const useGroupApi = () => {
  // 전체 그룹 조회
  const groupInfo = async () => {
    return await axios.get("/group-info");
  };

  // 내가 속한 그룹 조회
  const myGroups = async () => {
    return await axios.get("/group-member/my-groups");
  };

  return {
    groupInfo,
    myGroups,
  };
};
export default useGroupApi;
