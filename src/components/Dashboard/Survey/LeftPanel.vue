<template>
<div class="fixed">
    <v-card>
        <v-card-title>
            Pytania znajdujące się w bazie danych
        </v-card-title>
            <v-data-table
            hide-default-footer
            :page.sync="page"
            :loading="dataLoading"
            loading-text="Loading... Please wait"
            :items="questionsList"
            :items-per-page="itemsPerPage"
            >
            <template v-slot:item="row">
                <tr @click="addQuestion(row.item)">
                    <td>{{row.item.questionName}}</td>
                </tr>
            </template>
        </v-data-table>
        <v-pagination
        v-model="page"
        :length="pageCount"
        ></v-pagination>
    </v-card>

    <v-card class="margin">
        <v-card-title>
            Add New Question
        </v-card-title>
        <v-data-table hide-default-header hide-default-footer :headers="headers" :items="questionTypeList">
            <template v-slot:item="row">
                <tr @click="addNewQuestion(row.item)">
                    <td>
                        <v-icon> {{row.item.icon}} </v-icon> {{row.item.typeName}}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
import questionsType from '../../../assets/questionsType.js';
import axios from 'axios';
export default {
    data() {
        return {
            page: 1,
            pageCount: null,
            itemsPerPage: 5,
            newQuestionKey: 1000,
            headers: [{
                text: 'Question',
                align: 'start',
                filterable: true,
                value: 'questionName',
            }],
            questionsList: [],
            questionTypeList: [],
            dataLoading: false,
            snackBar: this.$store.getters.snackBar,
        }
    },
     watch: {
    page: function(val) {
      console.log('test ' + val);
      this.fetchQuestion(val-1);
    }
     },

    created() {
        this.questionTypeList = questionsType;
        this.fetchQuestion(this.page-1);
    },
    methods: {
        async fetchQuestion(page) {
            this.dataLoading = true;
            await axios
                .get(`${this.$store.state.serverUrl}/questions?numberPerPage=${this.itemsPerPage}&page=${page}`, {
                    crossDomain: true,
                    headers: {
                        Authorization: this.$cookie.get('token')
                    }
                })
                .then((res) => {
                    this.questionsList = res.data.content;
                    this.pageCount = res.data.totalPages;
                    this.dataLoading = false;
                })
                .catch(() => {
                    this.dataLoading = false;
                    this.snackBar.show = true;
                    this.snackBar.infoText = "Error server";
                    this.snackBar.color = "error";
                    this.$store.dispatch("showSnackBar", this.snackBar);
                });
        },
        addQuestion(item) {
            const newItem = JSON.parse(JSON.stringify(item));

            if (newItem.id == null) {
                newItem.id = this.newQuestionKey + 1;
                this.newQuestionKey++;
            }
            this.$emit('addQuestion', newItem);
        },
        addNewQuestion(item) {
            const newItem = {
                questionId: (this.newQuestionKey++) + 1,
                questionName: null,
                questionType: item.type,
                questionPosition: this.newQuestionKey,
                questionAnswers: [],
                chartType: null,
            }
            this.$emit('addQuestion', newItem);
        },
    }
}
</script>

<style>
.margin {
    margin-top: 20px;
}

.fixed {
    position: absolute;
    top: 80px;
}
</style>
