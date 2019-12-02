<template>
  <v-card
    max-width="80%"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          v-if="!details.post.user.profile.avatar"
          color="indigo"
          size="48"
        >
          <span class="white--text headline">{{details.post.user.profile.username[0]}}</span>
        </v-avatar>
        <v-img
          v-else
          class="elevation-6"
          :src="details.post.user.profile.avatar"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{details.post.title}}</v-list-item-title>
        <v-list-item-subtitle>by {{details.post.user.profile.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="details.post.images[0]"
      height="auto"
    ></v-img>

    <v-card-text class="title black--text">
      Description : {{details.post.description}}
      <v-list-item-subtitle>Category : {{details.post.category}}</v-list-item-subtitle>
      <v-list-item-subtitle>Location : {{details.post.location}}</v-list-item-subtitle>
      <v-list-item-subtitle>Date Posted : {{details.post.createdAt}}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="details.post.updatedAt">Last Updated : {{ details.post.updatedAt}}</v-list-item-subtitle>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="details.post.user._id == this.user.profile._id">
      <v-spacer></v-spacer>
      <v-btn
        small
        text
        class="px-5"
      >
        <v-icon color="pink">mdi-pencil</v-icon>Update
      </v-btn>
      <v-btn
        small
        icon
       
      >
        <v-icon color="pink">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    details: Object,
  },
  data() {
    return {
      user: this.$jwt_decode(this.$route.params.token).user
    }
  },
  mounted() {
    this.user = this.$jwt_decode(this.$route.params.token).user;    
    
  }
}
</script>
