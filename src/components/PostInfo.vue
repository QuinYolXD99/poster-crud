<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
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
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Post Information
        </v-card-title>

        <v-card-text>
          <v-row
            align="center"
            justify="center"
          >
            <v-img
              src="https://picsum.photos/id/11/500/300"
              lazy-src="https://picsum.photos/id/11/10/6"
              aspect-ratio="1"
              class="grey lighten-2 ma-2"
              max-width="500"
              max-height="300"
            ></v-img>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
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