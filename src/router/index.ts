import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import MyPage from "../pages/MyPage.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import AccountPage from "../pages/AccountPage.vue";
import SignForm from "../components/forms/SignForm.vue";
import EmailVerifyForm from "@/components/forms/EmailVerifyForm.vue";
import PasswordResetForm from "../components/forms/PasswordResetForm.vue";
// 추후 ts 전환
// @ts-ignore
import { useAccountStore } from "@/stores/Account.js";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "login",
    component: AccountPage,
    children: [{ path: "", name: "login-mode", component: LoginForm }],
  },
  {
    path: "/sign",
    name: "sign",
    component: AccountPage,
    children: [
      { path: "verify", name: "sign-verify", component: EmailVerifyForm },
      {
        path: "verified-sign",
        name: "verified-sign",
        component: SignForm,
        // URL 입력을 통한 접근 방지
        beforeEnter: () => {
          const accountStore = useAccountStore();
          if (accountStore == null || accountStore.email == "") {
            return { name: "sign-verify" };
          }
        },
      },
    ],
  },
  {
    path: "/reset",
    name: "reset",
    component: AccountPage,
    children: [
      { path: "verify", name: "reset-verify", component: EmailVerifyForm },
    ],
  },
  { path: "/mypage", name: "MyPage", component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
