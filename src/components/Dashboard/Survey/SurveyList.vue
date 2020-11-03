<template>
<v-data-table :headers="headers" :items="surveys" sort-by="dataCreated" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Surveys</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <template>
                <v-btn color="primary" dark class="mb-5" @click="newSurvey">
                    New Survey
                </v-btn>
            </template>
            <v-toolbar flat>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
            mdi-delete
        </v-icon>
        <v-icon small @click="generatePdf(item)">
            mdi-file-pdf
        </v-icon>
    </template>
    <template v-slot:no-data>
        No data
    </template>
</v-data-table>
</template>

<script>
export default {
    name: 'SurveyList',
    data: () => ({
        dialogDelete: false,
        headers: [{
                text: 'Survey name',
                align: 'start',
                sortable: false,
                value: 'surveyName',
            },
            {
                text: 'Data Created',
                value: 'dataCreated'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        surveys: [],
    }),
    watch: {
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.surveys = [{
                    surveyName: 'Survey for DevOps',
                    dataCreated: "3.11.2020",
                },
                {
                    surveyName: 'Survey for Vue Programmers',
                    dataCreated: "2.11.2020",
                },
                {
                    surveyName: 'Survey for UX Designer',
                    dataCreated: "4.11.2020",
                }
            ]
        },
        editItem(item) {
            this.$router.push("/dashboard/survey/editSurvey")
            console.log(item)
        },
        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        newSurvey() {
            this.$router.push("/dashboard/survey/addSurvey")
        },
        generatePdf(item) {
            console.log(item)
        }
    },
}
</script>
