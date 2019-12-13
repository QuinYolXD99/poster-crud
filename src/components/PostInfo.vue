<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="550"
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
              :src="!post.images[0]?placeholder:post.images[0]"
              aspect-ratio="1"
              contain
              class="grey lighten-2 ma-2"
              max-width="500"
              max-height="300"
            ></v-img>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-list disabled>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text="'mdi-message'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`Title : ${post.title}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text="'mdi-library-books'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`Description : ${post.description}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text="'mdi-filter'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`Category : ${post.category}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text=" 'mdi-map-marker'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`Location : ${post.location}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-text="'mdi-clock'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`Date Posted : ${post.createdAt.month}/${post.createdAt.date}/${post.createdAt.year}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <DeletePrompt
            :id="post._id"
            @removed="removedHandler"
          />
          <v-btn
            color="secondary"
            outlined
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    post: Object
  },
  components: {
    DeletePrompt: () => import("./DeletePrompt")
  },
  data() {
    return {
      placeholder: require('@/assets/placeholder.png'),
      dialog: false,
    }
  },
  methods: {
    removedHandler(id) {
      if (id) {
        this.$emit('removed', true)
      } else {
        this.$emit('removed', false)
      }
    }
  }
}
</script>
