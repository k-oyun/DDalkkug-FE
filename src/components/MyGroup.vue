<template>
  <!-- 탭 메뉴 -->
  <div
    class="text-md mb-3 flex justify-center space-x-1.5 md:justify-start md:space-x-4"
  >
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-sm"
      :style="{ color: buttonState == 0 ? '#00ccff' : '#d9d9d9' }"
      @click="change(0)"
    >
      내 그룹
    </BaseButton>
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-sm"
      :style="{ color: buttonState == 1 ? '#00ccff' : '#d9d9d9' }"
      @click="change(1)"
    >
      그룹 가입
    </BaseButton>
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-sm"
      :style="{ color: buttonState == 2 ? '#00ccff' : '#d9d9d9' }"
      @click="change(2)"
    >
      만든 그룹 관리
    </BaseButton>
  </div>

  <div
    class="neon-border rounded-full bg-white"
    style="--neon-color: #ffffff; border: 1px solid"
  ></div>

  <!-- 그룹 카드 리스트 -->
  <div class="mt-5 space-y-6">
    <div v-if="!loading">
      <div
        class="grid max-w-full grid-cols-1 items-center gap-6 transition-[max-width] duration-200 ease-in-out md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
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
    <div v-else class="flex w-full justify-center pt-10 text-white">
      <IconLineMdLoadingTwotoneLoop class="text-[100px] text-blue-900" />
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

const { groupInfo, myGroups } = useGroupApi();

const groupDatas = ref([]);

const buttonState = ref(0);

const loading = ref(false);

const change = (state) => {
  buttonState.value = state;

  loading.value = true;
  if (state == 1) {
  }
  loading.value = false;
};

// 지금은 모든 그룹을 불러오게 되어있음
onMounted(async () => {
  loading.value = true;
  const res = await myGroups();
  console.log(res);
  groupDatas.value = res.data.data;
  console.log(groupDatas.value);
  loading.value = false;
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
