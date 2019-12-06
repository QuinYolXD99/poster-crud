<template>
  <v-card
    max-width="80%"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          v-if="!details.user.account.avatar"
          color="indigo"
          size="48"
        >
          <span class="white--text headline">{{details.user.account.username[0]}}</span>
        </v-avatar>
        <v-img
          v-else
          class="elevation-6"
          :src="details.user.account.avatar"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{details.title}}</v-list-item-title>
        <v-list-item-subtitle>posted by {{details.user.account.username}}</v-list-item-subtitle>
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
      <v-list-item-subtitle>Date Posted : {{`${details.createdAt.month}/${details.createdAt.date}/${details.createdAt.year}`}}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="details.updatedAt">Last Updated : {{`${details.updatedAt.month}/${details.updatedAt.date}/${details.updatedAt.year}`}}</v-list-item-subtitle>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="details.user.account._id == this.user.account._id">
      <v-spacer></v-spacer>
      <!-- <UpdateModal :post="details"/> -->

      <v-btn
        small
        icon
        @click="deletePost(details._id)"
      >
        <v-icon color="pink">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// import UpdateModal from "./UpdateModal";
export default {
  props: {
    details: Object,
    user: Object
  },
  components: {
    // UpdateModal
  },
  data() {
    return {
    };
  },
  methods: {
    deletePost(id) {
      this.$axios
        .get("http://localhost:4001/user/deletePost/" + id)
        .then(res => {
          console.log(res);
          this.$emit("reload", true);
        })
        .catch(err => {
          this.$emit("reload", err);
        });
    },
    reloadUpdated() {
      this.$emit("reload", true);
    }
  },
  mounted() {
    console.log(this.user);
    console.log(this.details);
  }
};
</script>
