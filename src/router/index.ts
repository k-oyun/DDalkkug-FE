import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Main from "../pages/Main.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import AccountPage from "../pages/AccountPage.vue";
import SignForm from "../components/forms/SignForm.vue";
import EmailVerifyForm from "@/components/forms/EmailVerifyForm.vue";
import PostList from "../pages/PostList.vue";
import PostDetail from "../pages/PostDetail.vue";
import PostCreate from "../pages/PostCreate.vue";
// 추후 ts 전환
// @ts-ignore
import { useAccountStore } from "@/stores/Account.js";
import MyGroup from "@/components/MyGroup.vue";
import MySpace from "@/pages/MySpace.vue";
import MyPage from "@/components/MyPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requiresAuth: true },
  },
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
  {
    path: "/myspace",
    name: "MySpace",
    component: MySpace,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "MyGroup",
        component: MyGroup,
        meta: { requiresAuth: true },
      },
      {
        path: "mypage",
        name: "Mypage",
        component: MyPage,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/posts",
    name: "Posts",
    component: PostList,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/date/:date",
    name: "PostsDate",
    component: PostList,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/new",
    name: "PostCreate",
    component: PostCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostCreate,
    meta: { requiresAuth: true },
  },
  // { path: "/posts", name: "Posts", component: PostList },
  // { path: "/posts/:id", name: "PostDetail", component: PostDetail },
  // { path: "/posts/new", name: "PostCreate", component: PostCreate },
  // { path: "/posts/:id/edit", name: "PostEdit", component: PostCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 로그인이 안될시에 로그인페이지로 돌아가게함
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("accessToken") != null;
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("login");
  } else {
    next();
  }
});

export default router;
