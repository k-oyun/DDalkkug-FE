import { defineStore } from "pinia";

export const useGroupModalStore = defineStore("group-modal", {
  state: () => ({
    isOpen: false,
    groupId: -1,
    groupName: "",
    description: "",
    totalPaid: 0,
  }),
  actions: {
    setIsOpen(bool) {
      this.isOpen = bool;
    },
    setGroupId(groupId) {
      this.groupId = groupId;
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
