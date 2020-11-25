<template>
<v-card class="question">
    <v-row>
        <v-col>
            <v-text-field readonly label="Question name" hide-details="auto" v-model="item.questionName"></v-text-field>
        </v-col>

    </v-row>

</v-card>
</template>

<script>
export default {
    props: ["item"],
}
</script>

<style>

</style>
