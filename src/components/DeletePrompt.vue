<template>
  <v-row>
    <v-dialog v-model="dialog" justify="center" persistent max-width="250">
      <v-card>
        <v-card-title class="headling">
          <v-icon x-large color="red">mdi-alert-octagon</v-icon>Confirm Delete ?
        </v-card-title>
        <v-card-text>You cannot undo this action.</v-card-text>
        <v-card-actions class="justify-center">
         
            <div class="my-2" @click="(dialog = false  , id = '')">
              <v-btn text small color="pink">
                <v-icon left>mdi-close</v-icon>cancel
              </v-btn>
            </div>
            <div class="my-2" @click="(dialog = false , $parent.remove(id))">
              <v-btn text small color="pink">
                <v-icon left>mdi-check</v-icon>Delete
              </v-btn>
            </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      id: ""
    };
  }
};
</script>2