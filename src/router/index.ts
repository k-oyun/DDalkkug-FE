import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import MyPage from "../pages/MyPage.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import AccountPage from "../pages/AccountPage.vue";
import SignForm from "../components/forms/SignForm.vue";
import PasswordResetForm from "../components/forms/PasswordResetForm.vue";

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
    children: [{ path: "", name: "sign-mode", component: SignForm }],
  },
  {
    path: "/reset",
    name: "reset",
    component: AccountPage,
    children: [{ path: "", name: "reset-mode", component: PasswordResetForm }],
  },
  { path: "/mypage", name: "MyPage", component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
