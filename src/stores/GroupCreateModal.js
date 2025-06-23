import { defineStore } from "pinia";

export const useGroupCreateModalStore = defineStore("group-create-modal", {
  state: () => ({
    isOpen: false,
    name: String,
    description: String,
  }),
  actions: {
    setIsOpen(bool) {
      this.isOpen = bool;
    },
    setName(name) {
      this.name = name;
    },
    setDescription(description) {
      this.description = description;
    },
  },
  getters: {},
  persist: false,
});
export default useGroupCreateModalStore;
