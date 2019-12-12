<template>
  <v-app id="inspire">
    <v-navigation-drawer  temporary v-model="drawer" v-if="$route.name !=='Login'" width="300" app id>
      <v-img
        :aspect-ratio="16/9"
        height="250"
        :lazy-src="require('@/assets/bg.jpg')"
        :src="`https://source.unsplash.com/user/davidkovalenkoo`"
        gradient="to top right,  rgba(35, 7, 77, 0.7),
      rgba(202, 80, 47, 0.4)"
      >
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="100">
                  <v-img  :src="admin.account.avatar"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link two-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="title text-capitalize white--text"
                  >{{admin.account.firstname + " "+ admin.account.lastname}}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle-2 white--text">{{admin.account.username}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-img>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-if=" admin.account.role !== 'user'"
          @click="$route.name!=='Dashboard'?$router.push('/analytics'):''"
        >
          <v-list-item-icon>
            <v-icon color="pink">mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- profile -->
        <v-list-item @click="$route.path !== '/profile'?$router.push('/profile'):''">
          <v-list-item-icon>
            <v-icon color="pink">mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- news -->
        <v-list-item @click="$route.path !== '/news'?$router.push('/news'):''">
          <v-list-item-icon>
            <v-icon color="pink">mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>News</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- reports -->
        <v-list-item @click="$route.path !== '/feeds'?$router.push('/feeds'):''" v-if=" admin.account.role !== 'user'">
          <v-list-item-icon>
            <v-icon color="pink">mdi-monitor</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <br>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Actions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- logout -->
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon color="pink">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll v-if="$route.name !=='Login'" >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>PicTalk | {{$route.name}}</v-toolbar-title>
    </v-app-bar>

    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
  </v-app>
</template>
<style scoped>
#sidebar {
  position: relative;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(
      to bottom,
      rgba(35, 7, 77, 0.7),
      rgba(202, 80, 47, 0.4)
    ),
    url("https://source.unsplash.com/user/davidkovalenkoo");
  background-size: cover !important  ;
  background-position: center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  overflow: auto;
}
</style>
<script>
import { isNull } from "util";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    admin: !isNull(localStorage.getItem("token"))
      ? JSON.parse(localStorage.getItem("token"))
      : ""
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace(`/account/user/login`);
    }
  }
};
</script>
