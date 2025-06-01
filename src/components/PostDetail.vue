<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow">
      <div class="flex justify-end">
        <router-link
          to="/posts"
          class="text-cyan-400 hover:underline block mb-4"
        >
          ← 전체 게시글로 돌아가기
        </router-link>
      </div>
      <h1 class="text-3xl font-bold text-pink-400 mb-2">{{ post.title }}</h1>
      <p class="text-gray-400 text-sm mb-4">
        작성자: {{ post.author }} · {{ post.date }}
      </p>

      <hr class="border-gray-700 my-4" />

      <div class="text-gray-200 whitespace-pre-line">
        {{ post.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postId = Number(route.params.id);

const post = ref({
  id: postId,
  title: "",
  author: "",
  date: "",
  content: "",
});

// 데이터 예시
const fetchPostDetail = async () => {
  const testPosts = [
    {
      id: 1,
      title: "멕시칸 ㄱㄱ?",
      author: "추창우",
      date: "2024-06-01",
      content: "치맥 ㄱㄱ",
    },
    {
      id: 2,
      title: "문래 ㄱㄱ?",
      author: "권오윤",
      date: "2024-05-30",
      content: "오늘 재워준다. 다 드루와.",
    },
  ];

  const getPost = testPosts.find((p) => p.id === postId);
  if (getPost) {
    post.value = getPost;
  }
};

onMounted(() => {
  fetchPostDetail();
});

// const fetchPostDetail = async () => {
//   try {
//     const res = await axios.get("/posts/${postId}"); // 해당 게시글 id로 데이터 불러오기
//     post.value = res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };
</script>
