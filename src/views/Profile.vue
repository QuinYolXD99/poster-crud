<template>
  <v-card color="blue lighten-5"
    height="100%"
    flat
    
  >
    <v-card-text>
      <v-row
        justify="start"
        align="start"
      >
        <v-col
          cols="12"
          md="5"
          sm="5"
          lg="5"
          justify-self="center"
          align-self="center"
        >
          <ProfileCard :admin="admin" />
        </v-col>
        <v-col
          md="7"
          sm="7"
          lg="7"
        >
          <v-card>
          </v-card>

          <v-card class="overflow-hidden">
            <v-toolbar
              flat
              elevation="1"
            >
              <v-toolbar-title>Activities</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-toolbar-items v-if="!$vuetify.breakpoint.smAndUp">
                <v-btn
                  large
                  icon
                >
                  <v-icon>mdi-graph</v-icon>
                </v-btn>
                <v-btn
                  large
                  icon
                >
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-toolbar-items>

              <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn
                  large
                  icon
                  color="pink"
                >
                  <v-icon>mdi-graph</v-icon>
                </v-btn>
                <!-- <v-btn
                  large
                  icon
                  color="pink"
                >
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn> -->
                <Modal />
              </template>
            </v-toolbar>
            <v-sheet
              id="scrolling-techniques"
              class="overflow-y-auto"
              max-height="540"
            >
              <v-container style="height: 1000px;"></v-container>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-snackbar
      v-model="notif"
      :timeout="2000"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >Close</v-btn>
    </v-snackbar>
  </v-card>
</template>
<style scoped>
#body {
  position: relative;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://source.unsplash.com/user/andyjh07");
  background-size: cover !important  ;
  background-position: top center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  overflow: auto;
}
</style>

<script>
export default {
  name: "container",

  data() {
    return {
      dialog: false,
      text: "",
      notif: false,
      admin: JSON.parse(localStorage.getItem('token')),
      menu: [
        { icon: 'home', title: 'Link A' },
        { icon: 'info', title: 'Link B' },
        { icon: 'warning', title: 'Link C' }
      ]
    };
  },
  components: {
    ProfileCard: () => import('../components/ProfileCard'),
    Modal: () => import("../components/Modal"),
  },
  methods: {
    menuItems() {
      return this.menu
    }
  },
  mounted() {
    this.admin = JSON.parse(localStorage.getItem("token"));
    this.avatar = this.admin.account.avatar;
  }
};
</script>
