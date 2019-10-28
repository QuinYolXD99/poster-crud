<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-toolbar-title>PicTalk</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
      <v-btn text small @click="slideshow">
        <v-icon left>mdi-play</v-icon>
      </v-btn>
      <div>
        <Modal
          ref="modal"
          v-if="!loading"
          :cardTitle="cardTitle"
          :buttonTitle="buttonTitle"
          :isUpdate="isUpdate"
          :uploading="uploading"
          @message="notify"
        />
      </div>
    </v-app-bar>
    <v-container id="body" fluid>
      <div class="gallery">
        <br />
        <br />
        <v-container class="pa-1">
          <v-item-group multiple>
            <v-row>
              <v-img
                height="300"
                aspect-ratio="1.4"
                src="@/assets/placeholder.png"
                v-if="images.length == 0"
                contain
              ></v-img>
              <v-col v-for="(image , i) in images" :key="i" cols="12" md="4">
                <v-card max-height="400" hover>
                  <v-card-text>
                    <v-item>
                      <v-img
                        @click="imageViewer(image)"
                        :src="image.image"
                        cover
                        height="300"
                        aspect-ratio="1.4"
                        class="text-right pa-2"
                      ></v-img>
                    </v-item>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions draggable>
                    <v-card-title class="body-2">{{image.caption}}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon v-on:click="(beforeUpdate(image._id),dialog = true)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon v-on:click="remove(image._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-footer dark padless>
                    <v-card class="flex" flat tile></v-card>
                  </v-footer>
                </v-card>
              </v-col>
            </v-row>
          </v-item-group>
        </v-container>
      </div>
    </v-container>
    <ImageViewer ref="viewer" />
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import ImageViewer from "./ImageViewer.vue";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      isUpdate: false,
      description: "",
      cardTitle: "Add new Image",
      buttonTitle: "Upload",
      id: "",
      loading: false,
      uploading: false,
      images: [],
      snackbar: false,
      color: "red",
      text: "",
      timeout: 2000
    };
  },
  components: {
    Modal,
    ImageViewer
  },
  methods: {
    imageViewer(img) {
      this.$refs.viewer.dialog = true;
      this.$refs.viewer.watch(img);
      this.$refs.viewer.hidden = true;
    },
    slideshow() {
      this.$refs.viewer.dialog = true;
      this.$refs.viewer.images = this.images;
      this.$refs.viewer.hidden = false;
    },
    reset() {
      this.cardTitle = "Add new Image";
      this.buttonTitle = "Upload";
      this.isUpdate = false;
      this.uploading = false;
    },
    remove(id) {
      // console.log(this.images);
      setTimeout(() => {
        this.images = this.images.filter(image => image._id !== id);
      }, 500);

      axios
        .post("http://localhost:4000/crud/delete", { id: id })
        .then(res => {
          // console.log(res);
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
      // this.uploading = true;
      this.notify("Please wait while we are retrieving your data...");

      this.loading = true;
      axios
        .get("http://localhost:4000/crud/retrieve")
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            this.getImages();
          }
        });
    },
    beforeUpdate(id) {
      this.$refs.modal.dialog = true;
      this.id = id;
      this.isUpdate = true;
      this.cardTitle = "Update Image";
      this.buttonTitle = "Update";
    },
    notify(msg) {
      this.text = typeof msg !== "string" ? msg.message : msg;
      this.snackbar = true;
      if (typeof msg !== "string") {
        if (msg.response.images !== null) {
          if (msg.response.update) {
            var item = msg.response.images;
            this.images[
              this.images.findIndex(el => el._id === item._id)
            ] = item;
          }
        }
      }
    }
  },
  mounted() {
    this.getImages();
  }
};
</script>