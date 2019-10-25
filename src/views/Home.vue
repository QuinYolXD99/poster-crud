<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-btn v-on="on" color="pink" outlined dark fixed top right x-large>
            <v-icon>mdi-upload</v-icon>Post
          </v-btn>
        </v-fab-transition>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Post</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-textarea
                  filled
                  :rules="[v => !!v || 'add description']"
                  background-color="white"
                  outlined
                  label="ADD DESCRIPTION"
                  auto-grow
                  v-model="description"
                ></v-textarea>
              </v-row>
              <v-row>
                <v-file-input
                  label="Add Image"
                  chips
                  :rules="[v => !!v || 'file is required']"
                  dense
                  ref="file"
                  prepend-icon="mdi-image"
                  v-on:change="handleFileUpload"
                  accept="image/*"
                ></v-file-input>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="validate ">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      description: "",
      file: ""
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.description = "";
    },
    upload() {
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(formData);// eslint-disable-line no-console

      axios
        .post("http://localhost:4000/crud/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res)=> {
          console.info(res)// eslint-disable-line no-console
        })
        .catch((err) =>{
          console.error(err)// eslint-disable-line no-console
        });
    },
    handleFileUpload(e) {
      this.file = e
      // this.file = this.$refs.file.files[0];
      console.log(this.file);// eslint-disable-line no-console
      
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.upload();
      }
    }
  }
};
</script>