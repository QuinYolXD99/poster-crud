<template>
  <v-card
    color="blue lighten-5"
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
          :md="admin.account.role=='user'?5:12"
          :sm="admin.account.role=='user'?5:12"
          :lg="admin.account.role=='user'?5:12"
          justify-self="center"
          align-self="center"
        >
          <ProfileCard :admin="admin" />
        </v-col>
        <v-col
          v-if="admin.account.role == 'user'"
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
              <template v-if="$vuetify.breakpoint.smAndUp">
                <Modal
                  @notify="addNotif"
                  @addLogs="updateLogs"
                />
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

      logs: []
    };
  },
  components: {
    ProfileCard: () => import('../components/ProfileCard'),
    Modal: () => import("../components/Modal"),
  },
  methods: {
    updateLogs(log) {
      this.logs.push(log)
    },
    addNotif(message) {
      this.text = message;
      this.notif = true;
    }
  },
  mounted() {
    this.admin = JSON.parse(localStorage.getItem("token"));
    this.avatar = this.admin.account.avatar;
  }
};
</script>
