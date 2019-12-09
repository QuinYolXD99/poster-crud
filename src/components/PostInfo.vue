<template>
  <div class="text-center">
   <v-dialog v-model="dialog" width="550">
        <template v-slot:activator="{ on }">

        <v-btn
          color="secondary"
          dark
          icon
          small
          v-on="on"
        >
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Post Information
          </v-card-title>

          <v-card-text>
            <v-row align="center" justify="center">
              <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2 ma-2" max-width="500" max-height="300"></v-img>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
  <v-list disabled>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
           <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" outlined text @click="dialog = false">
             Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
