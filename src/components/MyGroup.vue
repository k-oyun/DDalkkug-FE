<template>
  <!-- 그룹 모달창 -->
  <BaseGroupModal />

  <!-- 그룹생성 모달창 -->
  <BaseGroupCreateModal />
  <div class="overflow-y-auto p-3 md:p-6">
    <!-- 탭 메뉴 -->
    <div class="text-md mb-3 flex justify-center md:justify-start md:space-x-4">
      <BaseButton
        neonColor="#00ccff"
        class="md:text-md text-xs"
        :style="{ color: buttonState == 0 ? '#00ccff' : '#d9d9d9' }"
        @click="change(0)"
      >
        가입한 그룹
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
        나의 그룹 관리
      </BaseButton>
    </div>

    <div
      class="neon-border rounded-full bg-white"
      style="--neon-color: #ffffff; border: 1px solid"
    ></div>

    <div class="mt-5 space-y-6">
      <div v-if="!loading">
        <div
          class="grid max-w-full grid-cols-1 items-center gap-6 transition-[max-width] duration-200 ease-in-out md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        >
          <div v-for="group in groupDatas" :key="group.id">
            <BaseGroupCard
              :groupId="group.id"
              :leaderId="group.leaderId"
              :name="group.name"
              :description="group.description"
              :totalPaid="group.totalPaid"
              :memberCount="group.memberCount"
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

    <div v-if="buttonState == 2" class="fixed right-5 bottom-5 text-white">
      <IconMdiPlusCircle
        class="h-15 w-15 opacity-50"
        @click="() => groupCreateModalStore.setIsOpen(true)"
      ></IconMdiPlusCircle>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useGroupApi } from "@/api/group.js";

import BaseGroupModal from "./BaseGroupModal.vue";
import BaseGroupCreateModal from "./BaseGroupCreateModal.vue";
import { useGroupModalStore } from "@/stores/GroupModal.js";
import { useGroupCreateModalStore } from "@/stores/GroupCreateModal.js";

const { groupInfo, myGroups, notJoinedGroups, myLeadingGroups } = useGroupApi();
const groupModalStore = useGroupModalStore();
const groupCreateModalStore = useGroupCreateModalStore();

const groupDatas = ref([]);

const buttonState = ref(0);

const loading = ref(false);

const groupState = ref(0);

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

// 그룹 목록을 다시 불러와야할 때 처리하는 메소드
watch(
  () => groupModalStore.isNeedGroupRefresh,
  async (isNeedGroupRefresh) => {
    // true가 아닐때는 바로 반환
    if (isNeedGroupRefresh === false) return;

    const modalState = groupModalStore.modalState;
    console.log("그룹 목록 새로고침 시행");
    let res;
    loading.value = true;
    switch (modalState) {
      case 0:
        res = await myGroups();
        break;
      case 1:
        res = await notJoinedGroups();
        break;
      case 2:
        res = await myLeadingGroups();
        break;

      default:
        console.log("알맞는 그룹 상태가 없습니다");
    }

    groupDatas.value = res.data.data;
    loading.value = false;
    groupModalStore.setIsNeedGroupRefresh(false);
  },
);

// 모달에서 그룹을 삭제했을 경우 그룹 리스트를 다시 불러옴
watch(
  () => useGroupModalStore.isGroupDelete,
  async (isGroupDelete) => {
    if (isGroupDelete) {
      // 어차피 그룹관리에서만 삭제 되니깐 이걸로 고정
      const res = await myLeadingGroups();
      groupDatas.value = res.data.data;
      useGroupModalStore.setIsGroupDelete(false);
    }
  },
);

// 지금은 모든 그룹을 불러오게 되어있음
onMounted(async () => {
  loading.value = true;
  const res = await myGroups();
  groupDatas.value = res.data.data;
  console.log("MyGroup.vue 받은 데이터");
  console.log(res.data.data);
  loading.value = false;
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
