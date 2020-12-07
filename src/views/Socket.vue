
<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet rounded="lg">
              <div class="nav">
                <p>Websocket</p>
              </div>
              <div class="connections">
                <div class="btn-con">
                  <v-btn
                    primary
                    color="primary"
                    :disabled="connected == true"
                    @click.prevent="connect"
                    >Connect</v-btn
                  >
                </div>

                <div class="btn-con">
                  <v-btn
                    primary
                    color="error"
                    :disabled="connected == false"
                    @click.prevent="disconnect"
                    class="btn-con"
                    >Disconnect</v-btn
                  >
                </div>
              </div>
              <div class="input-text">
                <label for="name">What is your name?</label>
                <input
                  type="text"
                  v-model="send_message"
                  placeholder="Your name here..."
                />
                <div class="btn-con">
                  <v-btn
                    primary
                    color="primary"
                    type="submit"
                    @click.prevent="send"
                    >Send</v-btn
                  >
                </div>
              </div>
              <div class="informations">
                <table id="conversation" class="table table-striped">
                  <thead>
                    <tr>
                      <th>Greetings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in received_messages" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="question"></div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="20vh" rounded="lg">
              <div class="survey-wrapper">
                <p class="title">Ankieta dla {{ surveyName }}</p>
                <p class="description">{{ surveyDescription }}</p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="70vh" rounded="lg">
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
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
              <div class="wrapper" v-for="(question, i) in questions2" :key="i">
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

export default {
  name: "websocketdemo",
  components: {
    Select,
    Radio,
    Input,
    DoughnutBox,
    BarBox,
    //MultiBarBox,
    HorizontalBatBox,
  },
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false,

      apiCall: "SsAese%20tU",
      surveyName: "", // tytul ankiety z bazy
      surveyDescription: "", //data.surveyDescription, // opis ankiety z bazy danych
      questions: [], //data.questions, // lista pytan pobranych podczas zamontowania komponentu
      answers: [], // pusta tablica przygotowana pod emitowanie odpowiedzi z dzieci i finalnie wyslanie do API
      flag: false,

      questions2: null,
    };
  },
  methods: {
    send() {
      //console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send("/survey/submit", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS("https://surveyrest.herokuapp.com/test");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          //console.log(frame);
          this.stompClient.subscribe("/prefix/messages", (tick) => {
            console.log("to jest tick");
            console.log(tick);
            this.received_messages.push(JSON.parse(tick.body).content);
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
    // metoda przypisana do kazdego dziecka, wiemy ze dziecko wyemituje nam id i odpowiedz
    saveData(id, answer) {
      //console.log(`Rodzic : ${id} - ${answer}`);
      // laczenie w obiekt
      const obj = {
        questionId: id,
        answer: answer,
      };
      // walidacja zmiany odpowiedzi przez uzytkownika
      // sprawdzamy index - jezlie istnieje juz w tablicy odpowiedzi obiekt z id wyemitowanym z dziecka to oznacza ze
      // uzytkownik zmienil odpowiedz i sprawdzany na jakim indeksie tablicy odpowiedzi jest nasza odpowiedz
      let index = this.answers.findIndex(
        (e) => e.questionId === obj.questionId
      );
      // jesli index zwroci -1 to oznacza ze nie ma takiego id w tablicy odp -> czyli nie udzialal nikt odpowiedzi na to pytania
      if (index === -1) {
        // wiec jak nie ma jeszcze odp na to pytanie to dodajemy obiekt wczesniej przygotowany do tablicy odpowiedzi
        this.answers.push(obj);
      } else {
        // jesli mamy juz obiekt w odpowiedziach o danym id to podmieniamy starą odp na nową
        let currentAnswer = {
          questionId: id,
          answer: answer,
        };
        this.answers[index] = currentAnswer;
      }
    },
    // metoda do wyslania ankiety do bazy
    sendSurvey() {
      // mala walidacja odpowiedzi na wszystkie pytania
      // mianowicie sprawdzamy czy dlugosc tablicy pytan = dlugosci tablicy odp jeśli tak to mamy pewnosc ze wszedzie
      // uzytopwnik udzielil odpowiedzi
      if (this.questions.length !== this.answers.length) {
        /*  console.log(this.answers.length);
        console.log(this.questions.length); */
        alert("Nie podałeś odpowiedzi na wszystkie pytania");
      } else {
        // tworzenie obiektu pod wysłanie do bazy danych
        const survey = {
          surveyId: this.apiCall,
          answers: this.answers,
        };

        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send("/survey/submit", survey, {});
        }
      }
    },
  },
  mounted() {
    axios
      .get(`${this.$store.state.serverUrl}/surveys/SsAese%20tU/charts`, {
        crossDomain: true,
      })

      .then((res) => {
        this.questions2 = res.data;
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //this.flag = true;
    // this.connect();
    const hash = "SsAese%20tU";
    axios
      .get(`${this.$store.state.serverUrl}/surveys/${hash}/questions`, {
        crossDomain: true,
      })

      .then((res) => {
        this.surveyName = res.data.surveyName;
        this.surveyDescription = res.data.surveyDescription;
        this.questions = res.data.questions;
        //console.log(res.data);
        //data.surveyName = res.data;
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    this.flag = true;
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