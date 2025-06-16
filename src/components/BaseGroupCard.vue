<template>
  <div class="p-3">
    <div
      class="neon-border relative flex min-h-[150px] items-start justify-between rounded-xl border p-4 md:items-center"
    >
      <div class="absolute top-3 right-3 z-1 hover:cursor-pointer">
        <IconMaterialSymbolsSettings class="h-6 w-6 opacity-50" />
      </div>
      <div class="w-full">
        <div class="relative z-0 flex w-full items-center justify-between">
          <div class="hidden lg:block">
            <div class="w-[100px] p-6">
              <img
                src="@/assets/glass.svg"
                style="
                  filter: drop-shadow(0 0 5px #00f0ff)
                    drop-shadow(0 0 10px #00f0ff);
                "
              />
            </div>
          </div>

          <div class="ml-3 h-full flex-1 truncate">
            <div class="flex flex-col">
              <div
                class="group absolute -top-1 flex space-x-1 text-sm font-semibold text-gray-300"
              >
                <span class="relative flex items-center justify-center">
                  <IconMaterialSymbolsVerifiedOutlineRounded class="h-4 w-4" />
                  <span
                    class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 truncate rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    해당 그룹의 등급입니다
                  </span>
                </span>
                <span>소주잔</span>
              </div>
              <h2 class="truncate text-lg font-bold text-cyan-300">
                {{ title }}
              </h2>
              <p
                class="truncate overflow-clip text-sm whitespace-nowrap text-gray-100"
              >
                {{ description }}
              </p>
              <div class="mt-1 text-sm text-white">{{ members }}</div>
              <div class="truncate text-2xl font-bold text-cyan-300">
                1,000,000
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
  memberCount: String,
});
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
