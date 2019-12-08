<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-icon
          v-on="on"
          color="pink"
          small
        >
          mdi-chart-pie
        </v-icon>
      </template>
      <v-card>
        <v-card-title>{{location?location:category?category:month}}</v-card-title>
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
    month: String,
    category: String,
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