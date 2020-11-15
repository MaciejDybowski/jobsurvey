<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="20vh" rounded="lg">
              <p>Witaj w naszej zajebistej ankiecie!</p>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet min-height="70vh" rounded="lg">
              <div class="survey-wrapper">
                <form @submit.prevent="testSubmita">
                  <div class="questions" v-for="(q, i) in questions" :key="i">
                    <div class="question" v-if="q.questionType === 'select'">
                      <Select
                        :questionName="q.questionName"
                        :questionAnswers="q.questionAnswers"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                    <div
                      class="questions"
                      v-else-if="q.questionType === 'radio'"
                    >
                      <Radio
                        :questionName="q.questionName"
                        :questionAnswers="q.questionAnswers"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                    <div
                      class="questions"
                      v-else-if="q.questionType === 'input'"
                    >
                      <Input
                        :questionName="q.questionName"
                        :questionId="q.questionId"
                        @save="saveData"
                      />
                    </div>
                  </div>
                  <button type="submit">Wyślij ankiete</button>
                </form>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Select from "../components/Questions/Select.vue";
import Radio from "../components/Questions/Radio.vue";
import Input from "../components/Questions/Input.vue";
import data from "../assets/dummyData.js";

export default {
  name: "SingleSurvey",
  components: {
    Select,
    Radio,
    Input,
  },
  data() {
    return {
      apiCall: this.$route.params.hash,
      radioGroup: 1,
      questions: data,
      answers: [],
    };
  },
  created() {
    //console.log(data);
  },
  mounted() {
    console.log(this.apiCall);
    async function fetchSurvey() {
      await axios
        .get("https://randomuser.me/api/?results=5000")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    fetchSurvey();
  },
  methods: {
    saveData(id, answer) {
      console.log(`Rodzic : ${id} - ${answer}`);
      const obj = { id, answer };
      let index = this.answers.findIndex((e) => e.id === obj.id);

      if (index === -1) {
        this.answers.push(obj);
      } else {
        console.log(index);
        let currentAnswer = { id, answer };
        console.log(currentAnswer);
        this.answers[index] = currentAnswer;
      }
    },

    testSubmita() {
      console.log(JSON.stringify(this.answers));
    },
  },
};
</script>

<style lang="scss">
.row {
  align-items: center;
  justify-content: center;
}
.survey-wrapper {
  width: 100%;
  .questions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 20px;
  }
}
</style>
