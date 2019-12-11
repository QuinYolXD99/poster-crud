<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline black--text pink lighten-2"><v-icon large color="black" class="ma-2">mdi-account-remove</v-icon>  Delete Account?</v-card-title>
        <br>
        <v-card-text class="black--text">Your account will be permanently deleted! Retype the Captcha to proceed.</v-card-text>

       

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            outlined
            @click="deleteProfile"
          >yes</v-btn>

          <v-btn
            color="green darken-1"
            outlined
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
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteProfile() {
      // var url = this.$_CONFIG.adminRequestURL;
      this.$axios
        .get(this.$_CONFIG.userRequestURL + "deleteProfile/" + this.id)
        .then(res => {
          this.logout();
        })
        .catch(err => {
          console.log(err.response);
          this.$emit("notify", "Error");
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.replace(`/account/user/Login`);
    }
  },

};
</script>

