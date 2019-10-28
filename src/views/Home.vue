<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-toolbar-title>PicTalk</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>

      <div>
        <Modal
          ref="modal"
          :disabled="loading"
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
                <v-card>
                  <v-card-text>
                    <v-item>
                      <v-img
                        @click="view(image)"
                        :src="image.image"
                        cover
                        height="300"
                        aspect-ratio="1.4"
                        class="text-right pa-2"
                      ></v-img>
                    </v-item>
                  </v-card-text>
                  <v-card-actions>
                    <v-card-title class="body">{{image.caption}}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon v-on:click="(beforeUpdate(image._id),dialog = true)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon v-on:click="remove(image._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-item-group>
        </v-container>
        <!-- </v-card> -->
        <!-- <v-card max-width="900" class="mx-auto" style="padding:15px">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{image.caption}}
                <v-btn icon>
                  <v-icon v-on:click="(beforeUpdate(image._id),dialog = true)">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <br />
          <v-img :src="image.image" max-height="600" ></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon v-on:click="remove(image._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>-->
      </div>
    </v-container>
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
      file: { empty: true },
      filename: "No file selected!",
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
    Modal
  },
  methods: {
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

    encode: async file => {
      let result_base64 = await new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.onload = e => {
          console.log(typeof e);
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      });
      return result_base64;
    },

    getImages() {
      this.images = [];
      this.uploading = true;
      this.notify("Please wait while we are retrieving your data...");

      this.loading = true;
      axios
        .get("http://localhost:4000/crud/retrieve")
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data; // eslint-disable-line no-console
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
          }
        });
    },

    handleFileUpload() {
      this.color = "primary";
      this.file = this.$refs.myFiles.files[0];
      this.filename = this.file.name;
      this.encode(this.file).then(res => {
        this.file = res;
      });
    },

    beforeUpdate(id) {
      this.$refs.modal.dialog = true;
      this.id = id;
      this.isUpdate = true;
      this.cardTitle = "Update Image";
      this.buttonTitle = "Update";
    },

    validate() {
      if (!this.$refs.form.validate() || this.file.empty) {
        this.filename = "Please select file!";
        this.notify("Please select file!");
        setTimeout(() => {
          this.filename = "no file selected";
        }, 1000);
      } else {
        var post = {
          image: this.file,
          caption: this.description
        };
        this.loading = true;
        if (!this.isUpdate) {
          this.upload(post);
        } else {
          this.update(post);
        }
      }
    },
    notify(msg) {
      this.text = typeof msg !== "string" ? msg.message : msg;
      this.snackbar = true;
      if (typeof msg !== "string") {
        if (msg.response !== null) {
          if (msg.response.image) {
            this.images.push(msg.response.images);
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