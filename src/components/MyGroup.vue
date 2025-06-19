<template>
  <!-- 모달창 -->
  <BaseGroupModal />
  <!-- 탭 메뉴 -->
  <div class="text-md mb-3 flex justify-center md:justify-start md:space-x-4">
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-xs"
      :style="{ color: buttonState == 0 ? '#00ccff' : '#d9d9d9' }"
      @click="change(0)"
    >
      내 그룹
    </BaseButton>
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-xs"
      :style="{ color: buttonState == 1 ? '#00ccff' : '#d9d9d9' }"
      @click="change(1)"
    >
      그룹 가입
    </BaseButton>
    <BaseButton
      neonColor="#00ccff"
      class="md:text-md text-xs"
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
            :groupId="group.id"
            :name="group.name"
            :description="group.description"
            :totalPaid="group.totalPaid"
            memberCount="3"
          />
        </div>
      </div>
    </div>
    <div v-else class="flex w-full justify-center pt-10 text-white">
      <IconLineMdLoadingTwotoneLoop class="text-[100px] text-[#00ccff]" />
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

import BaseGroupModal from "./BaseGroupModal.vue";
import { useGroupModalStore } from "@/stores/GroupModal.js";

const { groupInfo, myGroups, notJoinedGroups, myLeadingGroups } = useGroupApi();
const groupModalStore = useGroupModalStore();

const groupDatas = ref([]);

const buttonState = ref(0);

const loading = ref(false);

const change = async (state) => {
  buttonState.value = state;

  let res;
  loading.value = true;
  if (state == 0) {
    res = await myGroups();
    groupModalStore.setModalState(0);
  }

  if (state == 1) {
    res = await notJoinedGroups();
    groupModalStore.setModalState(1);
  }

  if (state == 2) {
    res = await myLeadingGroups();
    groupModalStore.setModalState(2);
  }

  groupDatas.value = res.data.data;
  loading.value = false;
};

// 지금은 모든 그룹을 불러오게 되어있음
onMounted(async () => {
  loading.value = true;
  const res = await myGroups();
  groupDatas.value = res.data.data;
  console.log(groupDatas.value);
  loading.value = false;
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
