<template>
  <div
    class="mt-[50px] flex h-[210px] w-[400px] cursor-pointer flex-col rounded-[10px] border-1 bg-black/70 p-10 transition-all duration-500 ease-in-out"
    style="
      box-shadow:
        0 0 5px 3px #00aa00,
        inset 0 0 5px #00aa00,
        inset 0 0 10px #00aa00;
    "
    onmouseover="this.style.boxShadow='0 0 5px 3px #ff0000, inset 0 0 5px #ff0000, inset 0 0 10px #ff0000'"
    onmouseout="this.style.boxShadow='0 0 5px 3px #00aa00, inset 0 0 5px #00aa00, inset 0 0 10px #00aa00'"
  >
    <div
      v-if="monthData.length === 0"
      class="flex h-full w-full items-center justify-center text-center text-3xl text-white"
    >
      Loading...
    </div>
    <v-chart
      v-else
      :option="option === 'week' ? chartWeekOptions : chartMonthOptions"
    />
  </div>
</template>

<script setup>
import { defineProps, computed, onMounted, ref, reactive, watch } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

import useMainApi from "../api/main.js";
const current = ref(new Date());
const year = computed(() => current.value.getFullYear());
const month = computed(() => current.value.getMonth());

const { monthChartGet, weekChartGet, groupWeekChartGet, groupMonthChartGet } =
  useMainApi();
const monthData = ref([]);
const weekData = ref([]);
onMounted(async () => {
  const res = await monthChartGet(year.value, month.value + 1);
  monthData.value = res.data.data;
});

onMounted(async () => {
  const res = await weekChartGet();
  weekData.value = res.data.data.dailyExpenses;
});

const { option, groupId } = defineProps({
  option: String,
  groupId: [String, Number],
});
watch(
  () => groupId,
  async (newGroupId) => {
    const weekRes = await groupWeekChartGet(groupId);
    const monthRes = await groupMonthChartGet(groupId);
    weekData.value = weekRes.data.data.dailyExpenses;
    monthData.value = monthRes.data.data;
  },
);
const chartWeekOptions = computed(() => ({
  // backgroundColor: "#00ff0000",
  title: {
    // text: "네온 차트",
    left: "center",
    top: 20,
    textStyle: {
      color: "#39ff14",
      fontSize: 28,
      textShadowColor: "#39ff14",
      textShadowBlur: 20,
    },
  },
  grid: {
    top: -10,
    bottom: 0,
    left: 0,
    right: 0,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#111",
    borderColor: "#39ff14",
    borderWidth: 1,
    textStyle: {
      color: "#39ff14",
    },
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    axisLine: { lineStyle: { color: "#39ff14" } },
    axisLabel: {
      color: "#0ff",
      fontFamily: "Neon, sans-serif",
      textShadowColor: "#0ff",
      textShadowBlur: 10,
    },
  },
  yAxis: {
    min: 0,
    max: 20,
    axisLine: { lineStyle: { color: "#39ff14" } },
    splitLine: { lineStyle: { color: "#222" } },
    axisLabel: {
      color: "#0ff",
      fontFamily: "Neon, sans-serif",
      textShadowColor: "#0ff",
      textShadowBlur: 20,
    },
  },

  series: [
    {
      name: "금액",
      type: "bar",
      data: [
        weekData.value.월요일,
        weekData.value.화요일,
        weekData.value.수요일,
        weekData.value.목요일,
        weekData.value.금요일,
      ],
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#f0f" },
            { offset: 1, color: "#0ff" },
          ],
        },
        shadowColor: "#f0f",
        shadowBlur: 10,
      },
      barWidth: "40%",
    },
  ],
}));

const chartMonthOptions = computed(() => ({
  // backgroundColor: "#000000",
  title: {
    // text: "네온 차트",
    left: "center",
    top: 20,
    textStyle: {
      color: "#39ff14",
      fontSize: 28,
      textShadowColor: "#39ff14",
      textShadowBlur: 20,
    },
  },
  grid: {
    top: -10,
    bottom: 0,
    left: 0,
    right: 0,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#111",
    borderColor: "#39ff14",
    borderWidth: 1,
    textStyle: {
      color: "#39ff14",
    },
  },
  xAxis: {
    data: [
      monthData.value[0].month + "월",
      monthData.value[1].month + "월",
      monthData.value[2].month + "월",
      monthData.value[3].month + "월",
      monthData.value[4].month + "월",
    ],
    axisLine: { lineStyle: { color: "#39ff14" } },
    axisLabel: {
      color: "#0ff",
      fontFamily: "Neon, sans-serif",
      textShadowColor: "#0ff",
      textShadowBlur: 10,
    },
  },
  yAxis: {
    axisLine: { lineStyle: { color: "#39ff14" } },
    splitLine: { lineStyle: { color: "#222" } },
    axisLabel: {
      color: "#0ff",
      fontFamily: "Neon, sans-serif",
      textShadowColor: "#0ff",
      textShadowBlur: 20,
    },
  },

  series: [
    {
      name: "금액",
      type: "bar",
      data: [
        monthData.value[0].totalPrice,
        monthData.value[1].totalPrice,
        monthData.value[2].totalPrice,
        monthData.value[3].totalPrice,
        monthData.value[4].totalPrice,
      ],
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#f0f" },
            { offset: 1, color: "#0ff" },
          ],
        },
        shadowColor: "#f0f",
        shadowBlur: 10,
      },
      barWidth: "40%",
    },
  ],
}));
</script>
