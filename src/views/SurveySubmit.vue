<template>
<div>
    <p>Dziękujemy za wysłanie ankiety</p>
    <button>Powrót do strony głownej</button>
    <p>{{ test }}</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            test: this.$cookie.get("isAnswerSend"),
        };
    },
    mounted() {
        this.$cookie.set("isAnswerSend", true);
    },
};
</script>

<style>
</style>
