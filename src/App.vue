<template>
  <v-app id="inspire">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >

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
        <v-list-item  v-if=" admin.account.role !== 'user'">
          <v-list-item-icon>
            <v-icon color="pink">mdi-monitor</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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

    <v-app-bar
      app
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>PicTalk | {{$route.name}}</v-toolbar-title>
    </v-app-bar>

    <v-content  transition="slide-x-transition">
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
//  v-if=" admin.account.role !== 'user'"
//         @click="$route.name!=='Dashboard'?$router.push('/analytics'):''"
import { isNull } from 'util';
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,

    admin: !isNull(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : "",
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.replace(`/account/user/login`);
    },
  },
}
</script>
<!--
<template>
    <div v-if="!$route.path.includes('account')">
      <Header />
      <v-app>
    <v-content>
          <router-view />
        </v-content>
      </v-app>
    </div>

</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      clipped: false,
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          path: '/',
          items: [],
        },
        {
          action: 'restaurant',
          title: 'Breakfast',
          path: '/breakfast',
          items: []
        },
      ]
    }
  },
  components: {
    // Header: () => import("./components/Header"),
  },
  mounted() {
  }
};
</script>
-->