<template>
  <v-card
    height="100%"
    flat
  >
    <v-container
      id="body"
      class="pa-1"
      fluid
    >
      <br>
      <v-img
        src="https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png"
        height="350"
        contain
        v-if="images.length == 0"
      ></v-img>
      <br />
      <div
        v-for="(details , i) in images"
        :key="i"
      >
        <Feed
          :details="details"
          :user="account"
          @reload="getImages"
        />
        <br />
      </div>

    </v-container>
    <Snackbar ref="notif" />
  </v-card>
</template>
<script>
/* eslint-disable */
import Snackbar from "@/components/Snackbar.vue";
import DeletePrompt from "@/components/DeletePrompt.vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Feed from "@/components/Feed.vue";
import { isNullOrUndefined } from "util";
export default {
  data() {
    return {
      isUpdate: false,
      description: "",
      search: "",
      cardTitle: "Add new Image",
      buttonTitle: "Upload",
      id: "",
      query: {},
      loading: false,
      uploading: false,
      images: [],
      color: "red",
      menu: false,
      account: {}
    };
  },
  components: {
    Snackbar,
    Feed,
  },

  methods: {

    prompt(id) {
      this.$refs.prompt.dialog = true;
    },
    remove(id) {
      this.$axios
        .post(this.$_CONFIG.userRequestURL + "/delete", { id: id })
        .then(res => {
          if (res.data.success) {
            if (this.images.length == 0) {
              this.notify("No images Available!");
            }
            this.notify("Deleted successfully!");
          } else {
            this.notify("Delete Failed!");
          }
        })
        .catch(() => {
          this.notify("Something went wrong!");
        });
    },
    getImages() {
      this.images = [];
      var url = this.$_CONFIG.userRequestURL + "retrieveAll";
      this.sendImageRequest(url);
    },
    sendImageRequest(url) {
      this.images = [];
      this.notify("Please wait while we are retrieving your data...");
      this.loading = true;
      this.$axios
        .post(url, { query: this.query })
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
          this.$refs.notif.snackbar = false;
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
          }
        });
    },
    searchUser() {
      this.$axios
        .get(this.$_CONFIG.userRequestURL + "search/" + this.search)
        .then(res => {
          query
        })
        .catch(err => { });
    },
    notify(msg) {
      this.$refs.notif.message(msg);
    }
  },
  mounted() {
    if (isNullOrUndefined(localStorage.getItem("token"))) {
      this.$router.replace("/user/account/login");
    } else {
      this.account = JSON.parse(localStorage.getItem("token"));
      this.getImages();
    }
  }
};
</script>
