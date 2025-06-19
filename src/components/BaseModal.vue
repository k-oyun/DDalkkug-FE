<template>
  <div v-if="groupModalStore.isOpen">
    <div
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      @click="
        () => {
          groupModalStore.setIsOpen(false);
        }
      "
    >
      <div
        class="neon-border mt-3 min-w-[350px] rounded-2xl bg-black/80 p-6"
        @click.stop=""
        style="--neon-color: var(--neon-soju-color)"
      >
        <div>
          <BaseGroupCardContent
            class="mt-5 min-h-[120px]"
            :name="groupModalStore.name"
            :description="groupModalStore.description"
            :totalPaid="groupModalStore.totalPaid"
            :memberCount="3"
          />
          <div
            class="neon-border"
            style="--neon-color: #ccc; border: 1px solid"
          ></div>
          <div>{{ groupModalStore.groupName }}</div>
          <div v-for="member in memberList" :key="member.id">
            <label class="peer"></label>
            {{ member.nickname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useGroupApi } from "@/api/group.js";
import { useGroupModalStore } from "@/stores/GroupModal.js";

import BaseGroupCardContent from "./BaseGroupCardContent.vue";

const { members } = useGroupApi();
const groupModalStore = useGroupModalStore();

const memberList = ref([]);

// 같은 그룹 카드를 눌렀을 경우 모든 값이 같으므로 변경하지 않게 설정
// later : case>> 중간에 멤버가 들어왔을 경우? 새로고침이 안됨 즉, 멤버의 수 기준으로 watch를 해야한다
// later : 백엔드 단에서 멤버의 수도 보내줘야겟다
watch(
  () => groupModalStore.getGroupId,
  async (newGroupId) => {
    console.log("BaseModal로 온 GroupId : " + newGroupId);

    // groupId가 변경되었다면 리스트를 먼저 초기화
    memberList.value = [];
    const res = await members(newGroupId);
    memberList.value = res.data.data;
  },
);

onMounted(async () => {});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
