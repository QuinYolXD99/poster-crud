<template>
  <v-app-bar
    elevation='11'
    fixed
    hide-on-scroll
  >
    <v-toolbar-title @click="admin.account.role !== 'user'?$router.push('/feeds'):''">PicTalk | {{$route.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="$route.path!=='/feeds' && admin.account.role !== 'user'"
        text
        @click="$router.push('/feeds')"
      >Reports</v-btn>
      <v-btn
        v-if="$route.path!=='/profile'"
        text
        @click="$router.push('/profile')"
      >Profile</v-btn>
      <v-btn
        text
        v-if=" admin.account.role !== 'user'"
        @click="$route.name!=='Dashboard'?$router.push('/analytics'):''"
      >Dashboard</v-btn>
      <v-btn
        text
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import { isNull } from 'util';
export default {
  name: 'Header',
  components: {
  },
  data() {
    return {
      admin: !isNull(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : "",
    }
  },
  methods: {
    logout() {
      this.$router.replace(`/account/user/login`);
      localStorage.removeItem("token");
    },
  },

}
</script>

