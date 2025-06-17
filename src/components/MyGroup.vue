<template>
  <!-- 탭 메뉴 -->
  <div class="text-md mb-3 flex space-x-4">
    <BaseButton neonColor="#00ccff">내 그룹</BaseButton>
    <BaseButton neonColor="#00ccff">그룹 가입</BaseButton>
  </div>

  <div
    class="neon-border rounded-full bg-white"
    style="--neon-color: #ffffff; border: 1px solid"
  ></div>

  <!-- 그룹 카드 리스트 -->
  <div class="mt-5 space-y-6">
    <div
      class="grid max-w-96 max-w-full grid-cols-1 items-center gap-6 transition-[max-width] duration-200 ease-in-out md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
    >
      <div v-for="group in groupDatas" :key="group.id">
        <BaseGroupCard
          :name="group.name"
          :description="group.description"
          :totalPaid="group.totalPaid"
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGroupApi } from "@/api/group.js";

const { groupInfo } = useGroupApi();

const groupDatas = ref([]);

// 지금은 모든 그룹을 불러오게 되어있음
onMounted(async () => {
  const res = await groupInfo();
  console.log(res);
  groupDatas.value = res.data.data;
  console.log(groupDatas.value);
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
