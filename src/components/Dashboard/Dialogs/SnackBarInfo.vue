<template>
<v-snackbar :color="snackBar.color" v-model="snackBar.show" :timeout="snackBar.timeout">
    {{ snackBar.infoText }}
</v-snackbar>
</template>

<script>
export default {
    name: "SnackBarInfo",
    props: ['snackBar']
}
</script>

<style>

</style>
