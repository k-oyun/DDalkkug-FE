import { defineStore } from "pinia";

export const useGroupModalStore = defineStore("group-modal", {
  state: () => ({
    isOpen: false,
    isGroupDelete: false,
    isNeedGroupRefresh: false,
    modalState: 0,
    isModify: false,
    groupId: -1,
    leaderId: -1,
    groupName: "",
    description: "",
    totalPaid: 0,
    memberCount: 0,
  }),
  actions: {
    setIsOpen(bool) {
      this.isOpen = bool;
    },
    setIsGroupDelete(bool) {
      this.isGroupDelete = bool;
    },
    setIsNeedGroupRefresh(bool) {
      this.isNeedGroupRefresh = bool;
    },
    setModalState(state) {
      this.modalState = state;
    },
    setIsModify(bool) {
      this.isModify = bool;
    },
    setGroupId(groupId) {
      this.groupId = groupId;
    },
    setLeaderId(leaderId) {
      this.leaderId = leaderId;
    },
    setGroupName(groupName) {
      this.groupName = groupName;
    },
    setDescription(description) {
      this.description = description;
    },
    setTotalPaid(totalPaid) {
      this.totalPaid = totalPaid;
    },
    setMemberCount(memberCount) {
      this.memberCount = memberCount;
    },
  },
  getters: {
    getGroupId: (state) => state.groupId,
  },
  persist: false,
});
export default useGroupModalStore;
