<template>
  <!-- <v-row justify="center"> -->
  <div>
    <v-app-bar light app>
      <v-btn text>
        <v-toolbar-title>PicTalk</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="pink"></v-progress-linear>
      <v-btn v-show="images.length!==0" text small @click="show">
        <v-icon left>mdi-play</v-icon>
      </v-btn>
      <div @click="reset()">
        <Modal
          ref="modal"
          v-if="!loading && isLoggedin"
          :cardTitle="cardTitle"
          :buttonTitle="buttonTitle"
          :isUpdate="isUpdate"
          :uploading="uploading"
          @message="notify"
          @reset="reset()"
        />
      </div>
      <v-btn
        text
        :disabled="loading"
        :color=" !allImageMode ? 'pink' : 'grey' "
        @click="(allImageMode = false , togglePhotos())"
      >My Photos</v-btn>|
      <v-btn
        text
        ref="explore"
        :disabled="loading"
        @click="(allImageMode = true , togglePhotos())"
        :color=" allImageMode ? 'pink' : 'grey' "
      >Explore</v-btn>

      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" color="pink">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <br>
    <v-card>
    <v-card-title>
     Analytics Report
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="analytics"
      :search="search"
    ></v-data-table>
  </v-card><br>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="search"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
  </div>
</template>
<script>
/* eslint-disable */
import ApexCharts from 'apexcharts'
import Modal from "@/components/Modal.vue";
import Snackbar from "@/components/Snackbar.vue";
import DeletePrompt from "@/components/DeletePrompt.vue";
import ImageViewer from "./ImageViewer.vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { isNullOrUndefined } from "util";
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
      tempImage: [],
      images: [],
      color: "red",
      menu: false,
      allImageMode: true,
      search: '',
        headers: [
          {text: 'Location', align: 'center', value: 'location'},
          { text: 'Waste Reports', align: 'center', value: 'waste' },
          { text: 'Crime Reports', align: 'center',value: 'crime' },
          { text: 'Traffic Reports', align: 'center',value: 'traffic' },
          { text: 'Accident Reports', align: 'center',value: 'accident' }
        ],
        analytics: [
          {
            location: 'Talamban',
            waste: 124,
            crime: 159,
            traffic: 30,
            accident: 24
          }
        ]
    };
  },
  components: {
    Modal,
    ImageViewer,
    Snackbar,
    DeletePrompt
  },

  computed: {
    filteredList() {
      if (!isNullOrUndefined(this.search)) {
        return this.tempImage.filter(image => {
          if (!isNullOrUndefined(image.image)) {
            return (
              image.caption.toLowerCase().includes(this.search.toLowerCase()) ||
              image.tag.toLowerCase().includes(this.search.toLowerCase()) ||
              image.createdAt
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              image.updatedAt.toLowerCase().includes(this.search.toLowerCase())
            );
          }
        });
      } else {
        return this.images;
      }
    },
    account() {
      return !isNullOrUndefined(localStorage.getItem("token"))
        ? jwt_decode(localStorage.getItem("token")).user
        : null;
    },
    isLoggedin() {
      return !isNullOrUndefined(this.account);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    keymonitor(e) {
      this.allImageMode = true;
    },
    reset() {
      this.cardTitle = "Add new Image";
      this.buttonTitle = "Upload";
      this.isUpdate = false;
      this.uploading = false;
      var modal = this.$refs.modal;
      modal.filename = "No file selected!";
      modal.file = { empty: true };
      modal.tag = "";
      modal.description = "";
      modal.color = "red";
    },
    prompt(id) {
      this.$refs.prompt.dialog = true;
      this.$refs.prompt.id = id;
    },
    remove(id) {
      this.removeImage(id);
      axios
        .post("http://localhost:4000/user/delete", { id: id })
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
    removeImage(id) {
      setTimeout(() => {
        this.images = this.images.filter(image => image._id !== id);
        this.togglePhotos();
      }, 500);
    },
    getImages() {
      var url = "http://localhost:4000/user/retrieveAll";
      var query = {
        id: this.account.id
      };
      this.sendImageRequest(url, query);
    },
    sendImageRequest(url, query) {
      this.images = [];
      this.notify("Please wait while we are retrieving your data...");
      this.loading = true;
      axios
        .post(url, query)
        .then(res => {
          this.uploading = false;
          this.loading = false;
          this.images = res.data.data;
          this.images = this.sortImages();
          if (this.images.length == 0) {
            this.notify("No images Available!");
          }
          this.allImageMode = false;
          this.updateImage();
          this.togglePhotos();
          this.$refs.notif.snackbar = false;
        })
        .catch(err => {
          if (err) {
            this.notify("Failed to load Images!");
            this.loading = false;
            setTimeout(() => {
              this.getImages();
            }, 2000);
          }
        });
    },
    sortImages() {
      this.images.sort((a, b) => (a.priority > b.priority ? -1 : 1));
      return this.images;
    },
    beforeUpdate(item) {
      this.$refs.modal.dialog = true;
      this.$refs.modal.filename = this.$refs.modal.trimString(item.imageName);
      this.$refs.modal.file = item.image;
      this.$refs.modal.description = item.caption;
      this.$refs.modal.tag = item.tag;
      this.$refs.modal.color = "pink";
      this.id = item._id;
      this.isUpdate = true;
      this.cardTitle = "Update Image";
      this.buttonTitle = "Update";
    },
    notify(msg) {
      this.$refs.notif.message(msg);
    },
    trimString(string, length) {
      return string.length > length
        ? string.substring(0, length) + "..."
        : string;
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },
    togglePhotos() {
      if (!this.allImageMode) {
        this.tempImage = this.images.filter(
          image => image.userId == this.account.id
        );
      } else {
        this.updateImage();
      }
    },
    updateImage() {
      this.tempImage = this.images;
    }
  },
  mounted() {
    if (isNullOrUndefined(this.account)) {
      this.$router.replace("/login");
    } else {
      this.getImages();
    }
  }
  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");

* {
  font-family: "Poppins", sans-serif;
}
#table {
  margin-top: 100px;
  margin-left: 250px;
  margin-right: 100px;
}
</style>
