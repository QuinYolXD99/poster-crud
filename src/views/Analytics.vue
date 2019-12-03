<template>
  <v-container>
      <v-card>
          <v-card-text>
              <v-textarea></v-textarea>
          </v-card-text>
      </v-card>
    <v-data-table :headers="headers" :items="data" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Location",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Waste", align: "center", value: "waste" },
        { text: "Crime", align: "center", value: "crime" },
        { text: "Accidents", align: "center", value: "accidents" },
        { text: "Transportation", align: "center", value: "transportation" },
        { text: "Total Reports", align: "center", value: "total" }
      ],
      data: [
        {
          name: "Ice cream sandwich",
          total: 237
        },
        {
          name: "Eclair",
          total: 262
        },
        {
          name: "Cupcake",
          total: 305
        },
        {
          name: "Gingerbread",
          total: 356
        },
        {
          name: "Jelly bean",
          total: 375
        },
        {
          name: "Lollipop",
          total: 392
        },
        {
          name: "Honeycomb",
          total: 408
        },
        {
          name: "Donut",
          total: 452
        },
        {
          name: "KitKat",
          total: 518
        },
        {
          name: "Frozen Yogurt",
          total: 159
        }
      ]
    };
  },
  computed: {},
  methods: {
    sortedList(arr) {
      return arr.slice().sort(function(a, b) {
        return b.total - a.total;
      });
    }
  },
  mounted() {
    this.data = this.sortedList(this.data);
  }
};
</script>