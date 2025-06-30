<template>
  <div
    class="calendar-container h-[710px] w-[900px] rounded-[15px] border-1 border-[white] bg-black/70 text-white transition-all duration-100 ease-in-out sm:ml-0 sm:w-[300px] md:ml-0 md:w-[800px] lg:w-[800px] xl:ml-[50px] xl:w-[900px] 2xl:ml-[50px] 2xl:h-[676px] 2xl:w-[1000px]"
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
      class="calendar-header mb-[0px] flex items-center justify-between p-[0.5rem] pr-[15px] pl-[15px] font-bold"
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
      >
        {{ year }} / {{ month + 1 }}
      </span>
      <button
        @click="nextMonth"
        class="cursor-pointer text-4xl hover:scale-130"
      >
        >
      </button>
    </div>
    <div
      class="flex h-[auto] w-[100%] justify-end text-[12px] font-bold md:text-[16px] lg:text-[16px]"
    >
      <!-- ------------------------------------------------------------------------------------ -->
      <div class="flex flex-col">
        <select
          v-model="selectedGroup"
          class="text-right focus:border-transparent focus:ring-0 focus:outline-none"
          style="
            text-shadow:
              0 0 2px blue,
              0 0 4px blue,
              0 0 8px blue,
              0 0 12px blue,
              0 0 20px blue,
              0 0 35px blue,
              0 0 60px blue,
              0 0 60px blue,
              0 0 90px blue,
              0 0 110px blue;
          "
        >
          <option value="" disabled selected>그룹</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
        <div
          class="mt-[5px] mr-[10px] mb-[5px] cursor-pointer text-right"
          id="myPage"
          style="
            text-shadow:
              0 0 2px #00aa00,
              0 0 4px #00aa00,
              0 0 8px #00aa00,
              0 0 12px #00aa00;
          "
          @click="
            () => {
              router.push('/myspace');
            }
          "
        >
          나의 공간으로
        </div>
      </div>
    </div>
    <div class="calendar-grid w-[100%]">
      <div
        class="2xl: mb-[10px] text-[8px] font-bold sm:text-[8px] md:text-[14px] lg:text-[20px] 2xl:text-[20px]"
        v-for="day in days"
        :key="day"
      >
        {{ day }}
      </div>
      <div class="day" v-for="day in blankDays" :key="'blank-' + day"></div>

      <div
        class="flex h-[70px] cursor-pointer justify-start border p-1 text-[10px] sm:h-[90px] sm:p-2 sm:text-[13px] md:h-[110px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px]"
        v-for="day in daysInMonth"
        :key="day"
        :class="{ today: isToday(day), selected: selectedDate === day }"
        @click="selectDate(day)"
      >
        {{ day }}
        <template v-if="dayData = getDayData(day)">
          <div
            class="mt-[2px] ml-[2px] w-full text-[8px] hover:scale-110 sm:ml-[10px] sm:w-[80px] sm:text-[10px] md:text-[14px] lg:text-[14px] 2xl:text-[18px]"
            v-if="dayData"
          >
            <div
              class="flex h-[20px] items-center sm:h-[25px] md:h-[30px]"
              v-if="dayData.drinkCounts['소주']"
            >
              <img
                src="../assets/soju.png"
                class="max-h-[11px] sm:max-h-[20px] md:max-h-[28px]"
                id="soju"
              />
              <span
                class="ml-[2px] text-[7px] sm:text-[10px] md:text-[14px] lg:text-[14px] 2xl:text-[18px]"
                style="text-shadow: none"
              >
                {{
                  dayData.drinkCounts["소주"] > 100
                    ? "🤢"
                    : dayData.drinkCounts["소주"] + " 병"
                }}
              </span>
            </div>
            <div
              class="flex h-[20px] items-center sm:h-[25px] md:h-[30px]"
              v-if="dayData.drinkCounts['맥주']"
            >
              <img
                src="../assets/beer.png"
                class="max-h-[11px] sm:max-h-[20px] md:max-h-[28px]"
                id="beer"
              />
              <span
                class="ml-[2px] text-[7px] sm:text-[10px] md:text-[14px] lg:text-[14px] 2xl:text-[18px]"
                style="text-shadow: none"
              >
                {{
                  dayData.drinkCounts["맥주"] > 100
                    ? "🤢"
                    : dayData.drinkCounts["맥주"] + " 병"
                }}
              </span>
            </div>
            <span style="text-shadow: none">
              {{ dayData.totalPrice.toLocaleString() }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import useMainApi from "../api/main.js";
import router from "@/router/index.js";

//----------------------------------------------------------------------------
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
const getDayData = (day) => {
  const formatted = `${year.value}-${String(month.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return calendarData.value.find((item) => item.date === formatted);
};

//----------------------------------------------------------------------------

const { calendarGet, groupListGet, groupCalendarGet } = useMainApi();
const calendarData = ref([]);
const groups = ref([]);
const selectedGroup = ref("");
watch(selectedGroup, async () => {
  const groupData = await groupCalendarGet(
    selectedGroup.value,
    year.value,
    month.value + 1,
  );
  calendarData.value = groupData.data.data;
  send();
});
onMounted(async () => {
  const res = await calendarGet(year.value, month.value + 1);
  calendarData.value = res.data.data;
  const res2 = await groupListGet();
  groups.value = res2.data.data;
});

const emit = defineEmits(["send-group-id"]);
const send = () => {
  emit("send-group-id", selectedGroup.value);
};
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

@keyframes logoFlicker {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.8;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.8;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

#myPage {
  animation: logoFlicker 1s infinite;
}
</style>
