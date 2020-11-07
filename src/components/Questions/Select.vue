<template>
  <div class="question">
    <div class="text">{{ questionText }}</div>
    <div class="answer">
      <v-select
        :items="items"
        v-model="defaultSelected"
        label="Wybierz odpowiedź..."
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    questionId: Number,
    questionName: String,
    questionAnswers: Array,
  },
  data() {
    let answers = [];
    this.questionAnswers.forEach((e) => {
      answers.push(e.answerName);
    });

    return {
      questionText: this.questionName,
      items: answers,
      defaultSelected: "Wybierz odpowiedź...",
    };
  },
  watch: {
    defaultSelected(newValue, oldValue) {
      if (oldValue !== newValue) {
        console.log(`Pytanie ID ${this.questionId} odp: ${newValue}`);
        this.sendAnswer(this.questionId, newValue);
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

<style lang='scss'>
.questionc {
  width: 90%;

  padding: 10px 10px;
  background-color: #f0f7f4;
  border-radius: 10px;
  .text {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>