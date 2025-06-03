import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import LoginPage from "../pages/LoginPage.vue";
import MyPage from "../pages/MyPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/mypage", name: "MyPage", component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
