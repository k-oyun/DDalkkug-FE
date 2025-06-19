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

  // 내가 아직 가입하지 않은 그룹 목록 조회
  const notJoinedGroups = async () => {
    return await axios.get("/group-info/not-joined-groups");
  };

  // 내가 리더인 그룹 목록 조회
  const myLeadingGroups = async () => {
    return await axios.get("/group-info/my-leading-groups");
  };

  // Id를 통한 그룹 조회
  const members = async (groupId) => {
    return await axios.get(`/group-member/${groupId}/members`);
  };

  return {
    groupInfo,
    myGroups,
    notJoinedGroups,
    myLeadingGroups,
    members,
  };
};
export default useGroupApi;
