<template>
<v-container>
    <v-row>
        <v-col cols="4">
            <LeftPanel @addQuestion="addQuestion" />
        </v-col>
        <v-col>
            <SurveyHeader :surveyInfo="surveyInfo" />
            <v-divider></v-divider>
            <drop-list :items="surveyQuestions" @reorder="$event.apply(surveyQuestions)">
                <template v-slot:item="{item}">
                    <drag :key="item.id" :data="item">
                        <Question :item="item" @deleteQuestion="deleteQuestion" />
                    </drag>
                </template>
            </drop-list>
            <v-divider></v-divider>
            <v-btn x-large color="success" dark>
                Save Survey
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
import Question from './Questions/Question.vue';
import LeftPanel from './LeftPanel.vue';
import SurveyHeader from './Questions/SurveyHeader.vue';
export default {
    name: "AddSurvey",
    components: {
        Drag,
        DropList,
        Question,
        LeftPanel,
        SurveyHeader
    },
    data() {
        return {
            surveyInfo: {
                name: null,
                description: null,
            },
            surveyQuestions: [],
        }
    },
    methods: {
        addQuestion(item) {
            this.surveyQuestions.splice(this.surveyQuestions.length, 0, item);
        },
        deleteQuestion(item) {
            var index = this.surveyQuestions.findIndex(element => element == item)
            this.surveyQuestions.splice(index, index + 1);
        }
    }
}
</script>

<style>
.margin {
    margin-top: 20px;
}
</style>
