<template>
  <form class="space-y-6" @submit.prevent="hadleSubmit">
    <div>
      <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
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
        <label for="email" class="block pl-3 text-lg/6 font-medium text-white"
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
</template>

<script setup></script>
