<template>
  <v-card
    id="body"
    height="100%"
    elevation="1"
  >
    <v-card-text>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          :md="admin.account.role=='user'?5:12"
          :sm="admin.account.role=='user'?5:12"
          :lg="admin.account.role=='user'?5:12"
          justify-self="center"
          align-self="center"
        >
          <ProfileCard
            :admin="admin"
            @notify="addNotif"
          />
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
              <v-container style="height: 1000px;">
                <ListView
                  v-if="logs.length"
                  :logs="logs"
                  @removed="removeHandler"
                />
              </v-container>
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
  background: linear-gradient( rgba(255,255,255, 0.2), rgba(255,255,255, 0.2)),
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
    ListView: () => import("../components/ListView"),
    Modal: () => import("../components/Modal"),
  },
  methods: {
    updateLogs(log) {
      this.logs.push(log);
    },
    addNotif(message) {
      this.text = message;
      this.notif = true;
    },
    getImages() {
      this.logs = [];
      var url = this.$_CONFIG.userRequestURL + "retrieve";
      this.sendImageRequest(url);
    },
    sendImageRequest(url) {
      this.logs = [];
      this.addNotif("Please wait while we are retrieving your data...");
      this.loading = true;
      this.$axios
        .post(url, { id: this.admin._id })
        .then(res => {
          this.logs = res.data.data;
          if (this.logs.length == 0) {
            this.addNotif("No activities Available!");
          }
        })
        .catch(err => {
          if (err) {
            this.addNotif("Failed to load activities!");
          }
        });
    },
    removeHandler(val,id) {
      if (val) {
        this.addNotif("Delted!");
        this.getImages();
      } else {
        this.addNotif("Delete Failed!");

      }
    }
  },
  mounted() {
    this.admin = JSON.parse(localStorage.getItem("token"));
    this.avatar = this.admin.account.avatar;
    this.getImages()
  }
};
</script>
