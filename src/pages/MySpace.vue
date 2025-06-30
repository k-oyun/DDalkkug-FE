<template>
  <div
    class="h-screen w-full text-white"
    style="background-color: var(--background-color)"
  >
    <div class="flex h-screen">
      <aside class="hidden w-50 border-r border-[#1f0036] p-6 md:block lg:w-64">
        <div class="mb-10 text-2xl font-bold">내 공간</div>
        <nav class="space-y-4">
          <BaseNavItem>
            <template #icon>
              <IconMaterialSymbolsArrowBackIosRounded />
            </template>
            <template #text>
              <router-link to="/main">홈으로 가기</router-link>
            </template>
          </BaseNavItem>
          <BaseNavItem
            @click="
              () => {
                router.push('/myspace');
              }
            "
            :active="isGroupActive"
          >
            <template #icon>
              <IconMaterialSymbolsGroupOutlineRounded />
            </template>
            <template #text>그룹</template>
          </BaseNavItem>
          <BaseNavItem
            @click="
              () => {
                router.push('/myspace/mypage');
              }
            "
            :active="isMyPageActive"
          >
            <template #icon>
              <IconMaterialSymbolsAccountCircleOutline />
            </template>
            <template #text>회원정보</template>
          </BaseNavItem>
        </nav>
      </aside>
      <main class="relative flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

const isGroupActive = computed(() => route.path === "/myspace");
const isMyPageActive = computed(() => route.path === "/myspace/mypage");
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
