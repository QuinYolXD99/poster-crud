<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <div class="my-2" dark v-on="on">
          <v-btn text small :disabled="disabled">
            <v-icon left>mdi-pencil</v-icon>Post
          </v-btn>
        </div>
      </template>

      <v-card id="body " max-width="500px" :loading="uploading_local">
        <v-card-title>
          <span class="headline">{{cardTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col>
                <center>
                  <v-avatar
                    v-if="!file.empty"
                    size="120"
                    :loading="loading"
                    @click="$refs.myFiles.click()"
                  >
                    <img :src="file" alt="John" />
                  </v-avatar>
                  <v-btn
                    id="cam"
                    class="ma-2"
                    outlined
                    x-large
                    v-if="file.empty"
                    :loading="loading"
                    @click="$refs.myFiles.click()"
                    fab
                    :color="color"
                  >
                    <v-icon x-large>mdi-camera</v-icon>
                  </v-btn>
                </center>
              </v-col>
            </v-row>
            <v-row style="padding:10px">
              <v-textarea
                :filled="false"
                :rules="[v => !!v || 'add description']"
                background-color="white"
                label="Caption"
                auto-grow
                rows="1"
                clearable
                clear-icon="mdi-delete"
                color="primary"
                v-model="description"
              ></v-textarea>
            </v-row>
            <v-col>
              <center>
                <pre class="body-1 text-uppercase">{{filename}}</pre>
              </center>
            </v-col>
            <center>
              <v-btn color="primary" width="200" @click="validate " rounded>{{buttonTitle}}</v-btn>
            </center>
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
  </div>
</template>
<style lang="css">
#cam {
  height: 120px;
  width: 120px;
}
</style>
<script>
import axios from "axios";
export default {
  props: {
    cardTitle: String,
    buttonTitle: String,
    isUpdate: Boolean,
    disabled:Boolean,
    uploading: Boolean
  },
  data() {
    return {
      uploading_local: false,
      filename: "No file selected!",
      description: "",
      color: "red",
      dialog: false,
      loading: false,
      file: { empty: true }
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate() || this.file.empty) {
        this.filename = "Please select file!";
        this.notify("Please select file!",null);
        setTimeout(() => {
          this.filename = "no file selected";
        }, 1000);
      } else {
        var post = {
          image: this.file,
          caption: this.description
        };
        console.log(post);

        this.loading = true;
        if (!this.isUpdate) {
          this.upload(post);
        } else {
          this.update(post);
        }
      }
    },
    handleFileUpload() {
      this.color = "primary";
      this.file = this.$refs.myFiles.files[0];
      this.filename = this.file.name;
      this.encode(this.file).then(res => {
        this.file = res;
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
    beforeUpdate(id) {
      this.id = id;
      this.isUpdate = true;
      this.cardTitle = "Update Image";
      this.buttonTitle = "Update";
    },
    update(post) {
      this.loading = true;
      this.uploading_local = true;
      axios
        .post("http://localhost:4000/crud/update", { id: this.id, post: post })
        .then(res => {
          this.loading = false;
          if (!res.data.error) {
            // this.getImages();
            this.notify("Updated Sucessfully!",null);
            this.loading = false;
            this.uploading_local = false;
            this.uploading = false;
            this.closeDialog();
          }
        })
        .catch(err => {
          this.loading = false;
          this.notify("Update failed!",null);
          console.error(err); // eslint-disable-line no-console
        });
    },
    upload(post) {
      this.uploading_local = true;
      axios
        .post("http://localhost:4000/crud/upload", post)
        .then(res => {
          this.loading = false;
          if (!res.data.error) {
            // this.images.push(res.data.data);
            this.notify("File uploaded Sucessfully!", res.data.data);
            this.loading = false;
            this.uploading_local = false;
            this.uploading = false;
            this.closeDialog();
          }
        })
        .catch(err => {
          this.notify("Upload failed!",null);
          console.error(err); // eslint-disable-line no-console
        });
    },
    closeDialog() {
      this.dialog = false;
      this.description = "";
      this.filename = "No file selected!";
      this.file = { empty: true };
    },

    notify(msg, data) {
      this.$emit("message", {
        message: msg,
        response: { image: true, images: data }
      });
    }
  }
};
</script>