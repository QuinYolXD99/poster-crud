<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-toolbar-title>PicTalk</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>

      <div @click="dialog = !dialog">
        <v-btn class="ma-4" icon>
          <v-icon left>mdi-pencil</v-icon>Post
        </v-btn>
      </div>
    </v-app-bar>
    <v-container id="body" fluid>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card id="body " max-width="500px" :loading="loading">
          <v-card-title>
            <span class="headline">New Post</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-textarea
                  :filled="false"
                  :rules="[v => !!v || 'add description']"
                  background-color="white"
                  label="ADD DESCRIPTION"
                  auto-grow
                  rows="3"
                  clearable
                  clear-icon="mdi-delete"
                  row-height="20"
                  color="primary"
                  outlined
                  v-model="description"
                ></v-textarea>
              </v-row>

              <!-- <v-row> -->
              <v-col>
                <center>
                  <pre class="title text-uppercase">{{filename}}</pre>
                  <center>
                    <v-btn
                      :loading="loading"
                      color="primary"
                      outlined
                      class="ma-2 white--text"
                      @click="$refs.myFiles.click()"
                    >
                      Add Image
                      <v-icon right dark>mdi-camera</v-icon>
                    </v-btn>
                  </center>
                </center>
              </v-col>
              <center>
                <v-btn color="primary" width="200" @click="validate " rounded>Post</v-btn>
              </center>
              <!-- </v-row> -->
            </v-form>
          </v-card-text>
          <input
            type="file"
            id="file"
            ref="myFiles"
            hidden
            v-show="false"
            label="Add Image"
            chips
            :rules="[v => !!v || 'file is required']"
            dense
            prepend-icon="mdi-image"
            v-on:change="handleFileUpload"
            accept="image/*"
          />
          <input />
        </v-card>
      </v-dialog>
      <div class="gallery" v-for="(image , i) in images" :key="i">
        <br />
        <br />
        <v-card max-width="1000" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="primary" size="48">
              <span class="white--text headline">Yol</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{image.caption}}
                <v-btn icon>
                  <v-icon v-on:click="update(image._id)">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="image.image"></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon v-on:click="remove(image._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
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
</style>
<script>
import axios from "axios";
import { async } from "q";
export default {
  data() {
    return {
      dialog: false,
      description: "",
      file: "No image Selected",
      filename: "",
      loading: false,
      images: [],
      snackbar: false,
      text: "",
      timeout: 2000
    };
  },
  methods: {
    remove(id) {
      console.log(id);
    },
    update(id) {
      console.log(id);
    },
    encode: async file => {
      console.log(typeof async);
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
      axios
        .get("http://localhost:4000/crud/retrieve")
        .then(res => {
          this.images = res.data.data; // eslint-disable-line no-console
          if (this.images.length == 0) {
            this.snackbar = true;
            this.text = "No images available";
            this.loading = false;
          } else {
            this.loading = false;
          }

          // console.log(this.images);
        })
        .catch(err => {
          console.log(err);

          if (err) {
            this.snackbar = true;
            this.text = "No images available";
            this.loading = false;
          }
          console.log(err); // eslint-disable-line no-console
        });
    },
    closeDialog() {
      this.dialog = false;
      this.description = "";
    },
    upload() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
      var post = {
        image: this.file,
        caption: this.description
      };
      console.log(post);

      axios
        .post("http://localhost:4000/crud/upload", post)
        .then(res => {
          if (!res.data.error) {
            this.getImages();
          }
        })
        .catch(err => {
          console.error(err); // eslint-disable-line no-console
        });
    },
    handleFileUpload() {
      this.file = this.$refs.myFiles.files[0];
      this.filename = this.file.name;
      this.encode(this.file).then(res => {
        this.file = res;
      });
    },

    validate() {
      if (!this.$refs.form.validate() || this.file.empty) {
        this.filename = "Please select file!";
        setTimeout(() => {
          this.filename = "no file selected";
        }, 1000);
      } else {
        this.upload();
      }
    }
  },
  mounted() {
    if (this.images.length == 0) {
      this.loading = true;
    }
    setTimeout(() => {
      this.getImages();
    }, 2000);
  }
};
</script>