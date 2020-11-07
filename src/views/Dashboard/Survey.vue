<template>
<v-app>
    <TopNav :title="topBarTitle" :survey="true" />
    <v-main>
        <div class="d-flex flex-row mb-12">
            <v-col>
                <router-view></router-view>
            </v-col>
        </div>
    </v-main>
</v-app>
</template>

<script>
import TopNav from '../../components/Dashboard/TopNav.vue'
export default {
    name: "AddSurvey",
    components: {
        TopNav,
    },
    data: () => ({
        topBarTitle: "New Survey"
    }),
    beforeCreate: function () {
        if (this.$cookie.get("token") === null) {
            this.$session.destroy();
            this.$router.push("/");
        }
    },
    mounted() {
        console.log(this.$session.get("user"));
        console.log(this.$cookie.get("token"));
    },
}
</script>

<style>
</style>
