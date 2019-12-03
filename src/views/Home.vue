<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar
      light
      app
    >
      <v-btn text>
        <v-toolbar-title>PicTalk</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="pink"
      ></v-progress-linear>

      <div @click="reset()">
        <Modal
          ref="modal"
          v-if="!loading && isLoggedin"
          :cardTitle="cardTitle"
          :buttonTitle="buttonTitle"
          :isUpdate="isUpdate"
          :uploading="uploading"
          @message="notify"
          @reset="reset()"
        />
      </div>
      <v-menu
        left
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
            color="pink"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container
      id="body"
      fluid
    >
      <v-container class="pa-1">
        <v-row class="justify-center">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              placeholder="search image caption , tags , or dates"
              :v-if="!images.length==0"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              color="dark"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <div
          v-for="(details , i) in images"
          :key="i"
        >
          <Feed :details="details" />
          <br>
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
      loading: false,
      uploading: false,
      images: [],
      color: "red",
      menu: false,
    };
  },
  components: {
    Modal,
    Snackbar,
    Feed,
    DeletePrompt
  },
  computed: {
    filteredList() {
      return this.images.filter(image => {
        if (!isNullOrUndefined(image.image)) {
          return (
            image.caption.toLowerCase().includes(this.search.toLowerCase()) ||
            image.tag.toLowerCase().includes(this.search.toLowerCase()) ||
            image.createdAt
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            image.updatedAt.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      });
    },
    account() {
      return !isNullOrUndefined(localStorage.getItem("token"))
        ? jwt_decode(localStorage.getItem("token")).user
        : null;
    },
    isLoggedin() {
      return !isNullOrUndefined(this.account);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
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
      this.removeImage(id);
      axios
        .post("http://localhost:4000/user/delete", { id: id })
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
    removeImage(id) {
      setTimeout(() => {
        this.images = this.images.filter(image => image._id !== id);
        this.togglePhotos();
      }, 500);
    },
    getImages() {
      var url = "http://localhost:4000/user/retrieveAll";
      this.sendImageRequest(url);
    },
    sendImageRequest(url) {
      this.images = [];
      this.notify("Please wait while we are retrieving your data...");
      this.loading = true;
      axios
        .post(url)
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
          this.updateImage();
          this.togglePhotos();
          this.$refs.notif.snackbar = false;
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            setTimeout(() => {
              // this.getImages();
            }, 2000);
          }
        });
    },
    notify(msg) {
      this.$refs.notif.message(msg);
    },
  },
  mounted() {
    if (isNullOrUndefined(this.account)) {
      this.$router.replace("/account/login");
    } else {
      this.getImages();
    }
  }
};
</script>
