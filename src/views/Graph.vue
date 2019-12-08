<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <template v-slot:activator="{ on }">
        <v-icon
          small
          color="pink"
          v-on="on"
        >
          mdi-chart-bar
        </v-icon>
      </template>
      <v-card>
        <v-card-title primary-title>
          By {{dataTitle}}
        </v-card-title>

        <v-card-text>
          <BarGraph
            :labels="labels"
            :datasets="datasets"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BarGraph from "../components/Charts/BarGraph";
export default {
  name: "Graph",
  props: {
    dataTitle: String,
    datasets: Array,
    labels: Array
  },
  data() {
    return {
      dialog: false,
    }
  },
  components: {
    BarGraph,
  }
}
</script>