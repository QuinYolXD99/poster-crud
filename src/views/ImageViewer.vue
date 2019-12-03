<template>
  <viewer
    :images="$parent.filteredList.map(image=>image.image)"
    @inited="$parent.inited"
    class="viewer"
    ref="viewer"
  >
    <template slot-scope="scope">
      <img
        v-for="(src , i) in scope.images"
        :src="src"
        :key="i+'src'"
        :ref="'img'"
        hidden
      />
      <v-item-group multiple>
        <v-row>
          <v-img
            height="300"
            aspect-ratio="1.4"
            src="@/assets/placeholder.png"
            v-if="!$parent.filteredList.length"
            contain
          ></v-img>
          <v-col
            v-for="(image , i) in scope.images"
            :key="i"
            cols="12"
            md="12"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                max-width="344"
                class="mx-auto"
              >
                <v-list-item>
                  <v-list-item-avatar color="grey"></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                    <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                  height="194"
                ></v-img>

                <v-card-text>
                  Visit ten places on our planet that are undergoing the biggest changes today.
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Read
                  </v-btn>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Bookmark
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- <v-card hover>
                <v-card-text>
                  <v-item>
                    <v-img
                      :src="image"
                      @click="$refs.img[i].click()"
                      cover
                      height="300"
                      aspect-ratio="1.4"
                      class="text-right pa-2"
                    ></v-img>
                  </v-item>
                </v-card-text>
                <v-expand-transition>
                  <div v-show="active">
                    <v-divider></v-divider>
                    <small>
                      <v-card-text class="font-italic caption">
                        Filename : "{{$parent.filteredList[i].imageName}}"
                        <br />
                        Description : "{{$parent.filteredList[i].caption}}"
                        <br />
                        Tag : "{{$parent.filteredList[i].tag}}"
                        <br />
                        Date created : "{{$parent.filteredList[i].createdAt}}"
                        <br />
                        Last Modified : "{{$parent.filteredList[i].updatedAt}}"
                        <br />Posted by
                        <strong>{{$parent.filteredList[i].username}}</strong>
                        
                      </v-card-text>
                    </small>
                  </div>
                </v-expand-transition>
                <v-divider></v-divider>
                <v-card-actions draggable>
                  <v-card-title
                    class="body-2 font-weight-bold text-capitalize"
                  >#{{$parent.filteredList[i].tag}}</v-card-title>
                  <v-btn icon @click="toggle">
                    <v-icon>{{ active ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn small icon>
                    <v-icon color="pink" v-on:click="download($parent.filteredList[i])">mdi-cloud-download</v-icon>
                  </v-btn>
                  <div v-if="!$parent.allImageMode">
                      <v-btn small icon>
                        <v-icon
                          color="pink"
                          :disabled="$parent.loading"
                          v-on:click="$parent.beforeUpdate($parent.filteredList[i])"
                        >mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn small icon v-on:click="$parent.prompt($parent.filteredList[i]._id)">
                        <v-icon color="pink">mdi-delete</v-icon>
                      </v-btn>
                    </div>
                </v-card-actions>
                <v-footer dark padless>
                  <v-card class="flex" flat tile></v-card>
                </v-footer>
              </v-card> -->
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </template>
    <DeletePrompt ref="prompt" />
  </viewer>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      images: [],
      hidden: false,
      show: false,
      title: ""
    };
  },
  methods: {
    watch(img) {
      this.images = [img];
    },
    close() {
      this.dialog = false;
    },
    download(image) {
      const linkSource = image.image;
      const downloadLink = document.createElement("a");
      const fileName = image.imageName;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  },
  watch: {
    slideshow: val => {
      if (val) {
        this.current_image = this.images;
      }
    }
  }
};
</script>