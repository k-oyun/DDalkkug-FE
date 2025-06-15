<script setup>
import BaseInput from "@/components/BaseInput.vue";
import { ref } from "vue";
const isModalOn = ref(false);
const isEmailVerifyOn = ref(false);
</script>

<template>
  <div class="flex w-full justify-end">
    <div
      v-if="isModalOn"
      class="absolute z-50 flex h-screen w-full flex-col items-center justify-center"
    >
      <div
        class="flex h-[300px] w-[500px] flex-col items-center justify-center rounded-[10px] border-1 bg-[#030015] text-white"
        style="
          box-shadow:
            0 0 5px 3px #f148fb,
            inset 0 0 5px #f148fb,
            inset 0 0 10px #f148fb;
        "
      >
        <button
          v-if="!isEmailVerifyOn"
          class="h-[40px] w-[100px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 text-[12px] transition-all duration-500 ease-in-out"
          style="
            box-shadow:
              0 0 5px 3px #00aa00,
              inset 0 0 5px #00aa00,
              inset 0 0 10px #00aa00;
          "
          @click="
            () => {
              isEmailVerifyOn = true;
            }
          "
        >
          인증번호 요청
        </button>
        <BaseInput placeholder="인증코드" />
        <BaseInput placeholder="새로운 비밀번호" />
        <button
          v-if="isEmailVerifyOn"
          class="mt-[15px] h-[40px] w-[100px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 text-[12px] transition-all duration-500 ease-in-out"
          style="
            box-shadow:
              0 0 5px 3px #00aa00,
              inset 0 0 5px #00aa00,
              inset 0 0 10px #00aa00;
          "
          @click="
            () => {
              isModalOn = false;
            }
          "
        >
          비밀번호 변경
        </button>
      </div>
    </div>

    <div
      class="flex h-screen w-[1200px] flex-col items-center justify-center bg-[#030015] text-white"
    >
      <div
        class="flex h-[400px] w-[600px] flex-col items-center justify-center rounded-[10px] border-1 bg-black/70"
        style="
          box-shadow:
            0 0 5px 3px #f148fb,
            inset 0 0 5px #f148fb,
            inset 0 0 10px #f148fb;
        "
      >
        <button
          class="mb-[30px] h-[40px] w-[100px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 text-[12px] transition-all duration-500 ease-in-out"
          style="
            box-shadow:
              0 0 5px 3px #ff0000,
              inset 0 0 5px #ff0000,
              inset 0 0 10px #ff0000;
          "
        >
          회원 탈퇴
        </button>

        <button
          class="h-[40px] w-[100px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 text-[12px] transition-all duration-500 ease-in-out"
          style="
            box-shadow:
              0 0 5px 3px #00aa00,
              inset 0 0 5px #00aa00,
              inset 0 0 10px #00aa00;
          "
          @click="
            () => {
              isModalOn = true;
            }
          "
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  </div>
</template>
