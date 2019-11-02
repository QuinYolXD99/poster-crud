<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-btn text @click="(allImageMode = false,getImages)">
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
      <v-btn text @click="(allImageMode = true , getImages)">Explore</v-btn>
      <v-btn icon x-large>
        <v-icon color="pink" left>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container id="body" fluid>
      <v-container class="pa-1">
        <v-row class="justify-center">
          <v-col cols="12" md="5">
            <v-text-field
              placeholder="search image caption , tags , or dates"
              v-if="!images.length==0"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              color="dark"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <br>
        <ImageViewer ref="viewer"/>
      </v-container>
    </v-container>
    <DeletePrompt ref="prompt"/>
    <Snackbar ref="notif"/>
  </div>
</template>
<script>
/* eslint-disable */
import Modal from "@/components/Modal.vue";
import Snackbar from "@/components/Snackbar.vue";
import DeletePrompt from "@/components/DeletePrompt.vue";
import ImageViewer from "./ImageViewer.vue";
import axios from "axios";
import bus from "@/bus";
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
      images: [],
      color: "red",
      allImageMode: false
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
        .post("http://localhost:4000/crud/delete", { id: id })
        .then(res => {
          if (res.data.success) {
            if (this.images.length == 0) {
              this.notify("No images Available!");
            }
            this.notify("Deleted successfully!");
            bus.$emit("remove", id);
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
      }, 500);
    },
    getImages() {
      var url = "http://localhost:4000/crud/retrieve";
      var query = {
        id: isNullOrUndefined(this.account) ? "" : this.account.id
      };

      if (isNullOrUndefined(this.account)) {
        this.notify("You must log in first!");
        this.$router.push("/login");
      } else {
        if (!this.allImageMode) {
          this.sendImageRequest(url, query);
        } else {
          this.sendImageRequest(url + "All", query);
        }
      }
    },
    sendImageRequest(url, query) {
      this.images = [];
      this.notify("Please wait while we are retrieving your data...");
      this.loading = true;
      axios
        .get(url, query)
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          this.images = this.sortImages();
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
          this.$refs.notif.snackbar = false;
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            setTimeout(() => {
              this.getImages();
            }, 1000);
          }
        });
    },
    // getAllImages() {
    //   sendImageRequest(url, query);
    // },
    // getMyImages() {
    //   sendImageRequest(url, query);
    // },

    sortImages() {
      this.images.sort(function(a, b) {
        return b.priority - a.priority;
      });
      return this.images;
    },

    beforeUpdate(item) {
      var modal = this.$refs.modal;
      modal.dialog = true;
      modal.filename = modal.trimString(item.imageName);
      modal.file = item.image;
      modal.description = item.caption;
      modal.tag = item.tag;
      modal.color = "pink";
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
      this.images = this.sortImages();
      axios.post("http://localhost:4000/crud/like", { id: image._id });
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
    }
  },
  mounted() {
    this.getImages();
  },
  updated() {
    console.log(this.account);
    // console.log();
  }
};
</script>