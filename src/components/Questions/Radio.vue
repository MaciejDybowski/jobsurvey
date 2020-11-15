<template>
  <div class="question">
    <div class="text">{{ questionText }}</div>
    <div class="answer">
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="(n, i) in items"
          :key="i"
          :label="n"
          :value="n"
        ></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    questionId: Number,
    questionName: String,
    questionAnswers: Array,
  },
  data() {
    let answers = [];
    this.questionAnswers.forEach((e) => {
      console.log(e);
      answers.push(e.answerName);
    });

    return {
      questionText: this.questionName,
      items: answers,
      radioGroup: 1,
    };
  },
  watch: {
    radioGroup(newValue, oldValue) {
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

<style>
.question {
  width: 90%;
  margin: 20px 20px;
  padding: 10px 10px;
  background-color: #f0f7f4;
  border-radius: 10px;
  .text {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>