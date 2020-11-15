<template>
<div class="questionbox">
    <div class="text">{{ questionNumber + 1 }}. {{ questionText }}</div>
    <div class="answer">
        <input v-model="text" type="number" placeholder="Wpisz swoją odpowiedź..." />
    </div>
</div>
</template>

<script>
export default {
    // nazwa komponentu
    name: "Input",
    props: {
        questionNumber: Number, // Numer pytania -> otrzymuje z pętli pytan z rodzica
        questionId: Number, // Id pytania z bazy danych
        questionName: String, // Nazwa pytania z bazy danych
    },
    data() {
        return {
            questionText: this.questionName, // przypisanie z propsow na date
            text: "", // model dla inputa (stan wew. komponentu)
        };
    },
    watch: {
        // ustawienie watchera na model inputa o nazwie text, przyjmuje dwie wartosci stara i nowa
        text(newValue, oldValue) {
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
            this.$emit("save", this.questionId, this.text);
        },
    },
};
</script>

<style lang="scss">
// style globalne dla 3 komponeotw formularzowych są w komponencie Select
</style>
