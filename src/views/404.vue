<template>
  <v-container id="body" fill-height style="height: calc(100vh - 58px);" fluid>
    <v-layout align-center>
      <v-flex text-center>
        <h1 class="display-2 pink--text">Whoops, 404</h1>
        <p class="pink--text accent-1">The page you were looking for does not exist</p>
        <v-btn to="/profile" outlined color="pink accent-1">Get me out of here!</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
#body {
  position: relative;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://source.unsplash.com/user/andyjh07");
  background-size: cover !important  ;
  background-position: top center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  overflow: auto;
}
</style>
<script>
export default {
  name: "FourOhFour",
  props: {
    lang: {
      type: String,
      default: "en"
    }
  }
};
</script>