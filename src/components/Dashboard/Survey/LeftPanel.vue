<template>
<v-card>
    <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search question" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table hide-default-header hide-default-footer :headers="headers" :items="questions" :search="search">
        <template v-slot:item="row">
            <tr>
                <td>{{row.item.name}}</td>

            </tr>
        </template>

    </v-data-table>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            headers: [{
                text: 'Question',
                align: 'start',
                filterable: true,
                value: 'name',
            }],
            questions: [{
                    name: 'Question 1',
                },
                {
                    name: 'Question 2',
                }
            ],
        }
    },
}
</script>
