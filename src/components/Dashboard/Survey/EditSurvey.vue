<template>
<v-container>
    <v-row>
        <v-col cols="4">
            <LeftPanel @addQuestion="addQuestion" />
        </v-col>

        <v-col>
            <SurveyHeader :surveyInfo="surveyInfo" />
            <v-divider></v-divider>
            <v-list v-for="item in surveyDefaultQuestion" :key="item.questionId">
                <DefaultQuestion :item="item" />
            </v-list>
            <v-divider></v-divider>
            <drop-list :items="surveyQuestions" @reorder="$event.apply(surveyQuestions)">
                <template v-slot:item="{item}">
                    <drag :key="item.questionId" :data="item">
                        <EditQuestion v-if="item.newQuestion" :item="item" @deleteQuestion="deleteQuestion" />
                        <ViewQuestion v-else :item="item" @editQuestion="editQuestion" />
                    </drag>
                </template>
            </drop-list>
            <v-divider></v-divider>
            <v-btn x-large block :loading="loadingEdit" @click="editSurvey" color="success" dark>
                Edit Survey
            </v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    Drag,
    DropList
} from "vue-easy-dnd";
import SurveyHeader from './Questions/SurveyHeader.vue';
import ViewQuestion from './Questions/ViewQuestion.vue';
import EditQuestion from './Questions/EditQuestion.vue';
import DefaultQuestion from './Questions/DefaultQuestion.vue'
import LeftPanel from './LeftPanel.vue';
import defaultQuestions from '../../../assets/newSurveyTemplate.js';
import axios from 'axios';
export default {
    name: "EditSurvey",
    components: {
        Drag,
        DropList,
        ViewQuestion,
        EditQuestion,
        LeftPanel,
        SurveyHeader,
        DefaultQuestion
    },
    data() {
        return {
            surveyInfo: [],
            surveyDefaultQuestion: defaultQuestions,
            surveyQuestions: [],
            loadingEdit: false,
            loadingData: false,
            snackBar: this.$store.getters.snackBar,
        }
    },
    created() {
        this.fetchSurvey();
    },
    methods: {
        async fetchSurvey() {
            this.loadingData = true;
            await axios
                .get(`${this.$store.state.serverUrl}/surveys/${this.$route.params.id}/questions`, {
                    crossDomain: true,
                })
                .then((res) => {
                    console.log(res.data);
                    this.surveyInfo = {
                        surveyId: res.data.surveyId,
                        surveyName: res.data.surveyName,
                        surveyDescription: res.data.surveyDescription
                    }
                    this.surveyQuestions = res.data.questions;
                    this.surveyQuestions.splice(0, 6);
                    this.loadingData = false;
                })
                .catch((err) => console.log(err));
        },
        addQuestion(item) {
            item.newQuestion = true;
            this.surveyQuestions.splice(this.surveyQuestions.length, 0, item);
            this.snackBar.show = true;
            this.snackBar.infoText = "Question add";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
        },
        deleteQuestion(item) {
            let index = this.surveyQuestions.findIndex(element => element == item)
            this.surveyQuestions.splice(index, index + 1);
            this.snackBar.show = true;
            this.snackBar.infoText = "Question delete";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
        },
        editSurvey() {
            const newQuestions = [];
            for (const item of this.surveyQuestions) {
                if (item.newQuestion == true) {
                    newQuestions.splice(newQuestions.length, 0, item);
                }
                delete(item.newQuestion);
            }

            const questionsPosition = [];
            let i = this.surveyDefaultQuestion.length + 1;
            for (const item of this.surveyQuestions) {
                const newItem = {}
                newItem.questionId = item.questionId;
                newItem.questionsPosition = i++;
                questionsPosition.splice(questionsPosition.length, 0, newItem);
            }
            console.log(questionsPosition);

            this.snackBar.show = true;
            this.snackBar.infoText = "Survey edit";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
            this.$router.push('/dashboard');
        },
        editQuestion(item) {
            console.log(item);
            let index = this.surveyQuestions.findIndex(element => element.questionId == item.questionId);
            console.log(index);
            this.surveyQuestions[index] = item;
        }
    }
}
</script>

<style>

</style>
