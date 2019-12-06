<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 1500
    };
  },
  methods: {
    message(msg) {
      this.text = msg;
      this.snackbar = true;
    }
  }
};
</script>
