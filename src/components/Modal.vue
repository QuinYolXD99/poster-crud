<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <div class="my-2" dark v-on="on">
          <v-btn text small :disabled="disabled">
            <v-icon left>mdi-pencil</v-icon>Post
          </v-btn>
        </div>
      </template>

      <v-card id="body " max-width="400px" :loading="uploading_local">
        <v-card-title>
          <span class="title text-center">{{cardTitle}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row style="padding:10px" class="justify-center">
              <v-avatar v-if="!file.empty" size="100" @click="$refs.myFiles.click()">
                <img :src="file" alt="dp" />
              </v-avatar>
              <v-btn
                id="cam"
                class="ma-2"
                outlined
                large
                size="80"
                v-if="file.empty"
                @click="$refs.myFiles.click()"
                fab
                color="pink"
              >
                <v-icon x-large>mdi-camera</v-icon>
              </v-btn>
              <v-col cols="12" md="11">
                <v-textarea
                  :filled="false"
                  :rules="[v => !!v || 'add description!']"
                  background-color="white"
                  label="Description"
                  auto-grow
                  rows="1"
                  prepend-inner-icon="mdi-comment"
                  clearable
                  clear-icon="mdi-delete"
                  color="dark"
                  v-model="description"
                  @keydown.enter="validate"
                ></v-textarea>
                <v-text-field
                  label="add tag"
                  clearable
                  :rules="[v => !!v || 'add tag!']"
                  prepend-inner-icon="mdi-tag"
                  v-model="tag"
                  color="dark"
                  @keydown.enter="validate "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col>
              <center>
                <pre class="body-1 text-uppercase">{{filename}}</pre>
              </center>
            </v-col>
            <center>
              <v-btn color="pink" outlined width="200" @click="validate " rounded>{{buttonTitle}}</v-btn>
            </center>
          </v-form>
        </v-card-text>
        <input
          type="file"
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
  height: 100px;
  width: 100px;
}
</style>
<script>
import axios from "axios";
export default {
  props: {
    cardTitle: String,
    buttonTitle: String,
    isUpdate: Boolean,
    disabled: Boolean,
    uploading: Boolean
  },
  data() {
    return {
      uploading_local: false,
      filename: "No file selected!",
      description: "",
      tag: "",
      dialog: false,
      file: { empty: true },
      this_parent: this.$parent.$options.parent
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate() || this.file.empty) {
        this.filename = "Please select file!";
        this.notify("All fields are required", null);
        setTimeout(() => {
          this.filename = this.file.empty
            ? "No file selected!"
            : this.trimString(this.file.name);
        }, 1000);
      } else {
        var post = {
          image: this.file,
          imageName: this.filename,
          caption: this.description,
          tag: this.tag,
          priority: false,
          userId: this.this_parent.account.id,
          username: this.this_parent.account.username
        };
        if (!this.isUpdate) {
          this.upload(post);
        } else {
          this.update(post);
        }
      }
    },
    handleFileUpload() {
      this.file = this.$refs.myFiles.files[0];
      this.filename = this.trimString(this.file.name);
      this.encode(this.file).then(res => {
        this.file = res;
      });
    },
    trimString(string) {
      return string.length > 20 ? string.substring(0, 20) + "..." : string;
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
    update(post) {
      this.this_parent.loading = true;
      this.notify("Updating....", null);
      this.this_parent.timeout = 100000;
      axios
        .post("https://pictalk-api.herokuapp.com/crud/update", {
          id: this.this_parent.id,
          post: post
        })
        .then(res => {
          this.this_parent.snackbar = false;
          this.this_parent.timeout = 2000;
          var updated = res.data.data;
          this.this_parent.loading = false;
          if (!res.data.error) {
            this.notify("Updated Sucessfully!", res.data.data, true);
            this.this_parent.allImageMode = false;
            this.this_parent.togglePhotos();
            this.this_parent.images.map(
              image => (image = image._id == updated._id ? updated : image)
            );
            // this.this_parent.images[
            //   this.this_parent.images.findIndex(
            //     image => image._id === updated._id
            //   )
            // ] = updated;
            this.closeDialog();
          } else {
            this.notify("Update failed!", null);
          }
        })
        .catch(err => {
          this.this_parent.loading = false;
          this.notify("Update failed!", null);
          console.error(err); // eslint-disable-line no-console
        });
    },
    upload(post) {
      this.this_parent.loading = true;
      this.notify("Upload in progress......", null, false);

      axios
        .post("https://pictalk-api.herokuapp.com/crud/upload", post)
        .then(res => {
          if (!res.data.error) {
            this.this_parent.images.push(res.data.data);
            this.this_parent.updateImage();
            this.this_parent.loading = false;
            this.this_parent.allImageMode = false;
            this.this_parent.togglePhotos();
            this.notify("File uploaded Sucessfully!", res.data.data, false);
            this.closeDialog();
          }
        })
        .catch(err => {
          this.notify("Upload failed!", null);
          console.error(err); // eslint-disable-line no-console
        });
    },
    closeDialog() {
      this.dialog = false;
      this.description = "";
      this.filename = "No file selected!";
      this.file = { empty: true };
    },

    notify(msg, data, update) {
      this.$emit("message", {
        message: msg,
        response: { update: update, images: data }
      });
    }
  },
  update() {
    this.uploading_local = this.this_parent.loading;
  },
  mounted() {
    if (!this.isUpdate) {
      this.$emit("reset");
    }
  }
};
</script>
