<template>
  <div v-if="groupCreateModalStore.isOpen">
    <div
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      @click="
        () => {
          groupCreateModalStore.setIsOpen(false);
        }
      "
    >
      <div @click.stop="" class="neon-border space-y-3 rounded bg-black/80 p-6">
        <div class="text-center text-xl">그룹 생성</div>
        <div
          class="neon-border"
          style="--neon-color: #fff; border: 1px solid"
        ></div>
        <div class="text-center">그룹 이름</div>
        <BaseInput v-model="groupName"></BaseInput>
        <div class="text-center">그룹 설명</div>
        <BaseInput v-model="groupDescription"></BaseInput>

        <div class="flex items-center justify-center">
          <BaseButton @click="sendCreate">생성</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGroupCreateModalStore } from "@/stores/GroupCreateModal.js";
import { useGroupApi } from "@/api/group.js";

const groupCreateModalStore = useGroupCreateModalStore();

const { groupCreate } = useGroupApi();

const groupName = ref("");
const groupDescription = ref("");

const sendCreate = async () => {
  await groupCreate(groupName.value, groupDescription.value);
  groupName.value = "";
  groupDescription.value = "";
  groupCreateModalStore.setIsOpen(false);
  console.log("성공");
};
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
