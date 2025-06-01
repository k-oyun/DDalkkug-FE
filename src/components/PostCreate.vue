<!-- src/components/PostCreate.vue -->
<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-3xl mx-auto">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold mb-6 text-cyan-400">글 작성</h1>
        <router-link
          to="/posts"
          class="text-cyan-400 hover:underline block mb-4"
        >
          ← 전체 게시글로 돌아가기
        </router-link>
      </div>
      <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300"
            >제목</label
          >
          <input
            v-model="title"
            type="text"
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300"
            >작성자</label
          >
          <input
            v-model="author"
            type="text"
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300"
            >내용</label
          >
          <textarea
            v-model="content"
            rows="6"
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded font-semibold text-white"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const title = ref("");
const author = ref("");
const content = ref("");
//  글 목록 추가

const submitPost = async () => {
  try {
    const newPost = {
      title: title.value,
      author: author.value,
      content: content.value,
      // 글 목록 추가
    };
    // await axios.post("", newPost);
    alert("등록 완료");
    router.push("/posts");
  } catch (err) {
    console.error(err);
    alert("등록 실패");
  }
};
</script>
