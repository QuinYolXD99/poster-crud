<template>
  <!-- <v-row justify="center"> -->
  <v-container id="body" fluid>
    <v-dialog v-model="dialog" overlay-opacity="1" overlay-color="white" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-btn v-on="on" color="pink" outlined dark fixed top right x-large>
            <v-icon>mdi-upload</v-icon>Post
          </v-btn>
        </v-fab-transition>
      </template>

      <v-card id="body " max-width="500px" :loading="loading">
        <v-card-title>
          <span class="headline">Add Post</span>
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
                <v-pre class="title error--text">{{file.name}}</v-pre>
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
  </v-container>
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
export default {
  data() {
    return {
      dialog: false,
      description: "",
      file: { name: "no file selected", empty: true },
      loading: false
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.description = "";
    },
    upload() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);

      let formData = new FormData();
      formData.append("file", this.file);
      console.log(formData); // eslint-disable-line no-console

      axios
        .post("http://localhost:4000/crud/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.info(res); // eslint-disable-line no-console
        })
        .catch(err => {
          console.error(err); // eslint-disable-line no-console
        });
    },
    handleFileUpload() {
      // this.file = this.$refs.myFiles;
      this.file = this.$refs.myFiles.files[0];
      console.log(this.file); // eslint-disable-line no-console
    },

    validate() {
      if (!this.$refs.form.validate() || this.file.empty) {
        this.file.name = "Please select file!";
        setTimeout(() => {
          this.file.name = "no file selected";
        }, 1000);
      } else {
        this.upload();
      }
    }
  }
};
</script>