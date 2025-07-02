<template>
  <div
    class="p-3 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
    @click="setModal"
  >
    <div
      class="neon-border relative flex min-h-[150px] items-start justify-between rounded-xl border bg-black/80 p-4 md:items-center"
      style="--neon-color: var(--neon-soju-color)"
    >
      <!-- <div class="absolute top-3 right-3 z-1 hover:cursor-pointer">
        <IconMaterialSymbolsSettings class="h-6 w-6 opacity-50" />
      </div> -->
      <div class="my-auto w-full">
        <BaseGroupCardContent
          :name="name"
          :description="description"
          :totalPaid="totalPaid"
          :memberCount="memberCount"
        />

        <!-- <div class="absolute right-3 bottom-3 z-1 hover:cursor-pointer">
          <IconMaterialSymbolsExitToAppRounded class="h-6 w-6 opacity-50" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import glass from "@/assets/glass.svg";
import soju from "@/assets/soju.svg";
import pack from "@/assets/pack.svg";

import { useGroupModalStore } from "@/stores/GroupModal.js";

import BaseGroupCardContent from "@/components/BaseGroupCardContent.vue";

const props = defineProps({
  groupId: Number,
  leaderId: Number,
  name: String,
  description: String,
  totalPaid: Number,
  memberCount: Number,
});

const groupModalStore = useGroupModalStore();

const setModal = () => {
  groupModalStore.setIsOpen(true);
  console.log("그룹 카드에서의 GroupId : " + props.groupId);
  console.log("그룹 카드에서의 leaderId : " + props.leaderId);
  groupModalStore.setGroupId(props.groupId);
  groupModalStore.setLeaderId(props.leaderId);
  groupModalStore.setGroupName(props.name);
  groupModalStore.setDescription(props.description);
  groupModalStore.setTotalPaid(props.totalPaid);
  groupModalStore.setMemberCount(props.memberCount);
};
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";

* {
  overflow: visible;
}
</style>
