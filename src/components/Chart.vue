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
    <v-chart
      :option="option === 'week' ? chartWeekOptions : chartMonthOptions"
    />
  </div>
</template>

<script setup>
import { defineProps, computed, onMounted, ref } from "vue";
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
const { monthChartGet, weekChartGet } = useMainApi();
onMounted(async () => {
  const res = await monthChartGet(year.value, month.value + 1);
  console.log(res);
});

onMounted(async () => {
  const res = await weekChartGet();
  console.log(res);
});

const { option } = defineProps({ option: String });
const chartWeekOptions = {
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
      name: "총 병수",
      type: "bar",
      data: [20, 5, 20, 0, 30],
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
};

const chartMonthOptions = {
  backgroundColor: "#000000",
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
      name: "총 병수",
      type: "bar",
      data: [20, 35, 50, 40, 60],
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
};
</script>
