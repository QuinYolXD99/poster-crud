<template>
  <v-card
    height="100%"
    color="transparent"
    style="background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://source.unsplash.com/user/cinquantesix');background-size:cover;background-repeat:no-repeat;background-attachment:fixed"
  >
    <v-toolbar>
      <v-toolbar-title>PicTalk</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text v-if="admin.account.admin" @click="$router.push('/')">Analytics</v-btn>
        <v-btn text @click="logout">
          <v-icon>mdi-logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <br />
      <v-card max-width="600" class="mx-auto">
        <v-img :src="user.account.avatar" height="300px" dark contain>
          <v-row class="fill-height">
            <v-card-title>
              <v-btn dark icon>
                <v-icon id="icons">mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-4">
                <v-icon id="icons">mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
          </v-row>
        </v-img>
        <v-divider></v-divider>
        <v-list two-line dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-text-field
                dense
                label="firstname"
                v-if="editmode"
                outlined
                class="px-2"
                v-model="user.account.firstname"
              ></v-text-field>&nbsp;
              <v-text-field
                label="lastname"
                dense
                outlined
                v-if="editmode"
                v-model="user.account.lastname"
              ></v-text-field>
              <v-list-item-title
                v-if="!editmode"
                class="text-capitalize"
              >{{`${user.account.firstname} ${user.account.lastname}`}}</v-list-item-title>
              <v-list-item-subtitle v-if="!editmode">Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                dense
                label="username"
                v-if="editmode"
                outlined
                class="px-2"
                v-model="user.account.username"
              ></v-text-field>
              <v-list-item-title v-if="!editmode">{{user.account.username}}</v-list-item-title>
              <v-list-item-subtitle v-if="!editmode">Username</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                dense
                label="contact"
                v-if="editmode"
                outlined
                class="px-2"
                v-model="user.account.contact"
              ></v-text-field>
              <v-list-item-title v-if="!editmode">{{user.account.contact}}</v-list-item-title>
              <v-list-item-subtitle v-if="!editmode">Contact</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-calendar</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{user.account.joined}}</v-list-item-title>
              <v-list-item-subtitle>joined</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item dense>
            <v-list-item-content draggable>
              <v-row justify="center" align="center">
                <v-col justify-self="center" align-self="center">
                  <v-btn
                    text
                    color="pink"
                    v-if="!editmode"
                    @click="editmode = !editmode"
                    width="50%"
                  >
                    <v-icon>mdi-pencil</v-icon>Update
                  </v-btn>
                  <v-btn text color="pink" v-if="!editmode" width="50%">
                    <v-icon>mdi-delete-empty</v-icon>delete
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn text color="pink" @click="editmode = false" v-if="editmode" outlined>
                <v-icon>mdi-check</v-icon>save
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<style scoped>
</style>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "container",
  data() {
    return {
      editmode: false,
      user: jwt_decode(localStorage.getItem("token")).user
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/account/Login");
    },
    update() {
      this.$axios
        .post(this.$_CONFIG.adminRequestURL + "update", user)
        .then(res => {
          this.user = jwt_decode(res.data.token).user;
          localStorage.setItem("token" ,  res.data.token)

        })
        .catch(err => {
          alert("error");
        });
    }
  },
  mounted() {
    this.user = jwt_decode(localStorage.getItem("token")).user;
  }
};
</script>