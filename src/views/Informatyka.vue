<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet rounded="lg">
              <div class="nav">
                <div class="link-box">
                  <router-link to="/comingSoon">Raport ogólny</router-link>
                </div>
                <div class="link-box active">
                  <router-link to="/Informatyka">Informatyka WAT</router-link>
                </div>
                <div class="link-box">
                  <router-link to="/Kryptologia">Kryptologia WAT</router-link>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
              <div class="wrapper" v-for="(question, i) in questions" :key="i">
                <div v-if="question.chartType === 'doughnut'">
                  <DoughnutBox
                    :chartDataAnswers="question.answers"
                    :chartResultData="question.results"
                    :questionDescription="question.question"
                  />
                </div>
                <div v-else-if="question.chartType === 'bar'">
                  <BarBox
                    :chartDataAnswers="question.answers"
                    :chartResultData="question.results"
                    :questionDescription="question.question"
                  />
                </div>
                <div v-else-if="question.chartType === 'horizontalbar'">
                  <HorizontalBatBox
                    :chartDataAnswers="question.answers"
                    :chartResultData="question.results"
                    :questionDescription="question.question"
                  />
                </div>

                <!---<MultiBarBox />-->
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DoughnutBox from "../components/ChartBox/DoughnutBox.vue";
import BarBox from "../components/ChartBox/BarBox.vue";
//import MultiBarBox from "../components/ChartBox/MultiBarBox";
import HorizontalBatBox from "../components/ChartBox/HorizontalBarBox";
import axios from "axios";

export default {
  name: "Informatyka",
  components: {
    DoughnutBox,
    BarBox,
    //MultiBarBox,
    HorizontalBatBox,
  },
  data() {
    return {
      links: ["Strona główna", "Zaloguj"],
      questions: null,
    };
  },
  mounted() {
    axios
      .get(
        `${this.$store.state.serverUrl}/surveys/survey0.471107988201993071/charts`,
        {
          crossDomain: true,
        }
      )

      .then((res) => {
        this.questions = res.data;
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.flag = true;
  },
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 10px;

  .link-box {
    height: 100%;
    border: 2px solid gray;
    border-radius: 5px;
    margin: 10px 10px;
    padding: 5px 7px;
    text-align: center;

    a {
      text-decoration: none;
      color: gray;
    }

    &:hover {
      border: 2px solid purple;
    }
  }

  .active {
    a {
      color: purple !important;
    }

    border: 2px solid purple !important;
  }
}

.wrapper {
  padding: 20px 0px;
}
</style>
