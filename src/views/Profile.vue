<template>

  <v-card
    height="100%"
    elevation="1"
    id="body"
  >
    <br><br><br>
    <v-card-text>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          :md="admin.account.role=='user'?4:12"
          :sm="admin.account.role=='user'?4:12"
          :lg="admin.account.role=='user'?4:12"
          justify-self="center"
          align-self="center"
        >
          <ProfileCard
            :admin="admin"
            @notify="addNotif"
            @isEdit="editmode"
            :raised="true"
            :elevation="11"
          />
        </v-col>
        <v-col
          v-if="admin.account.role == 'user' && !editmode"
          md="8"
          sm="8"
          lg="8"
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
              :class="logs.length?'overflow-y-auto':'overflow-y-hidden'"
              max-height="540"
            >
              <v-container style="height: 1000px;">
                <v-img
                  v-if="!logs.length"
                  src="https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png"
                  height="350"
                  contain
                ></v-img>
                <ListView
                  v-else
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
  background:linear-gradient(to bottom, rgba(35,7,77,0.7), rgba(202,80,47,0.4)),
    url("https://source.unsplash.com/user/davidkovalenkoo");
  background-size: cover !important  ;
  background-position:  center !important;
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
      editmode:false,
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
     editHandler(val){
      this.editmode = val;
    },
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
    removeHandler(val) {
      if (val) {
        this.addNotif("Delted!");
        setTimeout(() => {
          this.getImages();
        }, 500);
      } else {
        this.addNotif("Delete Failed!");

      }
    },
   
  },
  mounted() {
    this.admin = JSON.parse(localStorage.getItem("token"));
    this.avatar = this.admin.account.avatar;
    if (this.admin.account.role == 'user') {
      this.getImages()
    }
  }
};
</script>
