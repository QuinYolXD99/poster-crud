<template>
  <v-card
    height="100%"
    color=""
  >
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab @click="getByLocation()">
        Location
      </v-tab>
      <v-tab @click="getByCategory()">
        Category
      </v-tab>
      <v-tab @click="getByMonth()">
        Month
      </v-tab>
    </v-tabs>
    <v-card
      outlined
      flat
      class="px-10 ma-2"
    >
      <v-card-title>
        Results | 2019
        <Graph
          :dataTitle="filter"
          :labels="labels"
          :datasets="datasets"
        />
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
    <!--      <v-icon
        small
        class="mr-2"
      >
        mdi-chart-bar
      </v-icon> -->
  </v-card>
</template>
<script>
import DataTable from "../components/DataTable";
import { isNullOrUndefined } from 'util';
import Graph from "./Graph";
export default {
  components: {
    DataTable,
    Graph
  },
  data() {
    return {
      tab: null,
      search: "",
      labels: [],
      datasets: [],
      filter: '',
      headers: [],
      records: [],
    }
  },
  methods: {
    getByLocation() {

      this.filter = "Location";
      this.headers = [
        { text: '', value: 'action', align: 'left', sortable: false },
        { text: 'Location', value: 'location', align: 'left' },
        { text: 'Waste', value: "Waste", align: 'left' },
        { text: 'Crime', value: "Crime", align: 'left' },
        { text: 'Accidents', value: "Accidents", align: 'left' },
        { text: 'Case', value: 'case', align: ' d-none' },
        { text: 'Total', value: 'total', align: 'left' },

      ]
      this.$axios
        .post(this.$_CONFIG.adminRequestURL + "analyze", {})
        .then(res => {
          var keep = [];
          res.data.map(item => {
            var record = {};
            record.location = item.location
            record.total = item.total
            record.case = []

            var category = item.reports.reduce((result, item) => {
              result[item.category] = item.count;
              return result;
            }, {})
            record.Crime = category.Crime ? category.Crime : 0;
            record.Accidents = category.Accidents ? category.Accidents : 0;
            record.Waste = category.Waste ? category.Waste : 0;
            record.case = JSON.stringify(category)
            keep.push(record)
          })
          this.records = keep;
          this.generateGraphMaterials();
        })
        .catch(err => {
          alert(err)
          console.log(err);
        });
    },
    getByCategory() {
      this.filter = "Category";
      this.records = [];
      this.headers = [{ text: 'Category', value: 'category' },
      { text: 'Total', value: 'total' },
      { text: 'Crime', value: 'crime' },
      { text: 'Accidents', value: 'accidents' },
      { text: 'Total', value: 'total' },]
    },
    getByMonth() {
      this.filter = "Month";
      this.records = [];
      this.headers = []
    },
    generateGraphMaterials() {
      var crime = {
        label: "Crime",
        backgroundColor: '#41B883',
        data: []
      },
        accidents = {
          label: "Accidents",
          backgroundColor:  '#E46651',
          data: []
        },
        waste = {
          label: "Waste",
          backgroundColor: '#00D8FF',
          data: []
        };
      this.labels = this.records.map(record => {
        !isNullOrUndefined(record.Crime) ? crime.data.push(record.Crime) : '';
        !isNullOrUndefined(record.Waste) ? waste.data.push(record.Waste) : '';
        !isNullOrUndefined(record.Accident) ? accidents.data.push(record.Accident) : '';
        return record.location
      });
  

      this.datasets.push(crime);
      this.datasets.push(waste);
      this.datasets.push(accidents);
    }

  },
  mounted() {
    this.getByLocation();
  }
}
</script>