<template>
<v-card class="question" fluid>
    <v-icon medium>mdi-dots-horizontal</v-icon>
    <v-row>
        <v-col>
            <v-text-field label="Question name" hide-details="auto" v-model="item.questionName"></v-text-field>
        </v-col>

    </v-row>
    <v-row>
        <v-col v-if="item.questionType != 'input' && item.questionType != 'textarea'">
            <v-text-field label="Add answer (Click enter to add)" @keyup.enter="addAnswer(item)" v-model="newAnswer" hide-details="auto"></v-text-field>
        </v-col>
        <v-col>
            Type: <v-icon>{{questionType.icon}}</v-icon> {{questionType.typeName}}

        </v-col>
    </v-row>
    <v-row v-if="item.questionType == 'input'">
        <v-text-field readonly label="Answer" v-model="newAnswer" hide-details="auto"></v-text-field>
    </v-row>
    <v-row v-else-if="item.questionType == 'textarea'">
        <v-textarea solo readonly label="Answer"></v-textarea>
    </v-row>
    <v-row v-else>
        Answers:
        <v-list>
            <v-col>
                <v-list>
                    <template v-for="(answer) in item.questionAnswers">
                        <v-list-item :key="answer.answerId">
                            <v-text-field v-model="answer.answerName" hide-details="auto" append-icon="mdi-delete" @click:append="deleteAnswer(answer)"></v-text-field>
                        </v-list-item>

                    </template>
                </v-list>
            </v-col>
        </v-list>
    </v-row>
    <v-row>
        <v-select :items="chartTypes" v-model="item.chartType" item-text="name" item-value="value" label="Char Type"></v-select>
    </v-row>
    <v-row>
        <v-btn icon small @click="deleteQuestion()">
            <v-icon>mdi-trash-can</v-icon>
        </v-btn>
    </v-row>
    <DeleteDialog :dialogDelete="dialogDelete" @deleteItemConfirm="deleteItemConfirm" />
</v-card>
</template>

<script>
import questionsType from '../../../../assets/questionsType.js';
import chartTypeList from '../../../../assets/chartTypes.js';
import DeleteDialog from '../../Dialogs/DeleteDialog.vue';
export default {
    props: ["item"],
    components: {
        DeleteDialog
    },
    data() {
        return {
            newAnswer: "",
            questionType: null,
            chartTypes: chartTypeList,
            dialogDelete: {
                show: false,
                infoText: null,
                loading: false,
            },
        }
    },
    created() {
        this.getQuestionType();
    },
    methods: {
        getQuestionType() {
            this.questionType = questionsType.find(x => x.type === this.item.questionType)
        },
        deleteQuestion() {
            this.dialogDelete.infoText = "Are you sure ?"
            this.dialogDelete.show = true;
        },
        deleteItemConfirm() {
            this.$emit('deleteQuestion', this.item);
        },
        addAnswer() {
            const addNewAnswer = {
                answerName: this.newAnswer,
                answerId: null
            }
            this.item.questionAnswers.push(addNewAnswer)
            this.newAnswer = "";
        },
        deleteAnswer(answer) {
            var index = this.item.questionAnswers.findIndex(element => element == answer)
            this.item.questionAnswers.splice(index, 1);

        }
    }
}
</script>

<style>

</style>
