import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    mode: "login",
  }),
  actions: {
    setMode(newMode) {
      this.mode = newMode;
    },
  },
  persist: true,
});
