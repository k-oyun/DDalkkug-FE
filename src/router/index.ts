import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Main from "../pages/Main.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import AccountPage from "../pages/AccountPage.vue";
import SignForm from "../components/forms/SignForm.vue";
import EmailVerifyForm from "@/components/forms/EmailVerifyForm.vue";
// 추후 ts 전환
// @ts-ignore
import { useAccountStore } from "@/stores/Account.js";
import MyGroup from "@/components/MyGroup.vue";
import MySpace from "@/pages/MySpace.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  { path: "/main", name: "Main", component: Main },
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
  { path: "/myspace", name: "MySpace", component: MySpace },
  { path: "/mygroup", name: "MyGroup", component: MyGroup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
