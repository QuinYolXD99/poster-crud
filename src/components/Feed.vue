<template>
  <v-card
    max-width="80%"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          v-if="!details.user.profile.avatar"
          color="indigo"
          size="48"
        >
          <span class="white--text headline">{{details.user.profile.username[0]}}</span>
        </v-avatar>
        <v-img
          v-else
          class="elevation-6"
          :src="details.user.profile.avatar"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{details.title}}</v-list-item-title>
        <v-list-item-subtitle>by {{details.user.profile.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="details.images[0]"
      height="auto"
    ></v-img>

    <v-card-text class="title black--text">
      Description : {{details.description}}
      <v-list-item-subtitle>Category : {{details.category}}</v-list-item-subtitle>
      <v-list-item-subtitle>Location : {{details.location}}</v-list-item-subtitle>
      <v-list-item-subtitle>Date Posted : {{details.createdAt}}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="details.updatedAt">Last Updated : {{ details.post.updatedAt}}</v-list-item-subtitle>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="details.user._id == this.user.profile._id">
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
