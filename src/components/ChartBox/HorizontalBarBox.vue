<template>
  <div class="chartbox" v-if="loader">
    <div class="text">
      <p>
        {{ questionDescription }}
      </p>
    </div>
    <div class="chart">
      <HorizontalBar :chartdata="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import HorizontalBar from "./HorizontalBar.js";
import getColorTable from "../../assets/colors.js";

export default {
  components: {
    HorizontalBar,
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
            barThickness: 20,
            maxBarThickness: 20,
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
        // wylaczenie legendy na gorze
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        // ustawiania osi
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
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