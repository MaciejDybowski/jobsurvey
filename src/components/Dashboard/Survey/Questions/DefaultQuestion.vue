<template>
<v-card class="question">
    <v-row>
        <v-col>
            <v-text-field readonly label="Question name" hide-details="auto" v-model="item.questionName"></v-text-field>
        </v-col>

    </v-row>

</v-card>
</template>

<script>
import questionsType from '../../../../assets/questionsType.js';
import chartTypeList from '../../../../assets/chartTypes.js';
export default {
    props: ["item"],
    data() {
        return {
            questionType: null,
            chartTypes: chartTypeList,
        }
    },
    created() {
        this.getQuestionType();
    },
    methods: {
        getQuestionType() {
            this.questionType = questionsType.find(x => x.type === this.item.questionType)
        },
    }
}
</script>

<style>

</style>
