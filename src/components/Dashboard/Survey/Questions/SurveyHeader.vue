<template>
<v-container>
    <v-row>
        <v-text-field label="Survey Name" hide-details="auto" v-model="surveyInfo.surveyName"></v-text-field>
    </v-row>
    <v-row class="margin">
        <v-textarea solo v-model="surveyInfo.surveyDescription" label="Survey Description"></v-textarea>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: ['surveyInfo']
}
</script>

<style>
.margin {
    margin-top: 50px;
}
</style>
