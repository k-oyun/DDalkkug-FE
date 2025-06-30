<template>
  <form class="space-y-6" @submit.prevent="">
    <div class="flex w-full items-center justify-center">
      <label class="block text-lg/6 font-medium text-white">
        {{ veryfiedEmail }}
      </label>
    </div>

    <div>
      <label for="password" class="block pl-3 text-lg/6 font-medium text-white">
        비밀번호
      </label>

      <BaseInput
        type="password"
        :neonColor="pwdNeon"
        v-model="password"
      ></BaseInput>
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ pwdMsg }}
      </label>
    </div>

    <div>
      <label for="password" class="block pl-3 text-lg/6 font-medium text-white">
        비밀번호 확인
      </label>

      <BaseInput
        type="password"
        :neonColor="confirmPwdNeon"
        v-model="confirmPassword"
      ></BaseInput>
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ confirmPwdMsg }}
      </label>
    </div>

    <div>
      <label for="name" class="block pl-3 text-lg/6 font-medium text-white">
        닉네임
      </label>

      <BaseInput v-model="name"></BaseInput>
      <label class="text-md/6 block pt-1 pl-3 font-medium text-white">
        {{ name === "" ? "닉네임을 입력하세요" : "" }}
      </label>
    </div>

    <BaseButton @click="handleClick" :disabled="buttonDisable">
      회원가입
    </BaseButton>
  </form>
</template>

<script setup>
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";
import { useAuthApi } from "@/api/auth.js";
import { onMounted } from "vue";
import { useAccountStore } from "@/stores/Account.js";

const { register } = useAuthApi();
const accountStore = useAccountStore();
const router = useRouter();

const buttonColor = "#00f0ff";
const errorColor = "#ff4d4f";

const veryfiedEmail = ref("");

const password = ref("");
const confirmPassword = ref("");
const name = ref("");

const pwdMsg = ref("");
const confirmPwdMsg = ref("");

const pwdNeon = ref("#f148fa");
const confirmPwdNeon = ref("#f148fb");

const buttonDisable = ref(false);

onMounted(() => {
  veryfiedEmail.value = accountStore.email || "null";
});

const validatePwd = () => {
  if (password.value.length < 4) {
    pwdMsg.value = "최소 4자리 이상이어야 합니다.";
    pwdNeon.value = errorColor;
    return false;
  } else {
    pwdMsg.value = "";
    pwdNeon.value = "";
  }

  if (password.value !== confirmPassword.value) {
    confirmPwdMsg.value = "비밀번호가 일치하지 않습니다.";
    pwdNeon.value = errorColor;
    confirmPwdNeon.value = errorColor;
    return false;
  }

  pwdMsg.value = "";
  confirmPwdMsg.value = "";
  pwdNeon.value = "";
  confirmPwdNeon.value = "";

  return true;
};

const goLogin = () => {
  // 해야할일
  // 가입했을 때 이메일을 저장시켜서 로그인시 자동 입력 ( 유저 친화 )
  buttonDisable.value = true;

  // later : 나중에 여기 예외처리 구현
  const res = register(accountStore.email, password.value, name.value);
  accountStore.email = "";
  router.push("/login");
};

const handleClick = () => {
  if (!validatePwd()) return;

  goLogin();
};
</script>

<style scoped>
@import "@/styles/neon.css";
</style>
