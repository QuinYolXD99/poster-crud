<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete Account?</v-card-title>

        <v-card-text>Your account will be permanently deleted! Do you want to proceed ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="deleteProfile"
          >yes</v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    id: String
  },
  data(){
    return{
      dialog:false
    }
  },
  methods: {
    deleteProfile() {
      // var url = this.$_CONFIG.adminRequestURL;
      this.$axios
        .get("http://localhost:4001/admin/deleteProfile/" + this.id)
        .then(() => {
          this.logout();
        })
        .catch(err => {
          console.log(err.response);
          this.$emit("notify", "Error")
        });
    }
  }
}
</script>

