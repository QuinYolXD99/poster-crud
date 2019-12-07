<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-icon
          v-on="on"
          small
        >
          mdi-information
        </v-icon>
      </template>
      <v-card>
        <v-card-title>{{location}}</v-card-title>
        <v-card-text class="px-5">
          <Doughnut :datasets="datasets" />
          <br>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Doughnut from "./Charts/Doughnut";
export default {
  props: {
    location: String,
    datasets: Array
  },
  data: () => ({
    dialog: false,
  }),
  components: {
    Doughnut
  }
}
</script>