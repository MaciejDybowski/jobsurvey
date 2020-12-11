
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
        <v-row v-if="flagSurvey === true">
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet rounded="lg">
              <div class="survey-wrapper">
                <form class="survey-form" @submit.prevent="sendSurvey">
                  <div class="questions" v-for="(q, i) in questions" :key="i">
                    <div class="question" v-if="q.questionType === 'select'">
                      <Select
                        :questionNumber="i"
                        :questionName="q.questionName"
                        :questionAnswers="q.questionAnswers"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                    <div
                      class="question"
                      v-else-if="q.questionType === 'radio'"
                    >
                      <Radio
                        :questionNumber="i"
                        :questionName="q.questionName"
                        :questionAnswers="q.questionAnswers"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                    <div
                      class="question"
                      v-else-if="q.questionType === 'input'"
                    >
                      <Input
                        :questionNumber="i"
                        :questionName="q.questionName"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                  </div>

                  <v-btn
                    class="submitbtn"
                    type="submit"
                    color="primary"
                    elevation="2"
                    >Wyślij ankietę</v-btn
                  >
                </form>
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
import Select from "../components/Questions/Select.vue";
import Radio from "../components/Questions/Radio.vue";
import Input from "../components/Questions/Input.vue";
import DoughnutBox from "../components/ChartBox/DoughnutBox.vue";
import BarBox from "../components/ChartBox/BarBox.vue";
//import MultiBarBox from "../components/ChartBox/MultiBarBox";
import HorizontalBatBox from "../components/ChartBox/HorizontalBarBox";
import Countdown from "vuejs-countdown";
import Origami from "vue-loading-spinner/src/components/Origami";

export default {
  name: "websocketdemo",
  components: {
    Select,
    Radio,
    Input,
    DoughnutBox,
    BarBox,
    Countdown,
    Origami,
    //MultiBarBox,
    HorizontalBatBox,
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
      flag: false,
      flagSurvey: true,
      flagAll: false,

      questions2: [],
    };
  },
beforeMount() {
    // jezeli nie ma sesji dla zwykłego usera to znaczy ze to jego pierwsza ankieta w ktorej bierze udzial
    //this.$session.destroy();
    if (!this.$session.exists()) {
      this.$session.start();
      //console.log("startuje sesje");
      const tab = [];
      this.$session.set("surveySecure", tab);
    } else {
      //console.log("Sesja juz jest");
      //console.log(this.$session.get("surveySecure"));
    }

    // pobieram tablice hashow na ktore odpowiedzi user odpowiedzial
    const securityTable = this.$session.get("surveySecure");
    // sprawdzenie tablicy a aktualnym hashem -> jesli znajduje sie na liscie i wyslal juz odpowiedzi to przekierowanie na podziekowania
    if (securityTable !== undefined) {
      securityTable.forEach((survey) => {
        if (survey.hash === "SsAese%20tU" && survey.isAnswerSend) {
          this.$router.push("/results");
        }
      });
    }
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
    // metoda zapisująca wyniki usera
    saveData(id, answer) {
      const obj = {
        questionId: id,
        answer: answer,
      };
      let index = this.answers.findIndex(
        (e) => e.questionId === obj.questionId
      );

      if (index === -1) {
        this.answers.push(obj);
      } else {
        let currentAnswer = {
          questionId: id,
          answer: answer,
        };
        this.answers[index] = currentAnswer;
      }
    },
    // metoda do wyslania ankiety do bazy
    sendSurvey() {
      if (this.questions.length !== this.answers.length) {
        alert("Nie podałeś odpowiedzi na wszystkie pytania");
      } else {
        const survey = {
          surveyId: this.apiCall,
          answers: this.answers,
        };

        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send("/survey/test", JSON.stringify(survey), {});
        }
        const securityObj = {
              hash: "SsAese%20tU",
              isAnswerSend: true,
            };
            // tablica zabezpieczen dla wielokrotnego odpalenia tej samej ankiety
            const tempArray = this.$session.get("surveySecure");
            // pobieramy co aktualnie tam jest,
            if (tempArray !== undefined) {
              tempArray.push(securityObj);
              this.$session.set("surveySecure", tempArray);
            } else {
              let a = [];
              this.$session.set("surveySecure", a);
            }

        setTimeout(() => {
          this.flag = true;
          this.flagSurvey = false;
        }, 1000);
      }
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
.spinner {
  margin: auto;
}

.spinner-text {
  text-align: center;
}
</style>