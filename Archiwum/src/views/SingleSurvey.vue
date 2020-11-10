<template>
<v-app id="inspire">
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col xl="6" lg="8" md="10" sm="12">
                    <v-sheet min-height="20vh" rounded="lg">
                        <div class="survey-wrapper">
                            <p class="title">Ankieta dla {{ surveyName }}</p>
                            <p class="description">{{ surveyDescription }}</p>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-col xl="6" lg="8" md="10" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <div class="survey-wrapper">
                            <form class="survey-form" @submit.prevent="sendSurvey">
                                <div class="questions" v-for="(q, i) in questions" :key="i">
                                    <div class="question" v-if="q.questionType === 'select'">
                                        <Select :questionNumber="i" :questionName="q.questionName" :questionAnswers="q.questionAnswers" :questionId="q.questionId" :questionPosition="q.questionPosition" @save="saveData" />
                                    </div>
                                    <div class="question" v-else-if="q.questionType === 'radio'">
                                        <Radio :questionNumber="i" :questionName="q.questionName" :questionAnswers="q.questionAnswers" :questionId="q.questionId" :questionPosition="q.questionPosition" @save="saveData" />
                                    </div>
                                    <div class="question" v-else-if="q.questionType === 'input'">
                                        <Input :questionNumber="i" :questionName="q.questionName" :questionPosition="q.questionPosition" :questionId="q.questionId" @save="saveData" />
                                    </div>
                                </div>

                                <v-btn class="submitbtn" type="submit" color="primary" elevation="2">Wyślij ankietę</v-btn>
                            </form>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import axios from "axios";
import Select from "../components/Questions/Select.vue";
import Radio from "../components/Questions/Radio.vue";
import Input from "../components/Questions/Input.vue";
import data from "../assets/dummyData.js";

export default {
    // nazwa ko
    name: "SingleSurvey",
    // rejestracja komponentow  uzytych w tym komponencie
    components: {
        Select,
        Radio,
        Input,
    },
    data() {
        return {
            // domyslnie tu bedzie nasz hash ktory odpowiada ankiecie, po tym hashu strzelamy do api i pobieramy liste pytan
            apiCall: this.$route.params.hash,
            surveyName: data.surveyName, // tytul ankiety z bazy
            surveyDescription: data.surveyDescription, // opis ankiety z bazy danych
            questions: data.questions, // lista pytan pobranych podczas zamontowania komponentu
            answers: [], // pusta tablica przygotowana pod emitowanie odpowiedzi z dzieci i finalnie wyslanie do API
        };
    },
    mounted() {
        async function fetchSurvey() {
            await axios
                .get(`http://192.168.4.30:8000/surveys/h2/questions`, {
                    crossDomain: true,
                })
                .then((res) => {
                    console.log(res);
                    return res;
                })
                .catch((err) => console.log(err));
        }
        fetchSurvey();
    },
    methods: {
        // metoda przypisana do kazdego dziecka, wiemy ze dziecko wyemituje nam id i odpowiedz
        saveData(id, answer, position) {
            console.log(`Rodzic : ${id} - ${answer} - ${position}`);
            // laczenie w obiekt
            const obj = {
                id,
                answer,
                position,
            };
            // walidacja zmiany odpowiedzi przez uzytkownika
            // sprawdzamy index - jezlie istnieje juz w tablicy odpowiedzi obiekt z id wyemitowanym z dziecka to oznacza ze
            // uzytkownik zmienil odpowiedz i sprawdzany na jakim indeksie tablicy odpowiedzi jest nasza odpowiedz
            let index = this.answers.findIndex((e) => e.id === obj.id);
            // jesli index zwroci -1 to oznacza ze nie ma takiego id w tablicy odp -> czyli nie udzialal nikt odpowiedzi na to pytania
            if (index === -1) {
                // wiec jak nie ma jeszcze odp na to pytanie to dodajemy obiekt wczesniej przygotowany do tablicy odpowiedzi
                this.answers.push(obj);
            } else {
                // jesli mamy juz obiekt w odpowiedziach o danym id to podmieniamy starą odp na nową
                let currentAnswer = {
                    id,
                    answer,
                };
                this.answers[index] = currentAnswer;
            }
        },
        // metoda do wyslania ankiety do bazy
        sendSurvey() {
            // mala walidacja odpowiedzi na wszystkie pytania
            // mianowicie sprawdzamy czy dlugosc tablicy pytan = dlugosci tablicy odp jeśli tak to mamy pewnosc ze wszedzie
            // uzytopwnik udzielil odpowiedzi
            if (this.questions.length !== this.answers.length) {
                alert("Nie podałeś odpowiedzi na wszystkie pytania");
            } else {
                // tworzenie obiektu pod wysłanie do bazy danych
                const survey = {
                    surveyId: this.apiCall,
                    answers: this.answers,
                };

                alert(`To twoja ankieta ${JSON.stringify(survey)}`);
                // wysłanie requesta do bazy danych
                axios({
                        method: "post",
                        url: "inTheInternet",
                        data: survey,
                    })
                    .then((res) => {
                        console.log(res);
                        return res;
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>

<style lang="scss">
.row {
    align-items: center;
    justify-content: center;
}

.survey-wrapper {
    width: 100%;

    .title {
        text-align: center;
        padding: 10px 10px;
    }

    .description {
        padding: 10px 30px;
        text-align: justify;
    }

    .survey-form {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px 0px;

        .questions {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px 10px;

            .question {
                width: 90%;
                background-color: #e5e5e5;
                border-radius: 10px;
            }
        }

        .submitbtn {
            margin: 10px 10px;
        }
    }
}
</style>
