<template>
<v-container>
    <v-row>
        <v-col cols="4">
            <LeftPanel @addQuestion="addQuestion" />
        </v-col>
        <v-col>

            <v-btn x-large color="success" dark>
                Edit Survey
            </v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import LeftPanel from './LeftPanel.vue';
export default {
    name: "EditSurvey",
    components: {
        LeftPanel
    }
}
</script>

<style>

</style>
