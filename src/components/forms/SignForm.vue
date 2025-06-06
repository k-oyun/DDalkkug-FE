<template>
  <form class="space-y-6" @submit.prevent="">
    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >이메일</label
      >

      <BaseInput></BaseInput>
    </div>

    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >비밀번호</label
      >

      <BaseInput></BaseInput>
    </div>

    <div class="px-3 py-3">
      <button
        type="submit"
        class="neon-border flex w-full justify-center rounded-md px-3 py-3 text-lg font-extrabold text-white shadow-xs"
        :style="`--neon-color:${neonColor}`"
      >
        이메일 확인
      </button>
    </div>
  </form>
</template>

<script setup>
import BaseInput from "../BaseInput.vue";

const neonColor = "#00f0ff";
</script>

<style scoped>
@import "../../styles/neon.css";
</style>
