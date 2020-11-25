<template>
<v-app id="inspire">
    <top-nav :title="topBarTitle" :survey="false"></top-nav>
    <v-main>
        <div class="d-flex justify-center mb-6 padding">
            <SurveyList />
        </div>
    </v-main>
    <SnackBar :snackBar="this.$store.getters.snackBar" />
</v-app>
</template>

<script>
import TopNav from '../../components/Dashboard/TopNav.vue'
import SurveyList from '../../components/Dashboard/SurveyList.vue'
import SnackBar from '../../components/Dashboard/Dialogs/SnackBarInfo.vue';
export default {
    name: "Dashboard",
    components: {
        TopNav,
        SurveyList,
        SnackBar,
    },
    data: () => ({
        topBarTitle: "Dashboard",
        survey: false
    }),
    beforeCreate: function () {
        if (this.$cookie.get("token") === null) {
            this.$session.destroy();
            this.$router.push("/");
        }
    },
   
}
</script>

<style scoped>
.padding {
    padding-top: 100px;
}
</style>
