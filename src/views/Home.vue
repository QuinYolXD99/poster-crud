<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>PicTalk | Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <Modal
            ref="modal"
            v-if="!loading"
            :cardTitle="cardTitle"
            :buttonTitle="buttonTitle"
            :isUpdate="isUpdate"
            labelx="Post"
            colorx="black"
            :uploading="uploading"
            @click="reset"
            @message="notify"
            @reset="reset"
          />
        </v-btn>
        <v-btn text @click="$router.push('/analytics/')" v-if="account.account.role== 'admin'">Analytics</v-btn>
        <v-btn text @click="$router.push('/profile')">Profile</v-btn>
        <v-btn text @click="logout">
          <v-icon>mdi-logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container id="body" fluid>
      <v-container class="pa-1">
        <br />
        <div v-for="(details , i) in images" :key="i">
          <Feed :details="details" @reload="getImages"/>
          <br />
        </div>
      </v-container>
    </v-container>
    <DeletePrompt ref="prompt" />
    <Snackbar ref="notif" />
  </div>
</template>
<script>
/* eslint-disable */
import Modal from "@/components/Modal.vue";
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
      account: JSON.parse(localStorage.getItem("token"))
    };
  },
  components: {
    Modal,
    Snackbar,
    Feed,
    DeletePrompt
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/user/account/login");
    },
    reset() {
      this.cardTitle = "Add new Image";
      this.buttonTitle = "Upload";
      this.isUpdate = false;
      this.uploading = false;
      var modal = this.$refs.modal;
      modal.filename = "No file selected!";
      modal.file = { empty: true };
      modal.tag = "";
      modal.description = "";
      modal.color = "red";
    },
    prompt(id) {
      this.$refs.prompt.dialog = true;
      this.$refs.prompt.id = id;
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
        .catch(err => {});
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
      console.log(this.account);
      this.getImages();
    }
  }
};
</script>
