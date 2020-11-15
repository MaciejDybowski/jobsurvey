<template>
<div class="question">
    <div class="text">{{ questionText }}</div>
    <div class="answer">
        <input v-model="text" type="number" placeholder="wpisz swoją odpowiedź" />
    </div>
</div>
</template>

<script>
export default {
    name: "Input",
    props: {
        questionId: Number,
        questionName: String,
    },
    data() {
        return {
            questionText: this.questionName,
            text: "",
        };
    },
    watch: {
        text(newValue, oldValue) {
            if (oldValue !== newValue) {
                console.log(`Pytanie ID ${this.questionId} odp: ${newValue}`);
                //this.sendAnswer(this.questionId, newValue);
            }
        },
    },
    methods: {
        sendAnswer(id, answer) {
            this.$emit("save", id, answer);
        },
    },
};
</script>

<style>
.question {
    width: 90%;
    margin: 20px 20px;
    padding: 10px 10px;
    background-color: #f0f7f4;
    border-radius: 10px;

}

.text {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
