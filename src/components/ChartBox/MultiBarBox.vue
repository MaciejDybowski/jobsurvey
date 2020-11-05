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
      <Bar :chartdata="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import Bar from "./Bar.js";
//import getColorTable from "../../assets/colors.js";

export default {
  components: {
    Bar,
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
        labels: [
          "Data One",
          "Data Two",
          "Data 3",
          "Data 4",
          "Data 5",
          "Data 6",
          "Data 7",
        ],
        datasets: [
          {
            barPercentage: 1,
            barThickness: 25,
            maxBarThickness: 50,
            minBarLength: 1,
            backgroundColor: "#4C86A8",
            data: [10, 20, 30, 40, 50, 60, 70],

            label: "Pierwszy zestaw danych",
            xAxisID: 0,
            yAxisID: 0,
          },
          {
            barPercentage: 1,
            barThickness: 25,
            maxBarThickness: 50,
            minBarLength: 1,
            backgroundColor: "#8E3B46",
            data: [10, 20, 30, 40, 50, 60, 70].reverse(),

            label: "Pierwszy zestaw danych",
            xAxisID: 0,
            yAxisID: 0,
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true,
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