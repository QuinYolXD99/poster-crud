<template>
  <v-card
    max-width="80%"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey darken-3">
        <v-img
          class="elevation-6"
          :src="details.user.avatar"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{details.title}}</v-list-item-title>
        <v-list-item-subtitle>{{details.user.username}}</v-list-item-subtitle>
        <v-list-item-subtitle>Date Posted : {{details.post.createdAt}}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="details.post.updatedAt">Last Updated : {{ details.post.updatedAt}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="details.post.images[0]"
      height="auto"
    ></v-img>

    <v-card-text class="title black--text">
      Description : {{details.post.description}}
      <p class="subtitle-1 black--text">
        Location : {{details.post.description}}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    details: Object
  }
}
</script>
