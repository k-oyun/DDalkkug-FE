<template>
  <div
    class="h-screen w-full text-white"
    style="background-color: var(--background-color)"
  >
    <div class="flex h-screen">
      <aside class="w-50 border-r border-[#1f0036] p-6 lg:w-64">
        <div class="mb-10 text-2xl font-bold">내 공간</div>
        <nav class="space-y-4">
          <BaseNavItem>
            <template #icon>
              <IconMaterialSymbolsArrowBackIosRounded />
            </template>
            <template #text>홈으로 가기</template>
          </BaseNavItem>
          <BaseNavItem>
            <template #icon>
              <IconMaterialSymbolsGroupOutlineRounded />
            </template>
            <template #text>그룹</template>
          </BaseNavItem>
          <BaseNavItem>
            <template #icon>
              <IconMaterialSymbolsAccountCircleOutline />
            </template>
            <template #text>회원정보</template>
          </BaseNavItem>
        </nav>
      </aside>
      <main class="relative flex-1 overflow-y-auto p-8">
        <!-- 탭 메뉴 -->
        <div class="text-md mb-5 flex space-x-4">
          <BaseButton>내가 가입한 그룹</BaseButton>
          <BaseButton>가입 가능한 그룹</BaseButton>
          <BaseButton>내가 만든 그룹</BaseButton>
        </div>

        <div
          class="neon-border rounded-full bg-white"
          style="--neon-color: #ffffff; border: 1px solid"
        ></div>

        <!-- 그룹 카드 리스트 -->
        <div class="mt-5 space-y-6">
          <div
            class="grid max-w-96 grid-cols-1 items-center gap-6 transition-[max-width] duration-200 ease-in-out sm:max-w-full md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
          >
            <div v-for="i in 10" :key="i">
              <BaseGroupCard
                title="드럼통"
                description="드럼통"
                memberCount="3"
              />
            </div>
          </div>
        </div>

        <!-- <div class="fixed bottom-5 left-5">
          <IconMaterialSymbolsVerifiedOutlineRounded
            class="text-2xl opacity-60"
          />
        </div> -->
      </main>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
