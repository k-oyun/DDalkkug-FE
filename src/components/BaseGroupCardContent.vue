<template>
  <div class="relative z-0 flex w-full items-center justify-between">
    <div class="hidden lg:block">
      <div class="h-auto w-[100px] p-6">
        <img
          class="h-auto max-h-[80px] w-full object-contain"
          :src="stageImagePath"
          style="
            filter: drop-shadow(0 0 5px var(--neon-soju-color))
              drop-shadow(0 0 10px var(--neon-soju-color))
              drop-shadow(0 0 15px var(--neon-soju-color));
          "
        />
      </div>
    </div>

    <div class="ml-3 h-full flex-1 truncate">
      <div class="flex flex-col">
        <div
          class="group absolute -top-0.5 -mt-3 flex space-x-1 text-xs font-semibold text-gray-300 lg:mt-0"
        >
          <span class="relative flex items-center justify-center">
            <IconMaterialSymbolsVerifiedOutlineRounded class="h-4 w-4" />
            <span
              class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 truncate rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              해당 그룹의 등급입니다
            </span>
          </span>
          <span>{{ stage }}</span>
        </div>
        <div class="truncate text-xl font-bold text-white">
          {{ name }}
        </div>
        <p
          class="truncate overflow-clip text-sm whitespace-nowrap text-gray-100"
        >
          {{ description }}
        </p>
        <!-- <div class="mt-1 text-sm text-white">{{ members }}</div> -->
        <div
          class="truncate text-2xl font-bold"
          style="color: var(--neon-soju-color)"
        >
          {{ totalPaid.toLocaleString() }}
        </div>
      </div>
    </div>
    <div class="mr-5 flex space-x-2 text-gray-300">
      <span class="text-xl">
        {{ memberCount }}
      </span>
      <span class="text-2xl"><IconMaterialSymbolsGroupRounded /></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import glass from "@/assets/glass.svg";
import soju from "@/assets/soju.svg";
import pack from "@/assets/pack.svg";

const props = defineProps({
  name: String,
  description: String,
  totalPaid: Number,
  memberCount: String,
});

const stageList = [
  [glass, "소주잔"],
  [soju, "소주병"],
  [pack, "소주짝"],
];

const calStage = (totalPaid) => {
  if (totalPaid < 10000) return 0;

  if (totalPaid < 5000000) return 1;

  return 2;
};

const stage = computed(() => {
  const calResult = stageList[calStage(props.totalPaid)][1];
  return calResult == null ? "" : calResult;
});
const stageImagePath = computed(() => {
  console.log(props.totalPaid);
  const calResult = stageList[calStage(props.totalPaid)][0];
  return calResult ?? "";
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
