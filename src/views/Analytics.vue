<template>
  <v-card height="100%">
    <v-toolbar>
      <v-toolbar-title>Analytics</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          text
          @click="filter = !filter"
        >Add Filter</v-btn>
        <v-btn text>View Visuals</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col justify="center" align="center">
          <v-expand-transition>
            <div v-show="filter">
              <v-card width="500" flat  color="#CFD8DC" >
                <v-card-text>
                  tet
                </v-card-text>
              </v-card>
            </div>

          </v-expand-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >

        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-item-group multiple>
        <v-row>
          <v-col
            v-for="(reports, i) in data"
            :key="i"
            cols="12"
            md="4"
          >
            <!-- card -->
            <v-card
              class="mx-auto"
              max-width="400"
              :color="reports.total > 1?'#EF9A9A':'white'"
            >
              <v-card-text>
                <div>
                  <span
                    class="display-1 font-weight-black black--text"
                    v-text="`•${reports.location}`"
                  ></span>

                </div>
                <v-divider></v-divider>
                <v-list color="transparent">
                  <v-list-item
                    v-for="(items, j) in reports.reports"
                    :key="j"
                    inactive
                  >
                    <v-list-item-title>
                      <span
                        class="title font-weight-medium black--text"
                        v-text="`•${items.category}   :   `"
                      ></span>
                      <strong class="headline font-weight-medium black--text">{{items.count}}</strong>
                    </v-list-item-title>

                  </v-list-item>
                  <v-list-item inactive>
                    <v-list-item-title>
                      <span
                        class="title font-weight-bold black--text"
                        v-text="`•Total   :   `"
                      ></span>
                      <strong class="headline font-weight-bold black--text">{{reports.total}}</strong>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  color="black"
                >
                  Details
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- /card -->
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

  </v-card>

</template>
<script>
export default {
  data() {
    return {
      data: [],
      date: null,
      filter: false,
      query: {},
      menu: false,
      modal: false,
      month: "",
      months: [
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
      ]
    };
  },
  methods: {
    sendQuery() {
      this.$axios.post(this.$_CONFIG.adminRequestURL + "analyze").then(res => {
        this.data = res.data;
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.sendQuery();
  }
};
</script>