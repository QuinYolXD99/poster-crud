<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" :timeout="$parent.timeout">
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
      timeout: 1000
    };
  },
  methods: {
    message(msg) {
      this.text = typeof msg !== "string" ? msg.message : msg;
      this.snackbar = true;
    }
  }
};
</script>
