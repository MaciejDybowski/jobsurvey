<template>
  <div>
    <v-data-table
      :headers="headers"
      :loading="dataLoading"
      loading-text="Loading... Please wait"
      :items="surveyList"
      sort-by="dataCreated"
    >
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="copyLinkToClipboard(item)">mdi-attachment</v-icon>
      </template>
      <template v-slot:no-data> No data </template>
    </v-data-table>
    <DeleteDialog
      :dialogDelete="dialogDelete"
      @deleteItemConfirm="deleteItemConfirm"
    />
    <SnackBarInfo :snackBar="snackBar" />
  </div>
</template>

<script>
import axios from "axios";
import SnackBarInfo from "./Dialogs/SnackBarInfo.vue";
import DeleteDialog from "./Dialogs/DeleteDialog.vue";
export default {
  name: "SurveyList",
  components: {
    DeleteDialog,
    SnackBarInfo,
  },
  data() {
    return {
      snackBar: this.$store.getters.snackBar,
      dataLoading: false,
      dialogDelete: {
        show: false,
        infoText: null,
        loading: false,
        item: null,
      },
      headers: [
        {
          text: "Survey name",
          align: "start",
          sortable: false,
          value: "surveyName",
        },
        {
          text: "Data Created",
          value: "dataCreated",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      surveyList: [],
    };
  },
  created() {
    this.fetchSurveyList();
  },
  methods: {
    async fetchSurveyList() {
      this.dataLoading = true;
      await axios
        .get(this.$store.state.serverUrl + "/surveys", {
          crossDomain: true,
          headers: {
            Authorization: this.$cookie.get('token')
          }
        })
        .then((res) => {
          this.dataLoading = false;
          this.surveyList = res.data;
        })
        .catch(() => {
          this.dataLoading = false;
        });
    },
    editItem(item) {
      this.$router.push("/dashboard/survey/editSurvey/" + item.surveyId);
    },
    deleteItem(item) {
      this.dialogDelete.item = item;
      this.dialogDelete.infoText = "Are you sure?";
      this.dialogDelete.show = true;
    },
    async deleteItemConfirm() {
      this.dialogDelete.loading = true;
      await axios({
        method: "delete",
        url: `${this.$store.state.serverUrl}/surveys/${this.dialogDelete.item.surveyId}`,
        data: null,
        headers: {
            Authorization: this.$cookie.get('token')
          }
      })
        .then(() => {
          this.dialogDelete.show = false;
          this.dialogDelete.loading = false;
          let index = this.surveyList.findIndex(
            (element) => element == this.dialogDelete.item
          );
          this.surveyList.splice(index, 1);
          this.snackBar.show = true;
          this.snackBar.infoText = "Survey delete";
          this.snackBar.color = "success";
          this.$store.dispatch("showSnackBar", this.snackBar);
        })
        .catch(() => {
          this.dialogDelete.show = false;
          this.dialogDelete.loading = false;
          this.snackBar.show = true;
          this.snackBar.infoText = "Error";
          this.snackBar.color = "error";
          this.$store.dispatch("showSnackBar", this.snackBar);
        });
    },
    newSurvey() {
      this.$router.push("/dashboard/survey/addSurvey");
    },
    copyLinkToClipboard(item) {
      const copyhelper = document.createElement("input");
      copyhelper.className = "copyhelper";
      document.body.appendChild(copyhelper);
      copyhelper.value = item.surveyName;
      copyhelper.select();
      document.execCommand("copy");
      document.body.removeChild(copyhelper);
      this.snackBar.infoText = "Link copied";
      this.snackBar.show = true;
    },
  },
};
</script>