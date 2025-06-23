<template>
  <div class="px-3 py-3">
    <div
      class="neon-border relative mt-2 rounded-md p-3.5"
      :style="{ '--neon-color': neonColor }"
    >
      <!-- 실제 input은 화면에서 보이지 않도록 숨김 -->
      <input
        ref="fileInput"
        v-bind="$attrs"
        :type="type"
        class="absolute opacity-0"
        @change="handleInput"
      />
      <!-- 커스텀 텍스트/버튼 표시 -->
      <span class="block w-full text-center text-white">
        {{ fileLabel }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: [String, File, FileList],
  type: {
    type: String,
    default: "text",
  },
  neonColor: {
    type: String,
    default: "#f148fb",
  },
});

const emit = defineEmits(["update:modelValue"]);

const fileLabel = ref("파일을 선택하세요");

function handleInput(event) {
  if (props.type === "file") {
    const files = event.target.files;
    emit("update:modelValue", files);
    if (files.length > 0) fileLabel.value = files[0].name;
    else fileLabel.value = "파일을 선택하세요";
  } else {
    emit("update:modelValue", event.target.value);
  }
}

const neonColor = computed(() => props.neonColor);
</script>

<style scoped>
@import "../styles/neon.css";
</style>
