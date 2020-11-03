<template>
<div>
    <v-toolbar>
        <v-toolbar-title>{{title}}</v-toolbar-title>
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
                        <v-btn depressed rounded text>
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
    props: ['title'],
    data: () => ({
        user: {
            initials: 'PW',
            fullName: 'Patryk Wicherek',
            email: 'patrykwich@gmail.com',
        },
    }),
}
</script>

<style>

</style>
