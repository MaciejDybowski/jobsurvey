<template>
  <div class="questionbox">
    <div class="text">{{ questionNumber + 1 }}. {{ questionText }}</div>
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
  // nazwa komponentu
  name: "Select",
  props: {
    questionNumber: Number, // Numer pytania -> otrzymuje z pętli pytan z rodzica

    questionId: Number, // Id pytania z bazy danych
    questionName: String, // Nazwa pytania z bazy danych
    questionAnswers: Array, // tablica dostepnych odpowiedzi z bazy
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
      defaultSelected: "Wybierz odpowiedź...", // model dla select inputa
    };
  },
  watch: {
    // ustawienie watchera na model inputa typu select, przyjmuje dwie wartosci stara i nowa
    defaultSelected(newValue, oldValue) {
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
      this.$emit("save", this.questionId, this.defaultSelected);
    },
  },
};
</script>

<style lang="scss">
// style globalne dla 3 komponeotw formularzowych
.questionbox {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 0px;
  color: black !important;

  input[type="number"] {
    width: 50%;
    padding: 10px 0px;
    -moz-appearance: textfield;

    &:focus {
      outline: none;
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
