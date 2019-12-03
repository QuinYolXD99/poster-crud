<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-btn text>
        <v-toolbar-title>PicTalk</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="pink"></v-progress-linear>
      <v-btn v-show="images.length!==0" text small @click="show">
        <v-icon left>mdi-play</v-icon>
      </v-btn>
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
      <v-btn
        text
        :disabled="loading"
        :color=" !allImageMode ? 'pink' : 'grey' "
        @click="(allImageMode = false , togglePhotos())"
      >My Photos</v-btn>|
      <v-btn
        text
        ref="explore"
        :disabled="loading"
        @click="(allImageMode = true , togglePhotos())"
        :color=" allImageMode ? 'pink' : 'grey' "
      >Explore</v-btn>

      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" color="pink">
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
        <v-list dense>
          <v-list-item @click="profile()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>View Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container id="body" fluid>
      <v-container class="pa-1">
        <v-row class="justify-center">
          <v-col cols="12" md="5">
            <v-text-field
              placeholder="search image caption , tags , or dates"
              :v-if="!images.length==0"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              @keypress="keymonitor"
              color="dark"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <ImageViewer ref="viewer" />
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
import ImageViewer from "./ImageViewer.vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
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
      tempImage: [],
      images: [],
      color: "red",
      menu: false,
      allImageMode: true
    };
  },
  components: {
    Modal,
    ImageViewer,
    Snackbar,
    DeletePrompt
  },
  computed: {
    filteredList() {
      if (!isNullOrUndefined(this.search)) {
        return this.tempImage.filter(image => {
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
      } else {
        return this.images;
      }
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
    profile() {
      this.$router.push("/UpdateProfile");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    keymonitor(e) {
      this.allImageMode = true;
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
        .post("https://pictalk-api.herokuapp.com/crud/delete", { id: id })
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
      var url = "https://pictalk-api.herokuapp.com/crud/retrieveAll";
      var query = {
        id: this.account.id
      };

      this.sendImageRequest(url, query);
    },
    sendImageRequest(url, query) {
      this.images = [];
      this.notify("Please wait while we are retrieving your data...");
      this.loading = true;
      axios
        .post(url, query)
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          this.images = this.sortImages();
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
          this.allImageMode = false;
          this.updateImage();
          this.togglePhotos();
          this.$refs.notif.snackbar = false;
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            setTimeout(() => {
              this.getImages();
            }, 2000);
          }
        });
    },
    sortImages() {
     this.images.sort((a, b) => (a.priority > b.priority) ? -1 : 1)
      return this.images;
    },

    beforeUpdate(item) {
      this.$refs.modal.dialog = true;
      this.$refs.modal.filename = this.$refs.modal.trimString(item.imageName);
      this.$refs.modal.file = item.image;
      this.$refs.modal.description = item.caption;
      this.$refs.modal.tag = item.tag;
      this.$refs.modal.color = "pink";
      this.id = item._id;
      this.isUpdate = true;
      this.cardTitle = "Update Image";
      this.buttonTitle = "Update";
    },

    like(image) {
      if (!image.priority) {
        this.notify("Unliked!");
      } else {
        this.notify("Liked!");
      }
      this.images.map(img => {
        img.priority = img._id == image._id ? image.priority : img.priority;
      });

      axios.post("https://pictalk-api.herokuapp.com/crud/like", {
        id: image._id
      });
      this.images.sortImages();
      this.updateImage();
      this.togglePhotos();
    },
    notify(msg) {
      this.$refs.notif.message(msg);
    },
    trimString(string, length) {
      return string.length > length
        ? string.substring(0, length) + "..."
        : string;
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },
    togglePhotos() {
      if (!this.allImageMode) {
        this.tempImage = this.images.filter(
          image => image.userId == this.account.id
        );
      } else {
        this.updateImage();
      }
    },
    updateImage() {
      this.tempImage = this.images;
    }
  },
  mounted() {
    if (isNullOrUndefined(this.account)) {
      this.$router.replace("/login");
    } else {
      this.getImages();
    }
  }
};
</script>
