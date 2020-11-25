<template>
<v-card class="question margin" fluid>
    <v-icon medium>mdi-dots-horizontal</v-icon>
    <v-row>
        <v-col>
            <v-text-field readonly label="Question name" hide-details="auto" v-model="questionData.questionName"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            Type: <v-icon>{{questionType.icon}}</v-icon> {{questionType.typeName}}
        </v-col>
    </v-row>
    <v-row v-if="questionData.questionType == 'input'">
        <v-text-field readonly label="Answer" hide-details="auto"></v-text-field>
    </v-row>
    <v-row v-else-if="questionData.questionType == 'textarea'">
        <v-textarea readonly solo label="Answer"></v-textarea>
    </v-row>
    <v-row v-else>
        Answers:
        <v-list>
            <v-col>
                <v-list>
                    <template v-for="(answer) in item.questionAnswers">
                        <v-list-item :key="answer.answerId">
                            <v-text-field readonly v-model="answer.answerName" hide-details="auto"></v-text-field>
                        </v-list-item>
                    </template>
                </v-list>
            </v-col>
        </v-list>
    </v-row>
    <v-row>
        <v-select readonly :items="chartTypes" v-model="questionData.chartType" item-text="name" item-value="value" label="Char Type"></v-select>
    </v-row>
    <v-row>
        <v-btn icon small @click="deleteQuestion()">
            <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon small @click="editQuestion()">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </v-row>
    <EditDialogQuestion :editDialog="editDialog" @editQuestionConfirm="editQuestionConfirm" />
    <DeleteDialog :dialogDelete="dialogDelete" @deleteItemConfirm="deleteItemConfirm" />
</v-card>
</template>

<script>
import questionsType from '../../../../assets/questionsType.js';
import chartTypeList from '../../../../assets/chartTypes.js';
import EditDialogQuestion from '../../Dialogs/EditDialogQuestion.vue';
import DeleteDialog from '../../Dialogs/DeleteDialog.vue';
import axios from 'axios';
export default {
    props: ["item"],
    components: {
        EditDialogQuestion,
        DeleteDialog
    },
    data() {
        return {
            questionType: null,
            questionData: this.item,
            editDialog: {
                show: false,
                loading: false,
                data: {
                    questionId: null,
                    questionName: null,
                    questionType: null,
                    chartType: null,
                    questionAnswers: []
                },
            },
            chartTypes: chartTypeList,
            snackBar: this.$store.getters.snackBar,
            dialogDelete: {
                show: false,
                infoText: null,
                loading: false,
            },
        }
    },
    computed: {
        updateData: {
            get: function(){
                return this.questionData;
            },

            set: function (newVal){
            this.questionData = newVal
            this.$emit('editQuestion', newVal);
        }

        }
    },
    created() {
        this.getQuestionType();
        this.editDialog.data = this.item;
    },
    methods: {
        getQuestionType() {
            this.questionType = questionsType.find(x => x.type === this.item.questionType)
        },
        deleteQuestion() {
            this.dialogDelete.item = this.item;
            this.dialogDelete.infoText = "Are you sure ?"
            this.dialogDelete.show = true;
        },
        async deleteItemConfirm() {
            this.dialogDelete.loading = true;
            await axios({
                    method: "delete",
                    url: `${this.$store.state.serverUrl}/surveys/${this.$route.params.id}/questions/${this.item.questionId}`,
                    data: this.dialogDelete.item.questionId,
                    headers: {
                        Authorization: this.$cookie.get('token')
                    }
                })
                .then(() => {
                    this.$emit('deleteQuestion', this.item);
                    this.dialogDelete.show = false;
                    this.dialogDelete.loading = false;
                     this.snackBar.show = true;
                })
                .catch(() => {
                    this.dialogDelete.show = false;
                    this.dialogDelete.loading = false;
                    this.snackBar.show = true;
                    this.snackBar.infoText = "Error";
                    this.snackBar.color = "error";
                    this.$store.dispatch("showSnackBar", this.snackBar);
                })

        },
        editQuestion() {
            this.editDialog.show = true;
            this.editDialog.data = JSON.parse(JSON.stringify(this.questionData));
        },
        async editQuestionConfirm() {
            this.editDialog.loading = true;
            console.log(this.editDialog.data);
            await axios({
                    method: "put",
                    url: `${this.$store.state.serverUrl}/surveys/${this.$route.params.id}/questions/${this.editDialog.data.questionId}`,
                    data: this.editDialog.data,
                    headers: {
                        Authorization: this.$cookie.get('token')
                    }
                })
                .then((response) => {
                    this.editDialog.data.questionId = response.data;
                    this.updateData = this.editDialog.data;
                    this.editDialog.show = false;
                    this.editDialog.loading = false;
                    this.snackBar.show = true;
                    this.snackBar.infoText = "Question edit";
                    this.snackBar.color = "success"
                    this.$store.dispatch("showSnackBar", this.snackBar);
                })
                .catch((err) => {
                    console.log(err);
                    this.editDialog.loading = false;
                    this.snackBar.show = true;
                    this.snackBar.color = "error"
                    this.snackBar.infoText = "Server error";
                    this.$store.dispatch("showSnackBar", this.snackBar);
                })
        }
    }
}
</script>

<style>
.margin {
    margin-top: 50px;
}
</style>
