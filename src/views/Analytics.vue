<template>
  <v-container>
      <!-- <v-card>
          <v-card-text>
              <v-textarea></v-textarea>
          </v-card-text>
      </v-card> -->
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
      data: []
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
    this.$axios.get(this.$_CONFIG.adminRequestURL+"analyze").then(res=>{
      this.data = res.data;
    }).catch(err=>{
      console.log(err);
    })
  }
};
</script>