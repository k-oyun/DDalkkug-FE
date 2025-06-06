<template>
  <div class="h-screen w-full text-white" id="bg">
    <div class="mx-auto flex h-screen items-center justify-center space-x-20">
      <div class="inline-flex">
        <!-- 이미 영역 -->
        <div class="my-auto">
          <img
            src="../assets/logo_2.png"
            class="z-100 hidden w-[600px] lg:block"
            id="logo"
          />
        </div>
        <!-- 로그인 폼 영역 -->
        <div class="my-auto px-10 py-10">
          <div
            class="neon-border contents rounded-md border bg-[#030015]/40 px-10 py-10 text-slate-900 sm:block sm:min-w-[400px]"
          >
            <div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import useAuthApi from "../api/auth.js";

const route = useRoute();
const { login } = useAuthApi();

const mode = computed(() => route.query.mode || "login"); // 기본 모드는 login

// 회원 가입 상태에서의 처리
// 회원 가입 상태에서 이메일 인증 --> 5분동안 이메일에 대한 인증 받기 --> 인증이 되었으면 비밀번호와 이름 지정
// 회원 가입 상태에서 비밀번호 입력
// 회원 가입 상태에서

const emailInput = ref("");
const pwdInput = ref("");
const hadleSubmit = async () => {
  switch (mode.value) {
    case "login":
      {
        const res = await login(emailInput.value, pwdInput.value);
        const accessToken = res.data.data;
        localStorage.setItem("accessToken", accessToken);
        console.log(res.data.message);
      }
      break;
  }
};
</script>

<style scoped>
@import "../styles/neon.css";
</style>
