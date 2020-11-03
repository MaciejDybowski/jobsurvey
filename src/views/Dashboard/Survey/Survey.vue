<template>
<v-app id="inspire">
    <TopBar :title="topBarTitle"></TopBar>
    <v-main>
        <div class="d-flex flex-row mb-6 test">
            <v-col cols="3" align="center">
                <LeftPanel />
            </v-col>
            <v-col cols="9">
                <router-view></router-view>
            </v-col>
        </div>
    </v-main>
</v-app>
</template>

<script>
import TopBar from '../../../components/Dashboard/Survey/TopBar.vue'
import LeftPanel from '../../../components/Dashboard/Survey/LeftPanel.vue'
export default {
    name: "AddSurvey",
    components: {
        TopBar,
        LeftPanel
    },
    data: () => ({
        drawer: null,
        topBarTitle: "New Survey"
    }),
}
</script>

<style>
.test {
    height: 100%;
}
</style>
