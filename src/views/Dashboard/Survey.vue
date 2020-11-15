<template>
<v-app>
    <TopNav :survey="true" />
    <v-main>
        <div class="d-flex flex-row mb-12">

            <v-col>
                <router-view></router-view>
            </v-col>
        </div>
        <SnackBar :snackBar="this.$store.getters.snackBar" />
    </v-main>
</v-app>
</template>

<script>
import TopNav from '../../components/Dashboard/TopNav.vue'
import SnackBar from '../../components/Dashboard/Dialogs/SnackBarInfo.vue';
export default {
    name: "AddSurvey",
    components: {
        TopNav,
        SnackBar,
    },
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
