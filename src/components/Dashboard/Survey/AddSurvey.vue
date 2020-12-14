<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <LeftPanel @addQuestion="addQuestion" />
      </v-col>
      <v-col>
        <SurveyHeader :surveyInfo="surveyInfo" />
        <v-divider></v-divider>
        <h1>Add your questions</h1>
        <drop-list
          :items="surveyQuestions"
          @reorder="$event.apply(surveyQuestions)"
        >
          <template v-slot:item="{ item }">
            <drag :key="item.questionId" :data="item">
              <EditQuestion :item="item" @deleteQuestion="deleteQuestion" />
            </drag>
          </template>
        </drop-list>
        <v-divider></v-divider>
        <v-btn
          x-large
          block
          :loading="loadingSend"
          color="success"
          dark
          @click="sendNewSurvey"
        >
          Save Survey
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import EditQuestion from "./Questions/EditQuestion.vue";
import LeftPanel from "./LeftPanel.vue";
import SurveyHeader from "./Questions/SurveyHeader.vue";
import defaultQuestions from "../../../assets/newSurveyTemplate.js";
import axios from "axios";
export default {
  name: "AddSurvey",
  components: {
    Drag,
    DropList,
    EditQuestion,
    LeftPanel,
    SurveyHeader,
  },
  data() {
    return {
      surveyInfo: {
        surveyId: null,
        surveyName: null,
        surveyDescription: null,
      },
      surveyDefaultQuestion: [],
      surveyQuestions: [],
      snackBar: this.$store.getters.snackBar,
      loadingSend: false,
    };
  },
  methods: {
    addQuestion(item) {
      this.surveyQuestions.splice(this.surveyQuestions.length, 0, item);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      this.snackBar.show = true;
      this.snackBar.infoText = "Question add";
      this.snackBar.color = "success";
      this.$store.dispatch("showSnackBar", this.snackBar);
    },
    data() {
        return {
            surveyInfo: {
                surveyId: null,
                surveyName: null,
                surveyDescription: null,
                surveyStart: null,
                surveyStop: null
            },
            surveyDefaultQuestion: defaultQuestions,
            surveyQuestions: [],
            snackBar: this.$store.getters.snackBar,
            loadingSend: false
        }
    },
    async sendNewSurvey() {
      if (
        this.surveyInfo.surveyName == "" ||
        this.surveyInfo.surveyDescription == ""
      ) {
        this.snackBar.show = true;
        this.snackBar.infoText =
          "You must enter a survey name and description.";
        this.snackBar.color = "error";
        this.$store.dispatch("showSnackBar", this.snackBar);
      } else {
        this.loadingSend = true;
        var sendData = {};
        sendData.surveyId = "survey" + Math.random(Math.random() * 1000) + 1;
        sendData.surveyName = this.surveyInfo.surveyName;
        sendData.surveyDescription = this.surveyInfo.surveyDescription;
        var questionsList = this.surveyDefaultQuestion;
        var lastQuestions = questionsList.length;
        for (var i = 0; i < this.surveyQuestions.length; i++) {
          this.surveyQuestions[i].questionPosition = lastQuestions++;
          if (this.surveyQuestions[i].chartType == null) {
            this.surveyQuestions[i].chartType = "bar";
          }
        }

        questionsList = questionsList.concat(this.surveyQuestions);
        sendData.questions = questionsList;
        await axios({
          method: "post",
          url: `${this.$store.state.serverUrl}/surveys`,
          data: sendData,
          headers: {
            Authorization: this.$cookie.get("token"),
          },
        })
          .then(() => {
            this.loadingSend = false;
            this.snackBar.show = true;
            this.snackBar.infoText = "Survey was add";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
            this.$router.push("/dashboard");
          })
          .catch(() => {
            this.snackBar.show = true;
            this.snackBar.infoText = "Error";
            this.snackBar.color = "error";
            this.$store.dispatch("showSnackBar", this.snackBar);
            this.loadingSend = false;
          });
      }
    },
  },
};
</script>

<style>
.margin {
  margin-top: 20px;
}
</style>
