<template>
  <div
    class="h-screen w-full text-white"
    style="background-color: var(--background-color)"
  >
    <div class="flex h-screen">
      <aside class="w-64 border-r border-[#1f0036] p-6">
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
      <main class="flex-1 p-8">
        <!-- 탭 메뉴 -->
        <div class="mb-5 flex space-x-4">
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
            <BaseGroupCard
              title="드럼통"
              description="드럼통"
              members="멕시칸?"
            />
            <BaseGroupCard
              title="주말 와인 모임"
              description="쮸톤 코오릿 칏인 시흠췌"
              members="유진 서연 도요"
            />
            <BaseGroupCard
              title="맥주 탐방"
              description="륔대 안쬬광 드이"
              members="민재"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
