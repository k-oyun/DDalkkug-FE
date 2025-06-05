<template>
  <div
    class="calendar-container h-[670px] w-[900px] rounded-[15px] border-1 border-[white] bg-black/70 text-white transition-all duration-100 ease-in-out sm:ml-0 sm:w-[300px] md:ml-0 md:w-[800px] lg:w-[800px] xl:ml-[50px] xl:w-[900px] 2xl:ml-[50px] 2xl:h-[676px] 2xl:w-[1000px]"
    style="
      /* filter: drop-shadow(0 0 20px #fff); */
      box-shadow:
        0 0 5px 3px #00aa00,
        inset 0 0 5px #00aa00,
        inset 0 0 10px #00aa00;
    "
    onmouseover="this.style.boxShadow='0 0 5px 3px #ff0000, inset 0 0 5px #ff0000, inset 0 0 10px #ff0000'"
    onmouseout="this.style.boxShadow='0 0 5px 3px #00aa00, inset 0 0 5px #00aa00, inset 0 0 10px #00aa00'"
  >
    <div
      class="calendar-header mb-[30px] flex items-center justify-between p-[0.5rem] pr-[15px] pl-[15px] font-bold"
    >
      <button
        @click="prevMonth"
        class="cursor-pointer text-4xl hover:scale-130"
      >
        <
      </button>
      <span
        class="md:text-[25px] lg:text-[25px] xl:text-[25px] 2xl:text-[25px]"
        style=""
        >{{ year }} / {{ month + 1 }}</span
      >
      <button
        @click="nextMonth"
        class="cursor-pointer text-4xl hover:scale-130"
      >
        >
      </button>
    </div>
    <div class="calendar-grid w-[100%]">
      <div
        class="2xl: mb-[10px] text-[20px] font-bold"
        v-for="day in days"
        :key="day"
      >
        {{ day }}
      </div>
      <div class="day" v-for="day in blankDays" :key="'blank-' + day"></div>
      <div
        class="flex h-[110px] cursor-pointer justify-around border-1 p-[0.5rem] text-[20px] 2xl:text-[22px]"
        v-for="day in daysInMonth"
        :key="day"
        :class="{ today: isToday(day), selected: selectedDate === day }"
        @click="selectDate(day)"
      >
        {{ day }}
        <div
          class="h-[100%] w-[80px] text-[14px] hover:scale-110 2xl:text-[18px]"
        >
          <div class="flex items-center">
            <img src="../assets/soju.png" class="h-[30px]" id="soju" />
            <span class="ml-[1px]" style="text-shadow: none">10병</span>
          </div>
          <div class="flex items-center">
            <img src="../assets/beer.png" class="h-[30px]" id="beer" />
            <span style="text-shadow: none">20병</span>
          </div>
          <span class="text-[14px] 2xl:text-[18px]" style="text-shadow: none"
            >213210
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import useMainApi from "../api/main.js";

const today = new Date();
const current = ref(new Date());
const selectedDate = ref(null);

const year = computed(() => current.value.getFullYear());
const month = computed(() => current.value.getMonth());

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate();
});

const blankDays = computed(() => {
  const firstDay = new Date(year.value, month.value, 1).getDay();
  return Array.from({ length: firstDay }, (_, i) => i);
});

const prevMonth = () => {
  current.value = new Date(year.value, month.value - 1, 1);
};
const nextMonth = () => {
  current.value = new Date(year.value, month.value + 1, 1);
};
const selectDate = (day) => {
  selectedDate.value = day;
};
const isToday = (day) => {
  return (
    day === today.getDate() &&
    month.value === today.getMonth() &&
    year.value === today.getFullYear()
  );
};

const { calendarGet } = useMainApi();

onMounted(async () => {
  const res = await calendarGet(year.value, month.value + 1);
  console.log(res);
  console.log(year.value, month.value);
});
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.today {
  text-shadow:
    0 0 2px #ff0000,
    0 0 4px #ff0000,
    0 0 8px #ff0000,
    0 0 12px #ff0000,
    0 0 20px #ff0000,
    0 0 35px #ff0000,
    0 0 60px #ff0000,
    0 0 60px #ff0000,
    0 0 90px #ff0000,
    0 0 110px #ff0000;
}
.selected {
  text-shadow:
    0 0 2px #00aa00,
    0 0 4px #00aa00,
    0 0 8px #00aa00,
    0 0 12px #00aa00,
    0 0 20px #00aa00,
    0 0 35px #00aa00,
    0 0 60px #00aa00,
    0 0 60px #00aa00,
    0 0 90px #00aa00,
    0 0 110px #00aa00;
}
#soju {
  filter: drop-shadow(0 0 1px green) drop-shadow(0 0 1px green)
    drop-shadow(0 0 1px green);
}
#beer {
  filter: drop-shadow(0 0 0.18px #d3aa17) drop-shadow(0 0 0.18px #d3aa17)
    drop-shadow(0 0 0.18px #d3aa17);
}
</style>
