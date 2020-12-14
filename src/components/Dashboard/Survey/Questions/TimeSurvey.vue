<template>
    <v-card class="question">
    <v-row>
        <v-col>
           <v-checkbox
      v-model="timeSurvey"
      label="Time Survey"
    ></v-checkbox>
        </v-col>
    </v-row>
    <v-row v-if="timeSurvey">
        <v-menu
        v-model="dateMenuStart"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateStart"
            label="Date start"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateStart"
          @input="dateMenuStart = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        ref="menu"
        v-model="timeMenuStart"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeStart"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="timeStart"
            label="Time start"
            prepend-icon="mdi-clock-time-four-outline"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timeMenuStart"
          v-model="timeStart"
          format="24hr"
          @click:minute="$refs.menu.save(timeStart)"
        ></v-time-picker>
      </v-menu>
    </v-row>
    <v-row v-if="timeSurvey">
        <v-menu
        v-model="dateMenuEnd"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateEnd"
            label="Date end"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateEnd"
          @input="dateMenuEnd = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        ref="menu2"
        v-model="timeMenuEnd"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeEnd"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="timeEnd"
            label="Time end"
            prepend-icon="mdi-clock-time-four-outline"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timeMenuEnd"
          v-model="timeEnd"
          format="24hr"
          @click:minute="$refs.menu2.save(timeEnd)"
        ></v-time-picker>
      </v-menu>
    </v-row>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            timeSurvey: false,
            dateStart: new Date().toISOString().substr(0, 10),
            dateMenuStart: false,
            dateEnd: new Date().toISOString().substr(0, 10),
            dateMenuEnd: false,
            timeMenuStart: false,
            timeMenuEnd: false,
            timeStart: null,
            timeEnd: null,
        }
    },

    watch: {
        timeSurvey: function(){
            this.$emit('updateDateStart', null);
            this.$emit('updateDateEnd', null);
            this.timeStart = new Date().toISOString().substr(11,5);
            this.timeEnd = new Date().toISOString().substr(11,5);
            this.dateStart = new Date().toISOString().substr(0, 10)
            this.dateEnd = new Date().toISOString().substr(0, 10)
        },
        dateStart: function(val){
            if(val < new Date().toISOString().substr(0,10)){
                val = new Date().toISOString().substr(0,10);
                this.dateStart = val;
            }
           this.$emit('updateDateStart', new Date(val + " " + this.timeStart));
        },
        timeStart: function(val){
            if(this.dateStart == new Date().toISOString().substr(0,10) && val < new Date().toISOString().substr(11,5)){
                val = new Date().toISOString().substr(11,5);
                this.timeStart = val;
            }
            this.$emit('updateDateStart', new Date(this.dateStart + " " + val));
        },
        dateEnd: function(val){
            if(val < this.dateStart){
                this.dateEnd = this.dateStart;
                val = this.dateStart;
            }
            this.$emit('updateDateEnd', new Date(val + " " + this.timeEnd));
        },
        timeEnd: function(val){
            if(this.dateEnd == this.dateStart && val < this.dateStart){
                this.timeEnd = this.timeStart;
                val = this.timeStart;
            }
            this.$emit('updateDateEnd', new Date(this.dateEnd + " " + val));
        }
    },
}
</script>