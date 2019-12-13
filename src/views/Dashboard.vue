<template>
  <v-card height="100%">
    <br />
    <br />
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab @click.stop="getByLocation()">Location</v-tab>
      <v-tab @click.stop="getByCategory()">Category</v-tab>
      <v-tab @click.stop="getByMonth()">Month</v-tab>
    </v-tabs>
    <v-card outlined flat class="px-10 ma-2">
      <v-card-title>
        Results | 2019
        <Graph
          v-if="!isEmpty"
          :key="index"
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
      <DataTable :headers="headers" :mode="filter" :data="records" :page="page" :search="search" />
      <br />
    </v-card>
  </v-card>
</template>
<script>
import DataTable from "../components/DataTable";
import { isNullOrUndefined } from "util";
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
      page: 0,
      labels: [],
      datasets: [],
      index:0,
      filter: "",
      headers: [],
      records: [],
      isEmpty: true
    };
  },
  methods: {
    getByLocation() {
      ++this.index;
      this.labels = [];
      this.datasets = [];
      this.filter = "Location";
      this.headers = [
        { text: "", value: "action", align: "left", sortable: false },
        { text: "Location", value: "location", align: "left" },
        { text: "Waste", value: "Waste", align: "left" },
        { text: "Crime", value: "Crime", align: "left" },
        { text: "Accidents", value: "Accidents", align: "left" },
        { text: "Case", value: "case", align: " d-none" },
        { text: "Total", value: "total", align: "left" }
      ];
      this.$axios
        .get(this.$_CONFIG.adminRequestURL + "analyzeByLocation")
        .then(res => {
            if (res.data.length) {
            this.isEmpty = false;
          }
          var keep = [];
          res.data.map(item => {
            var record = {};
            record.location = item.location;
            record.total = item.total;
            record.case = [];

            var category = item.reports.reduce((result, item) => {
              result[item.category] = item.count;
              return result;
            }, {});
            record.Crime = category.Crime ? category.Crime : 0;
            record.Accidents = category.Accidents ? category.Accidents : 0;
            record.Waste = category.Waste ? category.Waste : 0;
            record.case = JSON.stringify(category);
            keep.push(record);
          });

          this.records = keep;
          var crime = {
            label: "Crime",
            backgroundColor: "#E46651",
            data: []
          };

          var accidents = {
            label: "Accidents",
            backgroundColor: "orange",
            data: []
          };
          var waste = {
            label: "Waste",
            backgroundColor: "#57AD48",
            data: []
          };

          this.labels = this.records.map(record => {
            !isNullOrUndefined(record.Crime)
              ? crime.data.push(record.Crime)
              : 0;
            !isNullOrUndefined(record.Waste)
              ? waste.data.push(record.Waste)
              : 0;
            !isNullOrUndefined(record.Accidents)
              ? accidents.data.push(record.Accidents)
              : 0;
            return record.location;
          });
          this.datasets.push(crime);
          this.datasets.push(waste);
          this.datasets.push(accidents);
          console.log(JSON.stringify(this.datasets));
        })
        .catch(err => {
          alert(err);
        });
    },
    getByCategory() {
      ++this.index;
      this.filter = "Category";
      this.records = [];
      this.headers = [
        { text: "Category", value: "category", align: "center" },
        { text: "Total", value: "total", align: "center" }
      ];
      this.datasets = [];
      this.labels = ["Waste", "Accidents", "Crime"];
      this.$axios
        .get(this.$_CONFIG.adminRequestURL + "analyzeByCategory")
        .then(res => {
          this.records = res.data;
          if (this.records.length) {
            this.isEmpty = false;
          }
          var data = [];
          this.records.map(record => {
            this.labels.includes(record.category)
              ? ""
              : this.labels.push(record.category);
            data.push(record.total);
          });
          this.datasets = [
            {
              label: "Reported Case",
              backgroundColor: "#00D8FF",
              data: data
            }
          ];
        })
        .catch(err => {
          alert(err);
        });
    },
    getByMonth() {
      ++this.index;
      this.labels = [];
      this.datasets = [];
      this.page = 12;
      this.filter = "Month";
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      this.records = [];
      this.datasets = [];
      this.labels = ["Waste", "Crime", "Accidents"];
      this.headers = [
        { text: "", value: "action", align: "left", sortable: false },
        { text: "Month", value: "month", align: "left" },
        { text: "Waste", value: "reports.Waste", align: "left" },
        { text: "Crime", value: "reports.Crime", align: "left" },
        { text: "Accidents", value: "reports.Accidents", align: "left" },
        { text: "Total", value: "total", align: "left" },
        { text: "Case", value: "case", align: " d-none" }
      ];
      this.$axios
        .get(this.$_CONFIG.adminRequestURL + "analyzeByMonth")
        .then(res => {
          var keep = [];
          if (res.data.length) {
            this.isEmpty = false;
          }
          months.map(month => {
            var record = {};
            record.month = month;
            record.reports = {
              Crime: 0,
              Accidents: 0,
              Waste: 0
            };
            record.total = 0;
            keep.push(record);
          });

          keep.forEach(rec => {
            res.data.map(record => {
              var table = record.reports.reduce((result, item) => {
                result[item.category] = item.count;
                return result;
              }, {});
              if (months[record.month - 1] == rec.month) {
                rec.reports.Crime = table.Crime ? table.Crime : 0;
                rec.reports.Accidents = table.Accidents ? table.Accidents : 0;
                rec.reports.Waste = table.Waste ? table.Waste : 0;
                rec.total = record.total ? record.total : 0;
                rec.case = JSON.stringify(table);
              } else {
                rec.reports.Crime = 0;
                rec.reports.Accidents = 0;
                rec.reports.Waste = 0;
                rec.total = 0;
              }
            });
          });
          this.records = keep;
          var crime = {
              label: "Crime",
              backgroundColor: "#E46651",
              data: []
            },
            accidents = {
              label: "Accidents",
              backgroundColor: "orange",
              data: []
            },
            waste = {
              label: "Waste",
              backgroundColor: "#57AD48",
              data: []
            };
          this.records.forEach(record => {
            if (record.total > 0) {
              crime.data.push(record.reports.Crime);
              waste.data.push(record.reports.Waste);
              accidents.data.push(record.reports.Accidents);
            } else {
              crime.data.push(0);
              waste.data.push(0);
              accidents.data.push(0);
            }
          });
          this.labels = months;
          this.datasets.push(crime);
          this.datasets.push(waste);
          this.datasets.push(accidents);
          this.records.sort((a, b) => (a["total"] > b["total"] ? -1 : 1));
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  mounted() {
    this.getByLocation();
  }
};
</script>