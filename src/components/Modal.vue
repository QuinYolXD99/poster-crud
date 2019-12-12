<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on }">
        <v-btn  small text color="pink" outlined rounded v-on="on">post report</v-btn>
      </template>

      <v-card id="body " max-width="700px">
        <v-card-title>
          <span class="title text-center">{{item?'Update ':'Create '}}Post</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-12">
          <v-form ref="form" lazy-validation>
            <v-row class="justify-center px-md-10">
              <br />
              <img
                :src="preview"
                v-if="file"
                alt="dp"
                class="ma-5"
                height="200"
                cover
                @click="$refs.myFiles.click()"
              />
              <v-img
                src="@/assets/placeholder.png"
                v-else
                height="200"
                class="ma-5"
                contain
                @click="$refs.myFiles.click()"
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
                <v-btn
                  color="pink"
                  outlined
                  large
                  width="200"
                  @click="validate "
                  rounded
                >{{item?'Update':'Upload'}}</v-btn>
              </center>
            </v-col>
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
    item: Object
  },
  data() {
    return {
      filename: "No file selected!",
      description: "",
      title: "",
      preview: "",
      category: "",
      location: "",
      locations: [
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
      file: null,
      upload_indicator: false,
      categories: ["Crime", "Waste", "Accidents"]
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        this.notify("All fields are required", null);
        setTimeout(() => {
          this.filename = !this.file
            ? "No file selected!"
            : this.trimString(this.file.name);
        }, 1000);
      } else {
        var post = {
          description: this.description,
          title: this.title,
          category: this.category,
          user: JSON.parse(localStorage.getItem("token"))._id,
          location: this.location
        };
        var fd = new FormData();
        fd.append("img", this.file);
        fd.append("details", JSON.stringify(post));
        if (!this.isUpdate) {
          this.upload(fd);
        } else {
          this.update(fd);
        }
      }
    },
    handleFileUpload() {
      this.file = this.$refs.myFiles.files[0];
      this.encode(this.file).then(res => {
        this.preview = res;
      });
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
      this.upload_indicator = true;
      this.notify("Updating....");
      axios
        .post(this.$_CONFIG.requestuserRequestURL + "update", {
          id: this.item._id,
          post: post
        })
        .then(res => {
          this.upload_indicator = false;
          if (!res.data.error) {
            this.$emit("reload");
            this.closeDialog();
          } else {
            this.$emit("notify", "Update failed!");
          }
        })
        .catch(err => {
          this.upload_indicator = false;
          this.$emit("notify", "Update failed!");
          console.error(err); // eslint-disable-line no-console
        });
    },
    upload(post) {
      this.upload_indicator = true;
      this.notify("Upload in progress......", null, false);
      axios
        .post(this.$_CONFIG.userRequestURL + "upload", post)
        .then(res => {
          if (!res.data.error) {
            console.log(res.data);
            this.$emit("addLogs", res.data.data);
            this.$emit("notify,", "File uploaded Sucessfully!");
            this.closeDialog();
          }
        })
        .catch(err => {
          this.$emit("notify,", "Upload Failed");
          console.error(err); // eslint-disable-line no-console
        });
    },
    notify(message) {
      this.$emit("notify", message);
    },
    closeDialog() {
      this.$refs.form.reset();
      this.dialog = false;
      this.file = null;
    }
  },
  mounted() {
    if (!this.isUpdate) {
      this.$emit("reset");
    }
  }
};
</script>
