<template>
  <v-app>
    <div v-if="!$route.path.includes('account')">
      <Header />
    </div>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Header: () => import("./components/Header")
  },
  mounted() {
  }
};
</script>
