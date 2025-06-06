<template>
  <form class="space-y-6" @submit.prevent="$emit('event:submit', 'login')">
    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >이메일</label
      >

      <BaseInput></BaseInput>
    </div>

    <div>
      <div class="flex items-center justify-between px-3">
        <label
          for="password"
          class="block text-lg/6 font-medium text-white"
          placeholder="1234"
          >비밀번호</label
        >
        <div class="text-sm">
          <a
            href="#"
            class="font-semibold text-white hover:text-gray-500"
            @click="
              () => {
                router.push();
              }
            "
            >기억이 안나십니까?</a
          >
        </div>
      </div>

      <BaseInput></BaseInput>
    </div>

    <div class="px-3 py-3">
      <button
        type="submit"
        class="neon-border flex w-full justify-center rounded-md px-3 py-3 text-lg font-extrabold text-white shadow-xs"
        :style="`--neon-color:${buttonColor}`"
      >
        로그인
      </button>
    </div>
  </form>

  <p
    class="mt-5 overflow-hidden text-center text-lg/5 text-ellipsis whitespace-nowrap text-white"
  >
    아직도 회원이 아니신가요?
    <a
      href="#"
      class="font-semibold overflow-ellipsis text-white hover:text-indigo-500"
      @click="goSign"
      >회원가입하기</a
    >
  </p>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const buttonColor = "#00f0ff";

const emit = defineEmits(["event:submit"]);
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
