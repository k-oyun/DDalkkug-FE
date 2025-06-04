<template>
  <div class="flex h-[100vh] w-[100%] items-center justify-center" id="bg">
    <Calendar />
    <div
      class="ml-[50px] flex h-[670px] w-[450px] flex-col items-center text-white 2xl:h-[676px]"
    >
      <div
        class="mt-[3px] flex h-[150px] w-[400px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 p-10 transition-all duration-500 ease-in-out"
        style="
          box-shadow:
            0 0 5px 3px #00aa00,
            inset 0 0 5px #00aa00,
            inset 0 0 10px #00aa00;
        "
        onmouseover="this.style.boxShadow='0 0 5px 3px #ff0000, inset 0 0 5px #ff0000, inset 0 0 10px #ff0000'"
        onmouseout="this.style.boxShadow='0 0 5px 3px #00aa00, inset 0 0 5px #00aa00, inset 0 0 10px #00aa00'"
      >
        <span
          class="text-[20px]"
          style="
            text-shadow:
              0 0 2px #00aa00,
              0 0 4px #00aa00,
              0 0 8px #00aa00;
          "
          >Total Price : 1,020,400
        </span>
        <span
          class="mt-[10px] text-[20px]"
          style="
            text-shadow:
              0 0 2px #ff0000,
              0 0 4px #ff0000,
              0 0 8px #ff0000;
          "
        >
          Week Price : 35,000
        </span>
      </div>
      <Chart option="week" />
      <Chart option="month" />
    </div>
  </div>
</template>

<script setup>
import Calendar from "../components/Calendar.vue";
import Chart from "../components/Chart.vue";
</script>

<style scoped>
#bg {
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
}
</style>
