import { defineStore } from "pinia";

export const useGroupModalStore = defineStore("group-modal", {
  state: () => ({
    isOpen: false,
    isGroupDelete: false,
    modalState: 0,
    isModify: false,
    groupId: -1,
    leaderId: -1,
    groupName: "",
    description: "",
    totalPaid: 0,
  }),
  actions: {
    setIsOpen(bool) {
      this.isOpen = bool;
    },
    setIsGroupDelete(bool) {
      this.isGroupDelete = bool;
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
  },
  getters: {
    getGroupId: (state) => state.groupId,
  },
  persist: false,
});
export default useGroupModalStore;
