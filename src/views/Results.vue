
<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container v-if="flagAll === true">
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="20vh" rounded="lg">
              <div class="survey-wrapper">
                <p class="title">Ankieta dla {{ surveyName }}</p>
                <p class="description">{{ surveyDescription }}</p>
                <Countdown
                  class="title"
                  deadline="December 09, 2020"
                ></Countdown>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row v-if="flag === true">
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet rounded="lg">
              <!--  -->
              <div
                class="wrapper"
                v-for="(question, i) in questionsAdd"
                :key="i"
              >
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
      <div v-else>
        <p class="spinner-text">Loading...</p>
        <Origami></Origami>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";

import DoughnutBox from "../components/ChartBox/DoughnutBox.vue";
import BarBox from "../components/ChartBox/BarBox.vue";
//import MultiBarBox from "../components/ChartBox/MultiBarBox";
import HorizontalBatBox from "../components/ChartBox/HorizontalBarBox";
import Countdown from "vuejs-countdown";
import Origami from "vue-loading-spinner/src/components/Origami";
export default {
  name: "websocketdemo",
  components: {
    DoughnutBox,
    BarBox,
    Origami,
    //MultiBarBox,
    HorizontalBatBox,
    Countdown,
  },
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false,

      apiCall: "SsAese tU ",
      surveyName: "", // tytul ankiety z bazy
      surveyDescription: "", //data.surveyDescription, // opis ankiety z bazy danych
      questions: [], //data.questions, // lista pytan pobranych podczas zamontowania komponentu
      answers: [], // pusta tablica przygotowana pod emitowanie odpowiedzi z dzieci i finalnie wyslanie do API
      flag: true,
      questions2: [],

      flagAll: false,
    };
  },
  computed: {
    questionsAdd: function () {
      return this.questions2;
    },
  },
  methods: {
    connect() {
      this.socket = new SockJS("https://surveyrest.herokuapp.com/test");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          this.stompClient.subscribe("/prefix/messages/SsAese tU ", (tick) => {
            const obj = JSON.parse(tick.body);
            this.questions2 = obj;
          });
        },
        (error) => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
  },
  mounted() {
    this.connect();
    const hash = "SsAese%20tU";
    axios
      .get(`${this.$store.state.serverUrl}/surveys/${hash}/charts`, {
        crossDomain: true,
      })
      .then((res) => {
        this.questions2 = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${this.$store.state.serverUrl}/surveys/${hash}/questions`, {
        crossDomain: true,
      })
      .then((res) => {
        console.log(res.data);
        this.surveyName = res.data.surveyName;
        this.surveyDescription = res.data.surveyDescription;
        this.questions = res.data.questions;
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      this.flagAll = true;
    }, 3000);
  },
};
</script>

<style lang="scss">
.connections {
  padding: 20px 20px;
  display: flex;

  .btn-con {
    padding: 10px 10px;
  }
}
.input-text {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  input {
    margin-left: 10px;
  }
}
.informations {
  display: flex;
  padding: 20px 20px;
}
</style>