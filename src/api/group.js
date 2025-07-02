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

  // (그룹장만 가능) groupId를 가지고 그룹삭제
  const deleteGroup = async (groupId) => {
    return await axios.delete(`/group-info/id/${groupId}`);
  };

  // (그룹장만 가능) 멤버 삭제
  const deleteGroupMember = async (groupId, memberId) => {
    return await axios.delete(`/group-member/${groupId}/members/${memberId}`);
  };

  // 그룹 생성
  const groupCreate = async (name, desciption) => {
    return await axios.post("/group-info", { name, desciption });
  };

  // 그룹 가입
  const groupEnter = async (groupId) => {
    return await axios.post(`/group-member/${groupId}/members`);
  };

  // 그룹 탈퇴
  const groupExit = async (groupId) => {
    return await axios.delete(`/group-member/quit/${groupId}`);
  };
  return {
    groupInfo,
    myGroups,
    notJoinedGroups,
    myLeadingGroups,
    members,
    deleteGroup,
    deleteGroupMember,
    groupCreate,
    groupEnter,
    groupExit,
  };
};
export default useGroupApi;
