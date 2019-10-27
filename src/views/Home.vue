<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-toolbar-title>PicTalk</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>

      <div>
        <v-btn class="ma-4" icon @click="(dialog = !dialog, reset)" :disabled="uploading">
          <v-icon left>mdi-pencil</v-icon>Post
        </v-btn>
      </div>
    </v-app-bar>
    <v-container id="body" fluid>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card id="body " max-width="500px" :loading="loading">
          <v-card-title>
            <span class="headline">{{cardTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col>
                  <center>
                    <v-avatar v-if="!file.empty" size="120" :loading="loading" @click="$refs.myFiles.click()">
                      <img :src="file" alt="John" />
                    </v-avatar>
                    <v-btn id="cam" class="ma-2" outlined x-large v-if="file.empty" :loading="loading"
                      @click="$refs.myFiles.click()" fab :color="color">
                      <v-icon x-large>mdi-camera</v-icon>
                    </v-btn>
                  </center>
                </v-col>
              </v-row>
              <v-row style="padding:10px">
                <v-textarea :filled="false" :rules="[v => !!v || 'add description']" background-color="white"
                  label="Caption" auto-grow rows="1" clearable clear-icon="mdi-delete" color="primary"
                  v-model="description"></v-textarea>
              </v-row>
              <v-col>
                <center>
                  <pre class="body-1 text-uppercase">{{filename}}</pre>
                </center>
              </v-col>
              <center>
                <v-btn color="primary" width="200" @click="validate " rounded>{{buttonTitle}}</v-btn>
              </center>
              <!-- </v-row> -->
            </v-form>
          </v-card-text>
          <input type="file" id="file" ref="myFiles" hidden v-show="false" label="Add Image" chips
            :rules="[v => !!v || 'file is required']" dense prepend-icon="mdi-image" v-on:change="handleFileUpload"
            accept="image/*" />
          <input />
        </v-card>
      </v-dialog>
      <div class="gallery">
        <br />
        <br />
        <v-sheet class="mx-auto" elevation="8" max-width="800">
          <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
            <v-slide-item v-for="(image , i) in images" :key="i" v-slot:default="{ active, toggle }">
              <v-card class="ma-4" height="200" width="200">
                <v-img :src="image.image" height="200" class="text-right pa-2"></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
        <!-- <v-card max-width="500" class="mx-auto">
          <v-container class="pa-1">
            <v-item-group v-model="selected" multiple>
              <v-row>
                <v-col v-for="(image , i) in images" :key="i" cols="18" md="6">
                  <v-item >
                    <v-img :src="image.image" height="200" class="text-right pa-2">
         
                    </v-img>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-container>
        </v-card> -->
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
        </v-card> -->
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
<style lang="css" scoped>
  .v-card,
  .v-overlay__scrim {
    background-color: white !important;
    background: white !important;
  }

  #cam {
    height: 120px;
    width: 120px;
  }
</style>
<script>
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
    methods: {
      reset() {
        this.cardTitle = "Add new Image";
        this.buttonTitle = "Upload";
        this.isUpdate = false;
        this.uploading = false
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
      beforeUpdate(id) {
        this.id = id;
        this.isUpdate = true;
        this.cardTitle = "Update Image";
        this.buttonTitle = "Update";
      },
      update(post) {
        this.loading = true;
        this.uploading = true;

        axios
          .post("http://localhost:4000/crud/update", { id: this.id, post: post })
          .then(res => {
            this.loading = false;
            if (!res.data.error) {
              this.getImages();
              this.notify("Updated Sucessfully!");
              this.closeDialog();
            }
          })
          .catch(err => {
            this.loading = false;
            this.notify("Update failed!");
            console.error(err); // eslint-disable-line no-console
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
      closeDialog() {
        this.dialog = false;
        this.description = "";
        this.file = { empty: true };
      },
      upload(post) {
        this.uploading = true;
        axios
          .post("http://localhost:4000/crud/upload", post)
          .then(res => {
            this.loading = false;
            if (!res.data.error) {
              this.images.push(res.data.data);
              this.notify("File uploaded Sucessfully!");
              this.uploading = false;
              this.closeDialog();
            }
          })
          .catch(err => {
            this.notify("Upload failed!");
            console.error(err); // eslint-disable-line no-console
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
        this.text = msg;
        this.snackbar = true;
      }
    },
    mounted() {
      this.getImages();
    }
  };
</script>