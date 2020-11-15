<template>
  <div class="chartbox" v-if="loader">
    <div class="text">
      <p>
        {{ questionDescription }}
      </p>
    </div>
    <div class="chart">
      <Doughnut :chartdata="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import Doughnut from "./Doughnut.js";
import getColorTable from "../../assets/colors.js";

export default {
  components: {
    Doughnut,
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
    console.log(this.chartDataAnswers);
    this.fillData();

    this.loader = true;
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.chartDataAnswers,
        datasets: [
          {
            backgroundColor: getColorTable(this.chartDataAnswers.length),
            borderColor: getColorTable(this.chartDataAnswers.length),
            data: this.chartResultData,
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 85,
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 14,
          },
        },
      };
    },

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style lang="scss">
.chartbox {
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding: 20px 20px;
  background-color: rgba(40, 42, 72, 0.9);
  color: rgb(197, 197, 197);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    p {
      text-align: justify;
    }
  }
}

#horizontalbar-chart {
  color: white !important;
}
</style>
