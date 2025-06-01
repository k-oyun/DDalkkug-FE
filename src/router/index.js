import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import PostList from "../components/PostList.vue";
import PostDetail from "../components/PostDetail.vue";
import PostCreate from "../components/PostCreate.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/posts",
    component: PostList,
  },
  {
    path: "/posts/:id",
    component: PostDetail,
  },
  {
    path: "/posts/new",
    component: PostCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
