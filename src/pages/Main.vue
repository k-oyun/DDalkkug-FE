<template>
  <div
    class="flex h-[100vh] w-[100%] min-w-[100%] items-center justify-center"
    id="bg"
  >
    <Calendar />
    <div
      class="ml-[50px] hidden h-[670px] w-[450px] min-w-[450px] flex-col items-center text-white sm:hidden md:hidden lg:hidden xl:flex 2xl:flex 2xl:h-[676px]"
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
          >Total Price : {{ Prices.totalPaid }} 원
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
          Week Price : {{ Prices.weekPrice }} 원
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
import useMainApi from "../api/main.js";
import { onMounted, ref } from "vue";

const { PriceGet } = useMainApi();

const Prices = {
  weekPrice: ref(0),
  totalPaid: ref(0),
};
onMounted(async () => {
  const res = await PriceGet(2025, 6, 1);
  Prices.weekPrice.value = res.data.data.weekPrice.toLocaleString();
  Prices.totalPaid.value = res.data.data.totalPaid.toLocaleString();
});
</script>

<style scoped>
#bg {
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
}
</style>
