<template>
<div>
    <v-toolbar>
        <v-btn v-if="survey" icon @click="returnDashboard">
            <v-icon>mdi-keyboard-return</v-icon>
        </v-btn>
        <v-toolbar-title>{{this.$router.history.current.name}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on">
                    <v-avatar color="brown" size="36">
                        <span class="white--text">{{ user.initials }}</span>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <v-avatar color="brown">
                            <span class="white--text ">{{ user.initials }}</span>
                        </v-avatar>
                        <h3>{{ user.fullName }}</h3>
                        <p class="caption mt-1">
                            {{ user.email }}
                        </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn depressed rounded text @click="logout">
                            Log out
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>
    </v-toolbar>

</div>
</template>

<script>
export default {
    name: "DashboardNav",
    props: ['survey'],
    data: () => ({
        user: {
            initials: 'PW',
            fullName: 'Patryk Wicherek',
            email: 'patrykwich@gmail.com',
        },
    }),
    methods: {
        logout: function () {
            this.$cookie.delete("token");
            this.$session.destroy();
            this.$router.push("/");
        },
        returnDashboard() {
            this.$router.push('/dashboard')
        },
    },
}
</script>

<style>
.fluid {
    position: fixed;
    display: block;
    top: 0px;
}
</style>
