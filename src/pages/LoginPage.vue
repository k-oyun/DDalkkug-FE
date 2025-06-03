<template>
  <div class="h-screen w-full text-white" id="bg">
    <div class="mx-auto flex h-screen items-center justify-center">
      <img src="../assets/logo_2.png" class="z-100 w-[600px]" id="logo" />
      <!-- 로그인 폼 영역 -->
      <div class="w-10"></div>
      <div
        class="neon-border min-w-[400px] rounded-md border bg-[#030015]/40 px-10 py-10 text-slate-900"
      >
        <div>
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm/6 font-medium text-white"
                >이메일</label
              >
              <div class="mt-2 px-3 py-3">
                <div class="neon-border mt-2 rounded-md p-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    class="block w-full rounded-md px-3 py-1.5 text-base text-white placeholder:text-gray-400 sm:text-sm/6"
                    placeholder="example@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-white"
                  placeholder="1234"
                  >비밀번호</label
                >
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-white hover:text-gray-500"
                    >기억이 안나십니까?</a
                  >
                </div>
              </div>

              <div class="mt-2 px-3 py-3">
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

            <div v-if="!isLogin">
              <div>
                <label
                  for="email"
                  class="block text-sm/6 font-medium text-white"
                  >이름</label
                >

                <div class="mt-2 px-3 py-3">
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
                {{ isLogin ? "로그인" : "회원가입" }}
              </button>
            </div>
          </form>

          <p class="mt-5 text-center text-sm/6 text-white">
            아직도 회원이 아니신가요?
            <a href="#" class="font-semibold text-white hover:text-indigo-500"
              >회원가입하기</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  propLogin: Boolean,
});

const isLogin = ref(true);

watch(props.propLogin, () => {
  isLogin.value = props.propLogin;
});
</script>

<style scoped>
.neon-glow {
  text-shadow:
    0 0 5px #f148fb,
    0 0 10px #f148fb,
    0 0 20px #f148fb;
}

.neon-border {
  border: 2px solid #fff;
  box-shadow:
    0 0 5px #f148fb,
    0 0 10px #f148fb,
    0 0 15px #f148fb,
    0 0 20px #f148fb,
    inset 0 0 10px #f148fb,
    inset 0 0 20px #f148fb;
}

.neon-button-border {
  border: 2px solid #fff;
  box-shadow:
    0 0 5px #00f0ff,
    0 0 10px #00f0ff,
    0 0 15px #00f0ff,
    0 0 20px #00f0ff,
    inset 0 0 10px #00f0ff,
    inset 0 0 20px #00f0ff;
}

.neon-border-strong {
  border: 2px solid #fff;
  box-shadow:
    0 0 5px #f148fb,
    0 0 10px #f148fb,
    0 0 15px #f148fb,
    0 0 20px #f148fb,
    0 0 25px #f148fb,
    0 0 30px #f148fb,
    0 0 50px #f148fb,
    inset 0 0 10px #f148fb,
    inset 0 0 20px #f148fb;
}

#logo {
  /* animation: float 3s ease-in-out infinite; */

  filter: drop-shadow(0 0 5px #f148fb) drop-shadow(0 0 10px #f148fb)
    drop-shadow(0 0 10px #f148fb);
  animation: logoFlicker 1s infinite;
}
#bg {
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
}

@keyframes logoFlicker {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.8;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.8;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>
