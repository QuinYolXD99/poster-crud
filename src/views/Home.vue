<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-toolbar-title>PicTalk</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
      <v-btn v-show="images.length!==0" text small @click="slideshow">
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
          @click="reset"
        />
      </div>
    </v-app-bar>
    <v-container id="body" fluid>
      <div class="gallery">
        <v-container class="pa-1">
          <v-row class="justify-center">
            <v-col cols="12" md="5">
              <v-text-field
                placeholder="search image"
                v-if="!images.length==0"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
                color="dark"
              ></v-text-field>
            </v-col>
          </v-row>
          <br>
          <v-item-group multiple>
            <v-row>
              <v-img
                height="300"
                aspect-ratio="1.4"
                src="@/assets/placeholder.png"
                v-if="!filteredList.length"
                contain
              ></v-img>
              <v-col v-for="(image , i) in filteredList" :key="i" cols="12" md="4">
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
                    <v-card-title class="body-2 font-weight-bold text-capitalize	">#{{image.tag}}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon
                        :disabled="loading"
                        :color="image.priority?'pink':'grey'"
                        v-on:click="(image.priority = !image.priority,like(image))"
                      >mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon :disabled="loading" v-on:click="beforeUpdate(image)">mdi-pencil</v-icon>
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
    <ImageViewer ref="viewer"/>
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
      isUpdate: false,
      description: "",
      search: "",
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
  computed: {
    filteredList() {
      return this.images.filter(image => {
        return (
          image.caption.toLowerCase().includes(this.search.toLowerCase()) ||
          image.tag.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
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
          this.images = this.sortImages();
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            setTimeout(() => {
              this.getImages()
            }, 1000);
          }
        });
    },

    sortImages() {
      this.images.sort(function(a, b) {
        return b.priority - a.priority;
      });
      return this.images;
    },

    beforeUpdate(item) {
      var modal = this.$refs.modal;
      modal.dialog = true;
      modal.filename = modal.trimString(item.image);
      modal.file = item.image;
      modal.description = item.caption;
      modal.color = "primary";
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
      axios
        .post("http://localhost:4000/crud/like", { id: image._id })
        .then(res => {
          throw res;
        })
        .catch(err => {
          throw err;
        });
    },
    notify(msg) {
      this.text = typeof msg !== "string" ? msg.message : msg;
      this.snackbar = true;
    },
    trimString(string, length) {
      return string.length > length
        ? string.substring(0, length) + "..."
        : string;
    }
  },
  mounted() {
    this.getImages();
  }

  // viewer : https://github.com/mirari/v-viewer
};
</script>