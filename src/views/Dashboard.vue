<template>
  <v-card
    height="100%"
    color="#FFF3E0"
  >
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="filter in filters"
        @click="query(filter)"
        :key="filter"
      >
        {{ filter }}
      </v-tab>
    </v-tabs>
    <v-card
      outlined
      class="px-10 ma-2"
    >
      <v-card-title>
        Results
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <DataTable
        :headers="headers"
        :data="records"
        :search="search"
      />
      <br>
    </v-card>
  </v-card>
</template>
<script>
import DataTable from "../components/DataTable";
export default {
  components: {
    DataTable
  },
  data() {
    return {
      tab: null,
      search: "",
      filters: [
        'Locations', 'Category',
      ],
      headers: [
        { text: 'Location', value: 'name' },
        { text: 'Waste', value: 'waste' },
        { text: 'Crime', value: 'crime' },
        { text: 'Accidents', value: 'accidents' },
        { text: 'Total', value: 'total' },
      ],
      records: [],
    }
  },
  methods: {
    query(route) {
      // var query = { filter: route };
      console.log(route);
      this.sendRequest();

    },
    sendRequest() {
      this.$axios
        .post(this.$_CONFIG.adminRequestURL + "analyze", {})
        .then(res => {
          this.records = res.data;
          var keep = [];
          var record = {};
          this.records.map(item => {
            record.location = item.location

            item.reports.map(report => {
              record.crime= report.crime?report.count:0
            })
          })
        })
        .catch(err => {
          alert(err)
          console.log(err);
        });
    }

  },
  mounted() {
    this.sendRequest()
  }
}
</script>