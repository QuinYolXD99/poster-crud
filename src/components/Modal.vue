<template>
  <div>
    <v-dialog v-model="dialog" max-width="700">
      <template v-slot:activator="{ on }">
        <div class="my-2" dark>
          <v-btn text v-on="on">
            <v-icon left>mdi-pencil</v-icon>Post
          </v-btn>
        </div>
      </template>

      <v-card id="body " max-width="700px" :loading="uploading_local">
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
              <v-img
                src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                v-if="file.empty"
                
                 height="300"
                @click="$refs.myFiles.click(preview)"
              ></v-img>
              <v-col cols="12" md="11">
                <v-text-field
                  v-model="title"
                  outlined
                  label="Title"
                  :rules="[v=>!!v||'required']"
                  dense
                />
                <v-text-field
                  v-model="description"
                  outlined
                  label="Description"
                  :rules="[v=>!!v||'required']"
                  dense
                />
                <v-select
                  :items="categories"
                  outlined
                  label="Category"
                  :rules="[v=>!!v||'required']"
                  v-model="category"
                  dense
                ></v-select>
                <v-select
                  :items="locations"
                  label="Location"
                  outlined
                  v-model="location"
                  :rules="[v=>!!v||'required']"
                  dense
                ></v-select>
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
          multiple
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
      title: "",
      category: "",
      location: "",
      locations: [
        "All",
        "Adlaon",
        "Agsungot",
        "Apas",
        "Bacayan",
        "Banilad",
        "Binaliw",
        "Budla-an",
        "Busay",
        "Zapatera",
        "Day-as",
        "Ermita",
        "Santa Cruz",
        "Santo Niño",
        "Sirao",
        "T Padilla",
        "Talamban",
        "Taptap",
        "Tejero",
        "Tinago",
        "Carreta",
        "Cogon Ramos",
        "Day-as",
        "Ermita",
        "Guba",
        "Hipodromo",
        "Kalubihan",
        "Kamagayan",
        "Kamputhaw (Camputhaw)",
        "Kasambagan",
        "Lahug",
        "Lorega San Miguel",
        "Lusaran",
        "Luz",
        "Mabini",
        "Mabolo Proper",
        "Malubog",
        "Pahina Central",
        "Parian",
        "Paril",
        "Pit-os",
        "Pulangbato",
        "Sambag I",
        "Sambag II",
        "San Antonio",
        "San Jose",
        "San Roque"
      ],
      dialog: false,
      file: { empty: true },
      this_parent: this.$parent.$options.parent,
      categories: ["Transportation", "Crime", "Waste", "Accidents"]
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
          description: this.description,
          title: this.title,
          category: this.category,
          user: this.$jwt_decode(localStorage.getItem("token")).admin._id,
          location: this.location
        };
        var fd = new FormData();
        fd.append("img", this.file);
        fd.append("details", JSON.stringify(post));
        if (!this.isUpdate) {
          this.upload(fd);
        } else {
          this.update(post);
        }
      }
    },
    handleFileUpload() {
      this.file = this.$refs.myFiles.files[0];
      this.filename = this.trimString(this.file.name);
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
        .post(this.$_CONFIG.requestuserRequestURL + "update", {
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
            var index = this.this_parent.images.findIndex(
              img => img._id == updated._id
            );
            this.this_parent.images[index] = updated;
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
        .post(this.$_CONFIG.userRequestURL + "upload", post)
        .then(res => {
          if (!res.data.error) {
            this.this_parent.images.push(res.data.data);
            this.this_parent.loading = false;
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
