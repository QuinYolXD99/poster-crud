<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item
        v-for="log in logs"
        :key="log._id"
      >
        <v-list-item-content>
          <v-list-item-title v-text="log.title"></v-list-item-title>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
        </v-list-item-content>
        <Info :post="log" />
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    logs: Array
  },
  data: () => ({

  }),
  components: {
    Info: () => import("./PostInfo")
  }
}
</script>