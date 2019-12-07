<template>
  <v-card height="100%">

    <v-container fluid>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          justify="center"
          align="center"
        >
          <v-expand-transition>
            <div v-show="filter">
              <v-card
                class="mx-auto"
                color="#FFF3E0"
                max-width="750"
              >
                <v-card-text>
                  <p class="display-1 text--primary">•Filter Options•</p>
                  <v-row
                    align="center"
                    class="px-10"
                  >
                    <!-- filters -->
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="months"
                        v-model="month"
                        label="Month"
                        dense
                      ></v-select>
                    </v-col>

                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="['All','Crime','Waste' ,'Accidents']"
                        v-model="category"
                        label="category"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col
                      class="d-flex"
                      cols="12"
                    >
                      <v-select
                        :items="locations"
                        v-model="location"
                        label="location"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <center>
                  <v-btn
                    outlined
                    @click="addFilter"
                  >Filter Results</v-btn>
                </center>
                <br />
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
        ></v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-expand-transition>
        <v-item-group
          multiple
          v-show="!filter"
        >
          <v-row justify="center">
            <p
              v-if="!data.length"
              class="title text-center"
            >No Data Available</p>
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
                <div class="px-2 caption font-weight-black">
                  <p v-if="month=='All'">Records are recorded all over the year</p>
                  <p v-else>records are within the month of {{month}} 2019</p>
                </div>
              </v-card>
              <!-- /card -->
            </v-col>
          </v-row>
        </v-item-group>
      </v-expand-transition>
      <br><br><br>
      <v-row
        justify="end"
        align="center"
      >
        <v-col justify="center"
        align="center">
          <v-btn
            
            width="200"
            large
            color="black"
            outlined
            @click="filter = !filter"
          >{{filter?'Close':'Add Filter'}}</v-btn>
        </v-col>
      </v-row>
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
      month: "All",
      month_number: 0,
      location: "All",
      category: "All",
      months: [
        "All",
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
      ],
      locations: [
        "All",
        "Adlaon",
        "Agsungot",
        "Apas",
        "Bacayan",
        "Banilad",
        "Binaliw",
        "Budla-an",
        "Busay",
        "Zapatera",
        "Day-as",
        "Ermita",
        "Santa Cruz",
        "Santo Niño",
        "Sirao",
        "T Padilla",
        "Talamban",
        "Taptap",
        "Tejero",
        "Tinago",
        "Carreta",
        "Cogon Ramos",
        "Day-as",
        "Ermita",
        "Guba",
        "Hipodromo",
        "Kalubihan",
        "Kamagayan",
        "Kamputhaw (Camputhaw)",
        "Kasambagan",
        "Lahug",
        "Lorega San Miguel",
        "Lusaran",
        "Luz",
        "Mabini",
        "Mabolo Proper",
        "Malubog",
        "Pahina Central",
        "Parian",
        "Paril",
        "Pit-os",
        "Pulangbato",
        "Sambag I",
        "Sambag II",
        "San Antonio",
        "San Jose",
        "San Roque"
      ]
    };
  },
  methods: {
    addFilter() {
      this.query = {}
      this.filter = false;
      this.month_number = this.months.indexOf(this.month);
      if (this.month !== 'All') {
        this.query = { "createdAt.month": this.month_number };
      }
      if (this.location !== "All") {
        this.query.location = this.location;
      } if (this.category !== "All") {
        this.query.category = this.category;
      }
      console.log(this.query);

      this.sendQuery(this.query);
    },
    logout() {
      localStorage.removeItem("token")
      this.$router.push("/admin/account/login")
    },

    sendQuery(query) {
      this.$axios
        .post(this.$_CONFIG.adminRequestURL + "analyze", query)
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          alert(err)
          console.log(err);
        });
    }
  },
  mounted() {
    this.sendQuery(this.query);
  }
};
</script>