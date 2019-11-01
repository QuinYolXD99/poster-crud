<template>
  <viewer
    :images="$parent.filteredList.map(image=>image.image)"
    @inited="$parent.inited"
    class="viewer"
    ref="viewer"
  >
    <template slot-scope="scope">
      <img v-for="(src , i) in scope.images" :src="src" :key="i+'src'" :ref="'img'" hidden>
      <v-item-group  multiple>
        <v-row>
          <v-img
            height="300"
            aspect-ratio="1.4"
            src="@/assets/placeholder.png"
            v-if="!$parent.filteredList.length"
            contain
          ></v-img>
          <v-col v-for="(image , i) in scope.images" :key="i" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card hover>
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
                        Description : "{{$parent.filteredList[i].caption}}"
                        <br>
                        Date created : "{{$parent.filteredList[i].createdAt}}"
                        <br>
                        Last Modified : "{{$parent.filteredList[i].updatedAt}}"
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
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon
                      :disabled="$parent.loading"
                      :color="$parent.filteredList[i].priority?'pink':'grey'"
                      v-on:click="($parent.filteredList[i].priority = !$parent.filteredList[i].priority,$parent.like($parent.filteredList[i]))"
                    >mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon
                      :disabled="$parent.loading"
                      v-on:click="$parent.beforeUpdate($parent.filteredList[i])"
                    >mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon v-on:click="$parent.prompt($parent.filteredList[i]._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-footer dark padless>
                  <v-card class="flex" flat tile></v-card>
                </v-footer>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
      <!-- <v-item-group multiple>
        <v-row>
          <v-img
            height="300"
            aspect-ratio="1.4"
            src="@/assets/placeholder.png"
            v-if="!$parent.filteredList.length"
            contain
          ></v-img>
          <v-col v-for="(image , i) in scope.images" :key="i" cols="12" md="4">
            <v-card hover>
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
              <v-divider></v-divider>

              <v-card-actions draggable>
                <v-card-title
                  class="body-2 font-weight-bold text-capitalize"
                >#{{$parent.filteredList[i].tag}}</v-card-title>
               
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon
                    :disabled="$parent.loading"
                    :color="$parent.filteredList[i].priority?'pink':'grey'"
                    v-on:click="($parent.filteredList[i].priority = !$parent.filteredList[i].priority,$parent.like($parent.filteredList[i]))"
                  >mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon
                    :disabled="$parent.loading"
                    v-on:click="$parent.beforeUpdate($parent.filteredList[i])"
                  >mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon v-on:click="$parent.prompt($parent.filteredList[i]._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
              <v-footer dark padless>
                <v-card class="flex" flat tile></v-card>
              </v-footer>
            </v-card>
          </v-col>
          {{scope.options}}
        </v-row>
      </v-item-group>-->
    </template>
    <DeletePrompt ref="prompt"/>
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