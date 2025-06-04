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
              <form class="space-y-6" @submit.prevent="hadleSubmit">
                <div>
                  <label
                    for="email"
                    class="block pl-3 text-lg/6 font-medium text-white"
                    >이메일</label
                  >
                  <div class="px-3 py-3">
                    <div class="neon-border mt-2 rounded-md p-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        class="block w-full rounded-md px-3 py-1.5 text-base text-white outline-0 placeholder:text-gray-400 sm:text-sm/6"
                        placeholder="example@example.com"
                        v-model="emailInput"
                      />
                    </div>
                  </div>

                  <BaseInput
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="example@example.com"
                    v-model="emailValue"
                  ></BaseInput>
                </div>

                <div v-if="mode !== 'find' || step !== 'email'">
                  <div class="flex items-center justify-between px-3">
                    <label
                      for="password"
                      class="block text-lg/6 font-medium text-white"
                      placeholder="1234"
                      >비밀번호</label
                    >
                    <div class="text-sm" v-if="mode === 'login'">
                      <a
                        href="#"
                        class="font-semibold text-white hover:text-gray-500"
                        @click="goFind"
                        >기억이 안나십니까?</a
                      >
                    </div>
                  </div>

                  <div class="px-3 py-3">
                    <div class="neon-border mt-2 rounded-md p-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="current-password"
                        class="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-white outline-0 placeholder:text-gray-400 sm:text-sm/6"
                        v-model="pwdInput"
                      />
                    </div>
                  </div>
                </div>

                <div v-if="mode === 'sign'">
                  <div>
                    <label
                      for="email"
                      class="block pl-3 text-lg/6 font-medium text-white"
                      >이름</label
                    >

                    <div class="px-3 py-3">
                      <div class="neon-border mt-2 rounded-md p-2">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autocomplete="current-password"
                          class="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-white outline-0 placeholder:text-gray-400 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="px-3 py-3">
                  <button
                    type="submit"
                    class="neon-button-border flex w-full justify-center rounded-md px-3 py-3 text-lg font-extrabold text-white shadow-xs"
                  >
                    {{
                      mode === "login"
                        ? "로그인"
                        : mode === "sign"
                          ? "회원가입"
                          : "이메일 보내기"
                    }}
                  </button>
                </div>
              </form>

              <div v-if="mode === 'login'">
                <p class="mt-5 text-center text-lg/5 text-white">
                  아직도 회원이 아니신가요?
                  <a
                    href="#"
                    class="font-semibold text-white hover:text-indigo-500"
                    @click="goSign"
                    >회원가입하기</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuthApi from "../api/auth.js";
import BaseInput from "../components/BaseInput.vue";

const route = useRoute();
const router = useRouter();
const { login } = useAuthApi();

const mode = computed(() => route.query.mode || "login"); // 기본 모드는 login

// 회원 가입 상태에서의 처리
// 회원 가입 상태에서 이메일 인증 --> 5분동안 이메일에 대한 인증 받기 --> 인증이 되었으면 비밀번호와 이름 지정
// 회원 가입 상태에서 비밀번호 입력
// 회원 가입 상태에서
const step = ref(() => route.query.step || "email");

const goSign = () => {
  router.push("/login?mode=sign");
};
const goFind = () => {
  router.push("/login?mode=find");
};

const emailValue = ref("");
watch(emailValue, () => {
  console.log(emailValue.value);
});
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
