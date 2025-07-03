<template>
  <div class="min-h-screen p-3 text-white sm:p-6" id="bg">
    <div
      v-if="post"
      class="neon-border mx-auto max-w-3xl rounded-xl bg-gray-900/95 p-3 shadow-lg sm:p-8"
    >
      <div class="flex items-center justify-between">
        <BaseButton @click="router.back()">뒤로가기</BaseButton>
        <BaseButton class="text-sm sm:text-lg" @click="router.push('/posts')">
          전체 기록 보기
        </BaseButton>
      </div>

      <div class="mb-3">
        <h1
          class="mb-3 text-center text-2xl font-extrabold sm:text-left sm:text-4xl"
          style="
            text-shadow:
              0 0 2px #00aa00,
              0 0 4px #00aa00,
              0 0 8px #00aa00;
          "
        >
          적신 날 : {{ formattedDate }}
        </h1>
        <div
          class="flex flex-col text-sm font-medium text-gray-400 sm:flex-row sm:gap-6"
        >
          <p>
            작성자 :
            <span class="text-white">{{ userInfo.nickname }}</span>
          </p>
          <p>
            소속 :
            <span class="text-white">
              {{ groupMap[post.groupId] || "솔플" }}
            </span>
          </p>
          <p>
            작성일 :
            <span class="text-white">{{ formattedCreatedAt }}</span>
          </p>
        </div>
      </div>

      <hr class="mb-3 border-gray-700" />

      <section class="mb-3">
        <p
          class="text-lg leading-relaxed break-words whitespace-pre-line text-gray-200"
        >
          {{ post.memo }}
        </p>
      </section>

      <section v-if="post.photoUrl" class="mb-8 flex justify-center">
        <img
          :src="post.photoUrl"
          alt="게시글 사진"
          class="max-h-full max-w-full rounded border border-white object-contain"
        />
      </section>

      <section class="mb-8">
        <h2
          class="mb-3 text-2xl font-semibold text-green-400 sm:text-3xl"
          style="
            text-shadow:
              0 0 2px #00aa00,
              0 0 4px #00aa00,
              0 0 8px #00aa00;
          "
        >
          술 정보
        </h2>
        <ul class="ml-6 space-y-1 text-white">
          <li v-for="drink in post.drinks" :key="drink.id">
            <span
              class="text-base font-semibold sm:text-xl"
              :style="{
                textShadow:
                  drink.type === '소주'
                    ? '0 0 2px #00ff00, 0 0 4px #00ff00, 0 0 8px #00ff00'
                    : drink.type === '맥주'
                      ? '0 0 2px #facc15, 0 0 4px #facc15, 0 0 8px #facc15'
                      : '0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff',
              }"
            >
              {{ drink.type }} - {{ drink.quantity }}병
            </span>
          </li>
        </ul>
      </section>

      <section class="mt-8 text-center">
        <p
          class="neon-border inline-block rounded-lg px-6 py-3 text-xl font-bold shadow-lg sm:text-2xl"
          style="
            --neon-color: #ffff00;
            text-shadow:
              0 0 2px #5db536,
              0 0 4px #5db536,
              0 0 8px #5db536,
              0 0 16px #5db536,
              0 0 32px #5db536;
          "
        >
          총 가격 : {{ post.totalPrice.toLocaleString() }} 원
        </p>
      </section>

      <div class="mt-6 flex justify-center gap-4">
        <BaseButton
          @click="router.push(`/posts/${postId}/edit`)"
          class="min-w-[100px] text-sm sm:text-lg"
        >
          수정
        </BaseButton>
        <BaseButton
          @click="handleDelete"
          class="min-w-[100px] text-sm sm:text-lg"
        >
          삭제
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import BaseButton from "../components/BaseButton.vue";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const post = ref(null);
const userInfo = ref(null);
const groupMap = ref({});

const fetchPostDetail = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      `https://api.ddalkkug.kro.kr/api/v1/calendar-entries/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    post.value = res.data.data;
  } catch (err) {
    console.error("게시글 불러오기 실패", err);
    alert("게시글 정보를 불러오는 데 실패했습니다.");
    router.push("/posts");
  }
};

const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      "https://api.ddalkkug.kro.kr/api/v1/member/user-info",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    userInfo.value = res.data.data;
  } catch (err) {
    console.error("유저정보 불러오기 실패", err);
    alert("유저 정보를 불러오는 데 실패했습니다.");
  }
};

const fetchGroups = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      "https://api.ddalkkug.kro.kr/api/v1/group-info",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const map = {};
    for (const group of res.data.data) {
      map[group.id] = group.name;
    }
    groupMap.value = map;
  } catch (err) {
    console.error("그룹 정보 불러오기 실패", err);
  }
};

const handleDelete = async () => {
  const confirmed = confirm("정말 삭제하시겠습니까?");
  if (!confirmed) return;

  const token = localStorage.getItem("accessToken");
  try {
    await axios.delete(
      `https://api.ddalkkug.kro.kr/api/v1/calendar-entries/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    alert("삭제 완료!");
    router.push("/posts");
  } catch (err) {
    console.error("삭제 실패", err);
    alert("삭제에 실패했습니다.");
  }
};

const formattedDate = computed(() => {
  if (!post.value.drinkingDate) return "";
  return new Date(post.value.drinkingDate).toLocaleDateString();
});

const formattedCreatedAt = computed(() => {
  if (!post.value.createdAt) return "";
  return new Date(post.value.createdAt).toLocaleString();
});

onMounted(() => {
  fetchPostDetail();
  fetchUserInfo();
  fetchGroups();
});
</script>

<style scoped>
@import "../styles/neon.css";

* {
  overflow: visible;
}

#bg {
  overflow-y: auto;
  max-height: 100vh;
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#post-neon {
  border: 2px solid #3b82f6;
  animation: borderFlicker 1.5s infinite;
  box-shadow:
    0 0 8px #3b82f6,
    0 0 16px #3b82f6,
    0 0 24px #3b82f6;
  transition: box-shadow 0.1s ease;
}

#post-neon:hover {
  box-shadow:
    0 0 120px #3b82f6,
    0 0 280px #3b82f6,
    0 0 360px #3b82f6;
}

@keyframes borderFlicker {
  0%,
  100% {
    box-shadow:
      0 0 8px #3b82f6,
      0 0 16px #3b82f6,
      0 0 24px #3b82f6;
  }
  50% {
    box-shadow:
      0 0 4px #3b82f6,
      0 0 10px #3b82f6,
      0 0 14px #3b82f6;
  }
}
</style>
