<script setup>
import BaseInput from "@/components/BaseInput.vue";
import useAuthAPi from "../api/auth.js";
import { useAccountStore } from "@/stores/Account.js";

import { onMounted, ref } from "vue";
const verifyCode = ref("");
const email = ref("");
const newPwd = ref("");
const isModalOn = ref(false);
const isEmailVerifyOn = ref(false);
const { sendResetEmail, verifyResetEmail, getUserInfo } = useAuthAPi();

onMounted(async () => {
  const res = await getUserInfo();
  email.value = res.data.data.email;
});

const handleEmailVerifyReq = async () => {
  isEmailVerifyOn.value = true;
  const res = await sendResetEmail(email.value);
  console.log(res);
  if (res.data.status != 200) {
    alert("인증번호 요청중 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
  }
};

const handleChangePwd = async () => {
  isModalOn.value = false;
  const res = await verifyResetEmail(verifyCode.value, newPwd.value);
  console.log(res);
  if (res.data.status != 200) {
    alert(
      "비밀번호 변경 요청중 에러가 발생했습니다. 잠시후 다시 시도해주세요.",
    );
  }
};
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
          @click="handleEmailVerifyReq"
        >
          인증번호 요청
        </button>
        <BaseInput placeholder="인증코드" v-model="verifyCode" />
        <BaseInput placeholder="새로운 비밀번호" v-model="newPwd" />
        <button
          v-if="isEmailVerifyOn"
          class="mt-[15px] h-[40px] w-[100px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 text-[12px] transition-all duration-500 ease-in-out"
          style="
            box-shadow:
              0 0 5px 3px #00aa00,
              inset 0 0 5px #00aa00,
              inset 0 0 10px #00aa00;
          "
          @click="handleChangePwd"
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
