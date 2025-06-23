<template>
  <div
    :class="[
      'flex cursor-pointer items-center space-x-2 rounded px-2 py-2 text-lg',
      active ? 'text-cyan-400' : 'text-white hover:text-cyan-300',
    ]"
  >
    <span><slot name="icon" /></span>
    <span><slot name="text" /></span>
  </div>
</template>

<script setup>
defineProps({
  active: Boolean,
});
</script>

<style scoped></style>
