<template>
  <div class="min-h-screen p-4 text-white sm:p-6" id="bg">
    <div
      class="neon-border mx-auto max-w-4xl space-y-6 overflow-visible rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8"
      style="background-color: var(--background-color)"
    >
      <!-- 상단 버튼 -->
      <div class="mb-6 flex flex-nowrap items-center justify-between gap-4">
        <h1
          class="flex-1 text-center text-2xl font-bold sm:text-3xl"
          style="
            filter: drop-shadow(0 0 3px #00f0ff) drop-shadow(0 0 5px #00f0ff);
          "
        >
          {{ isEdit ? "술자리 기록 수정" : "술자리 기록 작성" }}
        </h1>
      </div>
      <div class="flex justify-between">
        <BaseButton
          class="min-w-[100px] px-4 py-2 text-sm sm:text-lg"
          @click="
            () => {
              if (isEdit) {
                router.push(`/posts/${postId}`);
              } else {
                router.push('/posts');
              }
            }
          "
        >
          취소
        </BaseButton>
        <BaseButton
          class="min-w-[100px] px-4 py-2 text-sm sm:text-lg"
          @click="
            () => {
              router.push('/posts');
            }
          "
        >
          전체 기록 보기
        </BaseButton>
      </div>
      <!-- 작성 폼 -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 날짜 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            날짜
          </label>
          <BaseInput
            type="date"
            v-model="entry.drinkingDate"
            required
            class="w-full"
          />
        </div>

        <!-- 그룹 선택 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            공유할 그룹 선택
          </label>
          <BaseSelect v-model="entry.groupId" class="w-full cursor-pointer">
            <option :value="''" class="text-black">그룹 선택 X</option>
            <option
              v-for="group in myGroups"
              :key="group.id"
              :value="group.id"
              class="text-black"
            >
              {{ group.name }}
            </option>
          </BaseSelect>
        </div>

        <!-- 병 수 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            병 수
          </label>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-1/4 text-center text-white">소주</span>
              <BaseInput
                v-model.number="entry.sojus"
                type="number"
                min="0"
                placeholder="병 수"
                class="w-3/4"
              />
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1/4 text-center text-white">맥주</span>
              <BaseInput
                v-model.number="entry.beers"
                type="number"
                min="0"
                placeholder="병 수"
                class="w-3/4"
              />
            </div>
          </div>
        </div>

        <!-- 총 가격 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            총 가격 (₩)
          </label>
          <BaseInput
            type="number"
            min="0"
            placeholder="가격"
            v-model.number="entry.totalPrice"
            class="w-full"
          />
        </div>

        <!-- 사진 업로드 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            사진 (선택)
          </label>
          <BaseFileInput
            type="file"
            accept="image/*"
            @change="handleImage"
            class="w-full cursor-pointer"
          />
          <img
            v-if="entry.image || entry.photoUrl"
            :src="entry.image || entry.photoUrl"
            alt="미리보기"
            class="neon-border mx-auto my-10 max-h-60 max-w-full rounded border object-contain"
          />
        </div>

        <!-- 메모 -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-300">
            메모
          </label>
          <BaseTextarea
            v-model="entry.memo"
            placeholder="어디서, 누구랑, 어떤 분위기였는지 간단히 기록해보세요."
            class="w-full"
          />
        </div>

        <!-- 제출 버튼 -->
        <BaseButton type="submit" :disabled="isSubmitting">
          {{ isEdit ? "수정 완료" : "작성 완료" }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseFileInput from "@/components/BaseFileInput.vue";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const isEdit = computed(() => !!postId);
const isSubmitting = ref(false);

const entry = ref({
  userId: 1,
  drinkingDate: new Date().toISOString().slice(0, 10),
  memo: "",
  totalPrice: 0,
  sojus: 0,
  beers: 0,
  image: null,
  rawImageFile: null,
  photoUrl: null,
  groupId: null,
});

const myGroups = ref([]);

const fetchPostDetail = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await axios.get(
      `https://api.ddalkkug.kro.kr/api/v1/calendar-entries/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = res.data.data;
    entry.value = {
      userId: data.userId,
      drinkingDate: data.drinkingDate,
      memo: data.memo,
      totalPrice: data.totalPrice,
      sojus: data.drinks.find((d) => d.type === "소주")?.quantity || 0,
      beers: data.drinks.find((d) => d.type === "맥주")?.quantity || 0,
      image: null,
      rawImageFile: null,
      photoUrl: data.photoUrl || null,
      groupId: data.groupId || null,
    };
  } catch (err) {
    console.error("불러오기 실패", err);
    alert("게시글을 불러오는 데 실패했습니다.");
    router.push("/posts");
  }
};

const fetchMyGroups = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await axios.get(
      "https://api.ddalkkug.kro.kr/api/v1/group-member/my-groups",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    myGroups.value = res.data.data;
    console.log(myGroups.value);
  } catch (err) {
    console.error("그룹 불러오기 실패", err);
  }
};

onMounted(() => {
  fetchMyGroups();
  if (isEdit.value) fetchPostDetail();
});

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    entry.value.rawImageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      entry.value.image = reader.result;
      entry.value.photoUrl = null;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  if (isSubmitting.value) return; // 중복 방지
  isSubmitting.value = true;

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append("drinkingDate", entry.value.drinkingDate);
  formData.append("memo", entry.value.memo);
  formData.append("totalPrice", entry.value.totalPrice.toString());

  formData.append("drinks[0].type", "소주");
  formData.append("drinks[0].quantity", entry.value.sojus.toString());
  formData.append("drinks[1].type", "맥주");
  formData.append("drinks[1].quantity", entry.value.beers.toString());

  if (entry.value.rawImageFile) {
    formData.append("image", entry.value.rawImageFile);
  }
  if (entry.value.groupId) {
    formData.append("groupId", entry.value.groupId);
  }

  try {
    if (isEdit.value) {
      await axios.post(
        `https://api.ddalkkug.kro.kr/api/v1/calendar-entries/${postId}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("✅ 게시글이 수정되었습니다!");
    } else {
      await axios.post(
        "https://api.ddalkkug.kro.kr/api/v1/calendar-entries",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("✅ 기록이 저장되었습니다!");
    }
    router.push("/posts");
  } catch (err) {
    console.error("에러 발생:", err);
    alert("❌ 저장 또는 수정 중 오류가 발생했습니다.");
  } finally {
    isSubmitting.value = false; // 끝난 뒤 다시 활성화
  }
};
</script>

<style scoped>
@import "../styles/neon.css";
@import "../style.css";

* {
  overflow: visible;
}

#bg {
  overflow-y: auto; /* 세로 스크롤 가능 */
  max-height: 100vh; /* 화면 높이 제한 */
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
