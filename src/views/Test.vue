<template>
<div>
    <p>test</p>
    <button @click.prevent="logout">Logout</button>
</div>
</template>

<script>
export default {
    name: "Test",
    beforeCreate: function () {
        if (this.$cookie.get("token") === null) {
            this.$session.destroy();
            this.$router.push("/");
        }
    },
    methods: {
        logout: function () {
            this.$cookie.delete("token");
            this.$session.destroy();
            this.$router.push("/");
        },
    },
    mounted() {
        console.log(this.$session.get("user"));
        console.log(this.$cookie.get("token"));
    },
};
</script>
