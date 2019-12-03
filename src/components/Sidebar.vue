<template >
<div>
    <br><br><br><br><br>
          <v-card max-width="500" class="mx-auto" id="crud">
              <br><br><br><br><br><br>
            <v-list>
              <v-list-item @click="updateProfile()">
                <v-list-item-icon>
                  <v-icon>mdi-account-badge-horizontal</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Personal Information</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list dense>
              <v-list-item @click="profile()">
                <v-list-item-icon>
                  <v-icon>mdi-file-lock-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Terms and Privacy</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list dense>
              <v-list-item @click="profile()">
                <v-list-item-icon>
                  <v-icon>mdi-account-question</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Help</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
</div>
        </template>

<script>
export default {
    methods: {
      updateProfile() {
        this.$router.push("/UpdateProfile");

      }
    }
}
</script>
