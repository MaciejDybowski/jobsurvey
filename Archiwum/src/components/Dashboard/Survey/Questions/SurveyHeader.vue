<template>
<v-container>
    <v-row>
        <v-text-field label="Survey Name" hide-details="auto" v-model="surveyInfo.name"></v-text-field>
    </v-row>
    <v-row>
        <v-textarea solo v-model="surveyInfo.description" label="Survey Description"></v-textarea>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: ['surveyInfo']
}
</script>
