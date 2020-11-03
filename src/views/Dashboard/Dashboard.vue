<template>
<v-app id="inspire">
    <top-nav :title="topBarTitle"></top-nav>
    <v-main>
        <div class="d-flex justify-center mb-6 padding">
            <SurveyList />
        </div>
    </v-main>
</v-app>
</template>

<script>
import TopNav from '../../components/Dashboard/TopNav.vue'
import SurveyList from '../../components/Dashboard/Survey/SurveyList.vue'
export default {
    name: "Dashboard",
    components: {
        TopNav,
        SurveyList
    },
    data: () => ({
        topBarTitle: "Dashboard",
        survey: false
    }),
}
</script>

<style scoped>
.padding {
    padding-top: 100px;
}
</style>
