<template>
  <div class="p-3">
    <div
      class="neon-border relative flex items-start justify-between rounded-xl border p-4 md:items-center"
    >
      <div class="absolute top-3 right-3 z-1 hover:cursor-pointer">
        <IconMaterialSymbolsSettings class="h-6 w-6 opacity-50" />
      </div>
      <div class="w-full">
        <div
          class="relative z-0 flex w-full items-center justify-between space-x-3"
        >
          <div class="relative">
            <div class="max-w-25 p-6">
              <img
                src="@/assets/glass.svg"
                style="
                  filter: drop-shadow(0 0 5px #00f0ff)
                    drop-shadow(0 0 10px #00f0ff);
                "
              />
            </div>
          </div>

          <div class="flex-1">
            <div class="flex flex-col">
              <div>등급 : 소주잔</div>
              <h2 class="text-lg font-bold text-cyan-300">{{ title }}</h2>
              <p class="overflow-clip text-sm whitespace-nowrap text-gray-300">
                ㄴㅇㄹㄴㄹㅇs
              </p>
              <div class="mt-1 text-sm text-white">{{ membe }}</div>
            </div>
          </div>
          <div class="px-3 text-white">멤버 : 5</div>
        </div>

        <div class="absolute right-3 bottom-3 z-1 hover:cursor-pointer">
          <IconMaterialSymbolsExitToAppRounded class="h-6 w-6 opacity-50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  members: String,
});
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
