<template>
<v-container>
    <v-row>
        <v-col cols="4">
            <LeftPanel @addQuestion="addQuestion" />
        </v-col>

        <v-col>
        
            <SurveyHeader :surveyInfo="surveyInfo" />
            <v-divider></v-divider>
            <h1>Default questions</h1>
            <v-list v-for="item in surveyDefaultQuestion" :key="item.questionId">
                <DefaultQuestion :item="item" />
            </v-list>
            <v-divider></v-divider>
            <h1>Modify your questions</h1>
            <drop-list :items="surveyQuestions" @reorder="$event.apply(surveyQuestions)">
                <template v-slot:item="{item}">
                    <drag :key="item.questionId" :data="item">
                        <EditQuestion v-if="item.newQuestion" :item="item" @deleteQuestion="deleteQuestion" />
                        <ViewQuestion v-else :item="item" @editQuestion="editQuestion" @deleteQuestion="deleteQuestion" />
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
            snackBar: this.$store.getters.snackBar,
        }
    },
    created() {
        this.fetchSurvey();
    },
    computed: {
        updateQuestion: {
            get: function(index){
                return this.surveyQuestions[index]
            },
            set: function(item){
                let index = this.surveyQuestions.findIndex(element => element.questionPosition == item.questionPosition);
                 this.surveyQuestions[index] = item;
            }
        }
    },
    methods: {
        async fetchSurvey() {
            this.loadingData = true;
            await axios
                .get(`${this.$store.state.serverUrl}/surveys/${this.$route.params.id}/questions`, {
                    crossDomain: true,
                    headers: {
                        Authorization: this.$cookie.get('token')
                    }
                })
                .then((res) => {
                    this.surveyInfo = {
                        surveyId: res.data.surveyId,
                        surveyName: res.data.surveyName,
                        surveyDescription: res.data.surveyDescription,
                        surveyStart: res.data.surveyStart,
                        surveyStop: res.data.surveyStop,
                    }
                    this.surveyQuestions = res.data.questions;
                    this.surveyQuestions.splice(0, 4);
                    this.loadingData = false;
                })
                .catch(() => {});
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
            this.surveyQuestions.splice(index, 1);
            this.snackBar.show = true;
            this.snackBar.infoText = "Question delete";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
        },
        async editSurvey() {
            this.loadingEdit = true;
            const newQuestions = [];
            for (const item of this.surveyQuestions) {
                if (item.newQuestion == true) {
                    newQuestions.splice(newQuestions.length, 0, item);
                }
                delete(item.newQuestion);
            }

            const sendData = {};
            sendData.surveyId = this.$route.params.id;
            sendData.surveyDescription = this.surveyInfo.surveyDescription;
            sendData.surveyName = this.surveyInfo.surveyName;
            sendData.surveyStart = this.surveyInfo.surveyStart;
            sendData.surveyStop = this.surveyInfo.surveyStop;
            sendData.questions = newQuestions;
            await axios({
                        method: "post",
                        url: `${this.$store.state.serverUrl}/surveys`,
                        data: sendData,
                        headers: {
                            Authorization: this.$cookie.get('token')
                        }
            }).then(async (response) => {

                for(let i = 0; i < response.data.length; i++){
                    newQuestions[i].questionId = response.data[i];
                }


                const questionsPosition = [];
                let i = this.surveyDefaultQuestion.length + 1;
                for (const item of this.surveyQuestions) {
                    const newItem = {}
                    newItem.surveyId = this.$route.params.id;
                    newItem.questionId = item.questionId;
                    newItem.questionPosition = i++;
                    questionsPosition.splice(questionsPosition.length, 0, newItem);
                }
                await this.setPosition(questionsPosition);
            
            })
            .catch(() => {
                this.loadingEdit = false;
                this.snackBar.show = true;
                this.snackBar.infoText = "Error";
                this.snackBar.color = "error";
                this.$store.dispatch("showSnackBar", this.snackBar);
            })
            
        },
        async setPosition(questionsPosition){
            await axios({
                        method: "put",
                        url: `${this.$store.state.serverUrl}/surveys/${this.$route.params.id}/questions/orders`,
                        data: questionsPosition,
                        headers: {
                            Authorization: this.$cookie.get('token')
                        }
                })
                .then(() => {
                    this.loadingEdit = false;
                    this.snackBar.show = true;
                    this.snackBar.infoText = "Survey edit";
                    this.snackBar.color = "success";
                    this.$store.dispatch("showSnackBar", this.snackBar);
                    this.$router.push('/dashboard');
                })
                .catch(() => {
                    this.loadingEdit = false;
                    this.snackBar.show = true;
                    this.snackBar.infoText = "Error";
                    this.snackBar.color = "error";
                    this.$store.dispatch("showSnackBar", this.snackBar);
                })
        },
        editQuestion(item) {
            this.updateQuestion = item;
        },
    }
}
</script>

<style>

</style>
