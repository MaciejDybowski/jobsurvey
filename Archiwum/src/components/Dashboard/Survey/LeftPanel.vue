<template>
<div>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search question" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table hide-default-header hide-default-footer :headers="headers" :items="questions" :search="search">
            <template v-slot:item="row">
                <tr @click="addQuestion(row.item)">
                    <td>{{row.item.name}}</td>
                </tr>
            </template>
        </v-data-table>

    </v-card>

    <v-card class="margin">
        <v-card-title>
            Add New Question
        </v-card-title>
        <v-data-table hide-default-header hide-default-footer :headers="headers" :items="newQuestions">
            <template v-slot:item="row">
                <tr @click="addQuestion(row.item)">
                    <td>
                        <v-icon> {{row.item.questionType.icon}} </v-icon> {{row.item.questionType.typeName}}
                    </td>
                </tr>
            </template>
        </v-data-table>

    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            newQuestionKey: 1000,
            search: '',
            headers: [{
                text: 'Question',
                align: 'start',
                filterable: true,
                value: 'name',
            }],
            questions: [{
                id: 560,
                name: 'Twoje stanowisko to:',
                questionType: {
                    typeName: 'Jednokrotny wybór',
                    type: 'radio',
                    icon: "mdi-checkbox-marked-circle",
                },
                answers: [{
                        id: 1,
                        name: 'Junior'
                    },
                    {
                        id: 2,
                        name: 'Senior Developer'
                    }
                ]
            }],
            newQuestions: [{
                    id: null,
                    name: null,
                    questionType: {
                        typeName: "Długi opis",
                        type: 'textarea',
                        icon: "mdi-text-subject",
                    },
                    answers: []
                },
                {
                    id: null,
                    name: "",
                    questionType: {
                        typeName: "Krótka odpowiedz",
                        type: 'input',
                        icon: "mdi-text-short",
                    },
                    answers: []
                },
                {
                    id: null,
                    name: null,
                    questionType: {
                        typeName: "Jednokrotny wybór",
                        type: 'radio',
                        icon: "mdi-checkbox-marked-circle",
                    },
                    answers: []
                },
                {
                    id: null,
                    name: null,
                    questionType: {
                        typeName: "Wielokrotny wybór",
                        type: "checkbox",
                        icon: "mdi-checkbox-marked",
                    },
                    answers: []
                }
            ],
        }
    },
    methods: {
        addQuestion(item) {
            var newItem = Object.assign({}, item);

            if (newItem.id == null) {
                newItem.id = this.newQuestionKey + 1;
                this.newQuestionKey++;
            }
            this.$emit('addQuestion', newItem);
        }
    }
}
</script>

<style>
.margin {
    margin-top: 20px;
}
</style>
