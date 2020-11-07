<template>
<v-container fluid>
    <v-row>
        <v-col>
            <v-text-field label="Question name" hide-details="auto" v-model="item.name"></v-text-field>
        </v-col>

    </v-row>
    <v-row>
        <v-col v-if="item.questionType.type != 'input' && item.questionType.type != 'textarea'">
            <v-text-field label="Add answer (Click enter to add)" @keyup.enter="addAnswer(item)" v-model="newAnswer" hide-details="auto"></v-text-field>
        </v-col>
        <v-col>
            Type: <v-icon>{{item.questionType.icon}}</v-icon> {{item.questionType.typeName}}

        </v-col>
    </v-row>
    <v-row v-if="item.questionType.type == 'input'">
        <v-text-field disabled label="Answer" v-model="newAnswer" hide-details="auto"></v-text-field>
    </v-row>
    <v-row v-else-if="item.questionType.type == 'textarea'">
        <v-textarea solo disabled label="Answer"></v-textarea>
    </v-row>
    <v-row v-else>
        Answers:
        <v-list>
            <v-col>
                <v-list>
                    <template v-for="(answer) in item.answers">
                        <v-list-item :key="answer.id">
                            <v-text-field v-model="answer.name" hide-details="auto"></v-text-field>
                            <v-btn icon small @click="deleteAnswer(answer)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item>

                    </template>
                </v-list>
            </v-col>
            <v-col>

            </v-col>

        </v-list>
    </v-row>
    <v-row>
        <v-btn icon small @click="deleteQuestion(item)">
            <v-icon>mdi-trash-can</v-icon>
        </v-btn>

    </v-row>
</v-container>
</template>

<script>
export default {
    props: ["item"],
    data() {
        return {
            newAnswer: "",
        }
    },
    methods: {
        deleteQuestion(item) {
            this.$emit('deleteQuestion', item);
        },
        addAnswer() {
            var newAnsweradd = {
                name: this.newAnswer,
                id: null
            }
            this.item.answers.push(newAnsweradd)
            this.newAnswer = "";
        },
        deleteAnswer(answer) {
            var index = this.item.answers.findIndex(element => element == answer)
            this.item.answers.splice(index, index + 1);
            console.log(this.item.answers);
        }
    }
}
</script>

<style>

</style>
