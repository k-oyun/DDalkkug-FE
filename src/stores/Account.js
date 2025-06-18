import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    mode: "login",
    email: "",
  }),
  actions: {
    setMode(newMode) {
      this.mode = newMode;
    },
    setEmail(newEmail) {
      this.email = newEmail;
    },
  },
  persist: false,
});
export default useAccountStore;
