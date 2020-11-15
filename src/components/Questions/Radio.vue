<template>
  <div class="questionbox">
    <div class="text">{{ questionNumber + 1 }}. {{ questionText }}</div>
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
  // nazwa komponentu
  name: "Radio",
  props: {
    questionNumber: Number, // Numer pytania -> otrzymuje z pętli pytan z rodzica
    questionId: Number, // Id pytania z bazy danych
    questionName: String, // Nazwa pytania z bazy danych
    questionAnswers: Array, // tablica dostepnych odpowiedzi z bazy danych
  },
  data() {
    // tablica potrzebna do obrobienia talibcy propsow bo tam dostaje talibce obiektow a ja potrzebuje tablice stringow
    let answers = [];
    // petla po tablicy obiektow z propsow
    this.questionAnswers.forEach((e) => {
      answers.push(e.answerName);
    });

    return {
      questionText: this.questionName, // opis pytania
      items: answers, // tablica tekstowa z dostepnymi odpowiedziami
      radioGroup: 1, // model dla radio inputa
    };
  },
  watch: {
    // ustawienie watchera na model inputa o typie radio, przyjmuje dwie wartosci stara i nowa
    radioGroup(newValue, oldValue) {
      // porowannie wartosci zmiennej ktorej dotyczy newValue i oldValue
      if (oldValue !== newValue) {
        // jezeli sie cos zmieni to wywolujemy funkcje ktora emituje nam odpowiedz do rodzica
        this.sendAnswer();
      }
    },
  },
  methods: {
    // metoda wysylajaca odpowiedz do rodzica, przyjmuje id pytania (z bazy) i odpowiedz udzieloną przez uzytkownika
    sendAnswer() {
      // emitujemy do rodzica z payloadem
      this.$emit("save", this.questionId, this.radioGroup);
    },
  },
};
</script>

<style lang="scss">
// style globalne dla 3 komponeotw formularzowych jest w Select
</style>
