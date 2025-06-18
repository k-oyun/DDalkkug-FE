<template>
  <div
    class="flex h-[100vh] w-[100%] min-w-[100%] items-center justify-center"
    id="bg"
  >
    <Calendar @send-group-id="getGroupId" />
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
        >
          Total Price : {{ Prices.totalPaid }} 원
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
      <Chart option="week" :group-id="groupId" />
      <Chart option="month" :group-id="groupId" />
    </div>
  </div>
</template>

<script setup>
import Calendar from "../components/Calendar.vue";
import Chart from "../components/Chart.vue";
import useMainApi from "../api/main.js";
import { onMounted, ref, watch, computed } from "vue";
const current = ref(new Date());

const getWeekOfMonth = (date) => {
  const first = new Date(year, month, 1);
  const day = date.getDate();
  const firstDay = first.getDay() || 7; // 일요일(0)을 7로 보정
  const curDay = date.getDay() || 7;

  return Math.ceil((day + firstDay - 1) / 7);
};

const weekOfMonth = computed(() => getWeekOfMonth(current.value));
const year = computed(() => current.value.getFullYear());
const month = computed(() => current.value.getMonth());

//------------------------------------------------------------------------
const { PriceGet, GroupPriceGet } = useMainApi();

const groupId = ref("");
const getGroupId = (id) => {
  groupId.value = id;
};
const Prices = {
  weekPrice: ref(0),
  totalPaid: ref(0),
};
onMounted(async () => {
  const res = await PriceGet(year.value, month.value + 1, weekOfMonth.value);
  Prices.weekPrice.value = res.data.data.weekPrice.toLocaleString();
  Prices.totalPaid.value = res.data.data.totalPaid.toLocaleString();
});

watch(groupId, async () => {
  const res = await GroupPriceGet(
    groupId.value,
    year.value,
    month.value + 1,
    weekOfMonth.value,
  );
  console.log(res);
  Prices.weekPrice.value = res.data.data.weekPrice.toLocaleString();
  Prices.totalPaid.value = res.data.data.groupTotalPaid.toLocaleString();
});
</script>

<style scoped>
#bg {
  background-image: url("../assets/background-img.png");
  background-size: cover;
  background-position: center;
}
</style>
