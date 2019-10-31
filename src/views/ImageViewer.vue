<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600" max-height="1000">
      <v-card elevation="24" max-width="600">
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="close">x</v-btn>
        </v-card-actions>-->
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>
          <v-carousel hide-delimiters :show-arrows="!hidden">
            <v-carousel-item
              style="background:white!important"
              v-for="(image,i) in images "
              :key="i"
            >
              <v-img :src="image.image" contain aspect-ratio="1.4" class="text-right pa-2"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      images: [],
      hidden: false,
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