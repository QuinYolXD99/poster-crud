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
        <v-btn text @click="$router.push('/')">Analytics</v-btn>
        <v-btn text @click="logout">
          <v-icon>mdi-logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text class="px-10">
      <br />
      <v-card max-width="600" class="mx-auto">
        <input type="file" ref="avatar" hidden />
        <v-img :src="admin.account.avatar" height="300px" dark contain>
          <v-overlay :absolute="true" :value="editmode">
            <v-btn color="success"  @click="$refs.avatar.click()" >Update Avatar</v-btn>
          </v-overlay>
        </v-img>
        <v-divider></v-divider>
        <v-list dense class="px-10">
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
                v-model="admin.account.firstname"
              ></v-text-field>&nbsp;
              <v-text-field
                label="lastname"
                dense
                outlined
                v-if="editmode"
                v-model="admin.account.lastname"
              ></v-text-field>
              <v-list-item-title
                v-if="!editmode"
                class="text-capitalize"
              >{{`${admin.account.firstname} ${admin.account.lastname}`}}</v-list-item-title>
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
                v-model="admin.account.username"
              ></v-text-field>
              <v-list-item-title v-if="!editmode">{{admin.account.username}}</v-list-item-title>
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
                v-model="admin.account.contact"
              ></v-text-field>
              <v-list-item-title v-if="!editmode">{{admin.account.contact}}</v-list-item-title>
              <v-list-item-subtitle v-if="!editmode">Contact</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="editmode">
            <v-list-item-icon>
              <v-icon color="pink">mdi-key-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field dense label="new password" outlined class="px-2" v-model="admin.account.new_password"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{admin.account.joined}}</v-list-item-title>
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
              <v-btn text color="pink" @click="update" v-if="editmode" outlined>
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
      admin: jwt_decode(localStorage.getItem("token")).admin
    };
  },
  methods: {
   handlePreview() {
      this.admin.account.avatar = this.$refs.myFiles.files[0];
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/account/Login");
    },
    update() {
      this.editmode = false;
      var data = new FormData();
      data.append("avatar",this.admin.account.avatar);
      data.append("credentials",this.admin);
      this.$axios
        .post(this.$_CONFIG.adminRequestURL + "update", data)
        .then(res => {
          this.editmode = false;
          this.admin = jwt_decode(res.data.token).admin;
          localStorage.setItem("token", res.data.token);
        })
        .catch(err => {
          console.log(err);
          alert("error");
        });
    }
  },
  mounted() {
    this.admin = jwt_decode(localStorage.getItem("token")).admin;
  }
};
</script>
