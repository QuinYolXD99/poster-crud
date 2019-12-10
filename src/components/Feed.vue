<template>
  <div>
    <v-card
      max-width="75%"
      class="mx-auto"
      raised
    >
      <v-list-item>
        <a>
          <v-list-item-avatar @click.stop="dialog = true">
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
        </a>
        <v-list-item-content>
          <v-list-item-title class="headline">{{details.title}}</v-list-item-title>
          <v-list-item-subtitle>posted by {{details.user.account.username}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <a
        :href="details.images[0]"
        target="blank"
      >
        <v-img
          :src="details.images[0]"
          height="auto"
        ></v-img>
      </a>
      <v-card-text class="title black--text">
        Description : {{details.description}}
        <v-list-item-subtitle>Category : {{details.category}}</v-list-item-subtitle>
        <v-list-item-subtitle>Location : {{details.location}}</v-list-item-subtitle>
        <v-list-item-subtitle>Date Posted : {{`${details.createdAt.month}/${details.createdAt.date}/${details.createdAt.year}`}}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="details.updatedAt">Last Updated : {{`${details.updatedAt.month}/${details.updatedAt.date}/${details.updatedAt.year}`}}</v-list-item-subtitle>
      </v-card-text>

    </v-card>
    <v-row justify="center">

      <v-card v-show="dialog">

        <v-card-text>
          <v-dialog
            v-model="dialog"
            max-width="400"
          >
            <ProfileCard :admin="details.user" />
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
    user: Object
  },
  components: {
    ProfileCard: () => import("./ProfileCard")
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deletePost(id) {
      this.$axios
        .get("http://localhost:4001/user/deletePost/" + id)
        .then(res => {
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
};
</script>
