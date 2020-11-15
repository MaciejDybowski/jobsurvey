<template>
<v-dialog v-model="dialogDelete.show" max-width="500px">
    <v-card>
        <v-card-title class="headline">{{dialogDelete.infoText}}</v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text :disabled="dialogDelete.loading" @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text :loading="dialogDelete.loading" @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['dialogDelete'],
    methods: {
        deleteItemConfirm() {
            this.$emit('deleteItemConfirm');
        },
        closeDelete() {
            this.dialogDelete.show = false
        },
    },
}
</script>

<style>

</style>
