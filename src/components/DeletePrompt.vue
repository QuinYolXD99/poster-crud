<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="pink"
          outlined
          class="ma-2"
          text
          v-on="on"
        >
          Delete
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline red lighten-2"
          primary-title
        >
          Remove Activity
        </v-card-title>

        <v-card-text class="px-5 black--text">
          <br><br>
          You are going to remove this activity . Do you want to continue?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="removeActivity"
          >yes</v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    removeActivity() {
      this.$axios.get(`http://localhost:4001/user/deletePost/${this.id}`)
        .then(res => {
          this.$emit('removed', this.id)
        }).catch(err => {
          this.$emit('removed', false)
        })
    }
  }

}
</script>