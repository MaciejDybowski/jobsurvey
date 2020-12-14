<template>
<v-container>
    <v-row>
        <v-text-field label="Survey Name" hide-details="auto" v-model="surveyInfo.surveyName"></v-text-field>
    </v-row>
    <v-row class="margin">
        <v-textarea solo v-model="surveyInfo.surveyDescription" label="Survey Description"></v-textarea>
    </v-row>
    <TimeSurvey @updateDateStart="updateDateStart" @updateDateEnd="updateDateEnd" />
</v-container>
</template>

<script>
import TimeSurvey from "./TimeSurvey.vue"

export default {
    components:{
        TimeSurvey
    },
    props: ['surveyInfo'],
    methods: {
        updateDateStart(newDate){
            this.surveyInfo.surveyStart = newDate;
        },
        updateDateEnd(newDate){
            this.surveyInfo.surveyStop = newDate;
        }
    }
}
</script>

<style>
.margin {
    margin-top: 50px;
}
</style>
