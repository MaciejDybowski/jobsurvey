<template>
  <div class="chartbox" v-if="loader">
    <div class="text">
      <p>
        {{ questionDescription }}
      </p>
    </div>
    <div class="chart">
      <Bar :chartData="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import Bar from "./Bar.js";
import getColorTable from "../../assets/colors.js";

export default {
  components: {
    Bar,
  },
  props: {
    chartDataAnswers: Array,
    chartResultData: Array,
    questionDescription: String,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      loader: false,
    };
  },
  watch: {
    chartResultData() {
      this.fillData();
    },
  },
  mounted() {
    this.fillData();
    this.loader = true;
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.chartDataAnswers,
        datasets: [
          {
            barPercentage: 1,
            barThickness: 50,
            maxBarThickness: 50,
            minBarLength: 1,
            backgroundColor: getColorTable(this.chartDataAnswers.length),
            data: this.chartResultData,

            label: this.questionDescription,
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 10,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 10,
                beginAtZero: true,
              },
            },
          ],
        },
      };
    },
  },
};
</script>

<style lang='scss'>
</style>