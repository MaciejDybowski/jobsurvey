<template>
  <div class="chartbox" v-if="loader">
    <div class="text">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque porro
        illo doloremque, quae maiores incidunt mollitia. Velit amet error ea
        eveniet, doloribus eum dolorem ad, perspiciatis molestiae labore
        mollitia! Aut!
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
        labels: ["Data One", "Data Two"],
        datasets: [
          {
            backgroundColor: getColorTable(2),
            borderColor: getColorTable(2),
            data: [10, 32],
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 85,
      };
    },

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style lang='scss'>
.chartbox {
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding: 20px 20px;
  background-color: rgb(40, 42, 72);
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
</style>