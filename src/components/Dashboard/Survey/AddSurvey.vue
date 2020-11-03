<template>
<v-container filed>
    <v-card class="card-test">
        <v-text-field label="Survey name" hide-details="auto"></v-text-field>
        <v-textarea name="input-7-1" shaped label="Survey description" auto-grow value=""></v-textarea>
    </v-card>

</v-container>
</template>

<script>
export default {
    name: "AddSurvey",
}
</script>

<style>
.padding {
    padding-top: 20px;
}

.card-test {
    padding: 20px;
}
</style>
