<template>
<v-dialog v-model="editDialog.show" persistent max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline">Edit Question</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="Question name" hide-details="auto" :disabled="editDialog.loading" v-model="editDialog.data.questionName"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="editDialog.data.questionType != 'input' && editDialog.data.questionType != 'textarea'">
                        <v-text-field label="Add answer (Click enter to add)" :disabled="editDialog.loading" @keyup.enter="addAnswer(editDialog.data)" v-model="newAnswer" hide-details="auto"></v-text-field>
                    </v-col>
                    <v-col>
                        Type: <v-icon>{{questionType.icon}}</v-icon> {{questionType.typeName}}
                    </v-col>
                </v-row>
                <v-row v-if="editDialog.data.questionType == 'input'">
                    <v-text-field label="Answer" v-model="newAnswer" hide-details="auto"></v-text-field>
                </v-row>
                <v-row v-else-if="editDialog.data.questionType == 'textarea'">
                    <v-textarea solo label="Answer"></v-textarea>
                </v-row>
                <v-row v-else>
                    Answers:
                    <v-list>
                        <v-col>
                            <v-list>
                                <template v-for="(answer) in editDialog.data.questionAnswers">
                                    <v-list-item :key="answer.answerId">
                                        <v-text-field v-model="answer.answerName" :disabled="editDialog.loading" hide-details="auto" append-icon="mdi-delete" @click:append="deleteAnswer(answer)"></v-text-field>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-col>
                    </v-list>
                </v-row>
                 <v-row>
                    <v-select :disabled="editDialog.loading" :items="chartTypes" v-model="editDialog.data.chartType" item-text="name" item-value="value" label="Char Type"></v-select>
                    </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text :disabled="editDialog.loading" @click="editDialog.show = false">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text :loading="editDialog.loading" @click="editQuestionConfirm">
                Edit
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import questionsType from '../../../assets/questionsType.js';
import chartTypeList from '../../../assets/chartTypes.js';
export default {
    props: ['editDialog'],
    data() {
        return {
            newAnswer: "",
            questionType: null,
            chartTypes: chartTypeList,
            snackBar: this.$store.getters.snackBar
        }
    },
    created() {
        this.getQuestionType();
    },
    methods: {
        getQuestionType() {
            this.questionType = questionsType.find(x => x.type === this.editDialog.data.questionType)
        },
        addAnswer() {
            const addNewAnswer = {
                answerName: this.newAnswer,
                answerId: null
            }
            this.editDialog.data.questionAnswers.push(addNewAnswer)
            this.newAnswer = "";
            this.snackBar.show = true;
            this.snackBar.infoText = "Answer add";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
        },
        deleteAnswer(answer) {
            var index = this.editDialog.data.questionAnswers.findIndex(element => element == answer)
            this.editDialog.data.questionAnswers.splice(index, 1);
            this.snackBar.show = true;
            this.snackBar.infoText = "Answer delete";
            this.snackBar.color = "success";
            this.$store.dispatch("showSnackBar", this.snackBar);
        },
        editQuestionConfirm() {
            this.$emit('editQuestionConfirm');
        }
    }
}
</script>

<style>

</style>
