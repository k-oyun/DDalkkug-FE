<template>
  <form class="space-y-6" @submit.prevent="$emit('event:submit', 'sign')">
    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white">
        이메일
      </label>

      <BaseInput
        v-model="emailInput"
        class="disabled:text-gray-500"
        :disabled="isSend"
      ></BaseInput>

      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ sendMsg }}
      </label>
    </div>

    <div v-if="isSend">
      <label
        for="email"
        class="block pt-1 pl-3 text-lg/6 font-medium text-white"
      >
        코드입력
      </label>

      <BaseInput
        v-model="codeInput"
        class="disabled:text-gray-500"
        :disabled="isVerify"
      ></BaseInput>
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ verifyMsg }}
      </label>
    </div>

    <div v-if="isSend && isReset">
      <label
        for="email"
        class="block pt-1 pl-3 text-lg/6 font-medium text-white"
      >
        새 비밀번호 입력
      </label>

      <BaseInput
        v-model="resetInput"
        class="disabled:text-gray-500"
        :disabled="isVerify"
        :neonColor="resetNeon"
        type="password"
      ></BaseInput>
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ resetMsg }}
      </label>
    </div>

    <label
      class="text-md/6 hidden pl-3 font-medium text-white"
      :class="[{ block: isVerify }]"
    >
      {{ verifyMsg }}
    </label>

    <!-- <div v-if="isReg">
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >비밀번호</label
      >

      <BaseInput></BaseInput>
    </div>

    <div v-if="isReg">
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
        >닉네임</label
      >

      <BaseInput></BaseInput>
    </div> -->

    <BaseButton @click="handleClick" :disabled="buttonDisable">
      {{ buttonMsg }}
    </BaseButton>
  </form>

  <p
    class="text-md/5 mt-3 overflow-hidden text-right text-ellipsis whitespace-nowrap text-white"
  >
    <a
      href="#"
      class="font-semibold overflow-ellipsis text-white hover:text-gray-500"
      @click="backLogin"
    >
      로그인하기
    </a>
  </p>
</template>

<script setup>
import { computed, ref } from "vue";

import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useAuthApi } from "@/api/auth.js";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/Account.js";

const neonColor = "#00f0ff";
const hoverColor = "#00b8ff";
const errorColor = "#ff4d4f";

const currentColor = ref(neonColor);

const emit = defineEmits(["event:submit"]);

const router = useRouter();
const accountStore = useAccountStore();

// 인풋 v-model 변수수
const emailInput = ref("");
const codeInput = ref("");

// 인풋 네온 스타일
const resetNeon = ref("");

// 비밀번호 재설정
const resetInput = ref("");

// 버튼 상태
const buttonMsg = ref("이메일 확인");
const buttonDisable = ref(false);

// 상태값과 메시지
const sendMsg = ref("");
const isSend = ref(false);
const verifyMsg = ref("");
const isVerify = ref(false);
const resetMsg = ref("");
const isReset = computed(() => accountStore.mode === "reset");
// const regMsg = ref("");
// const isReg = ref(false);
// const isDone = ref(false);

const { sendEmail, verifyEmail, sendResetEmail, verifyResetEmail } =
  useAuthApi();

const backLogin = () => {
  router.push("/login");
};

const handleClick = () => {
  if (!isSend.value) {
    send();
  } else {
    verify();
  }
};

const goSign = () => {
  accountStore.setEmail(emailInput.value);
  accountStore.mode === "sign"
    ? router.push("/sign/verified-sign")
    : router.push("/login");
};

const verify = async () => {
  if (accountStore.mode === "reset") {
    if (resetInput.value.length < 4) {
      resetMsg.value = "최소 4자리 이상이어야 합니다.";
      resetNeon.value = errorColor;
      return false;
    } else {
      resetMsg.value = "";
      resetNeon.value = "";
    }
  }

  try {
    sendMsg.value = "";
    buttonDisable.value = true;
    isVerify.value = true;
    const res =
      accountStore.mode === "sign"
        ? await verifyEmail(codeInput.value)
        : await verifyResetEmail(codeInput.value, resetInput.value);

    // buttonDisable.value = false;
    // buttonMsg.value = "가입하기";

    // verifyMsg.value = res.data.message;

    goSign();
  } catch (e) {
    verifyMsg.value = e.response.data.message;
    isVerify.value = false;
    buttonDisable.value = false;
  }
};

const send = async () => {
  try {
    buttonDisable.value = true;

    const res =
      accountStore.mode === "sign"
        ? await sendEmail(emailInput.value)
        : await sendResetEmail(emailInput.value);
    isSend.value = true;

    sendMsg.value = res.data.message;
    buttonDisable.value = false;
    buttonMsg.value =
      accountStore.mode === "sign" ? "코드 확인하기" : "비밀번호 변경";
  } catch (e) {
    buttonMsg.value = "이메일 확인하기";
    sendMsg.value = e.response.data.message;
    buttonDisable.value = false;
  }
};
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
