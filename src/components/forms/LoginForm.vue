<template>
  <form class="space-y-6" @submit.prevent="$emit('event:submit', 'login')">
    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >이메일</label
      >

      <BaseInput v-model="emailInput" :neonColor="emailNeon"></BaseInput>
    </div>

    <div>
      <div class="flex items-center justify-between px-3">
        <label
          for="password"
          class="block text-lg/6 font-medium text-white"
          placeholder="1234"
          >비밀번호</label
        >
        <div class="text-sm" @click="goReset">
          <a href="#" class="font-semibold text-white hover:text-gray-500"
            >기억이 안나십니까?</a
          >
        </div>
      </div>

      <BaseInput
        v-model="pwdInput"
        :neonColor="pwdNeon"
        type="password"
      ></BaseInput>
    </div>

    <div
      class="flex items-center justify-center"
      :class="[{ hidden: !isValid }]"
    >
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ validMsg }}
      </label>
    </div>

    <div class="px-3 py-3">
      <button
        type="submit"
        class="neon-border flex w-full justify-center rounded-md px-3 py-3 text-lg font-extrabold text-white shadow-xs"
        :style="`--neon-color:${buttonColor}`"
        @click="handleClick"
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
      @click="goReg"
      >회원가입하기</a
    >
  </p>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useAuthApi } from "@/api/auth.js";
import { useAccountStore } from "@/stores/Account.js";

const router = useRouter();
const { login } = useAuthApi();

const buttonColor = "#00f0ff";
const errorColor = "#ff4d4f";

const emit = defineEmits(["event:submit"]);
const accountStore = useAccountStore();

const validMsg = ref("");
const isValid = computed(() => validMsg.value !== "");

const emailInput = ref("");
const pwdInput = ref("");

const emailNeon = ref("");
const pwdNeon = ref("");

const goReg = () => {
  accountStore.setMode("sign");
  router.push("/sign/verify");
};

const goReset = () => {
  accountStore.setMode("reset");
  router.push("/reset/verify");
};

const validPwd = () => {
  if (pwdInput.value.length < 4) {
    validMsg.value = "비밀번호를 확인하세요";
    pwdNeon.value = errorColor;
    return false;
  }

  pwdNeon.value = "";
  validMsg.value = "";
  return true;
};

// later : 정규식 검사 추가
const validEmail = () => {
  // 추후 이메일 정규식 검사
  return true;
};

const handleClick = async () => {
  if (!validPwd()) return;
  if (!validEmail()) return;
  try {
    const res = await login(emailInput.value, pwdInput.value);
    alert("로그인 성공!");
  } catch (e) {
    validMsg.value = e.response.data.message;
  }
};
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
