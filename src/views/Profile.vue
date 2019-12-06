<template>
  <v-card
    height="100%"
    color="transparent"
    style="background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://source.unsplash.com/user/davidkovalenkoo');background-size:cover;background-repeat:no-repeat;background-attachment:fixed"
  >
    <v-toolbar>
      <v-toolbar-title @click="$router.push('/user')">PicTalk | Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text v-if="admin.account.role == 'admin'" @click="$router.push('/')">Analytics</v-btn>
        <v-btn text @click="logout">
          <v-icon>mdi-logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <br />
      <v-card max-width="600" class="mx-auto">
        <input type="file" ref="avatar" @change="handlePreview" hidden />
        <v-img :src="`${avatar}`" cover height="400px" dark>
          <v-overlay :absolute="true" :value="editmode">
            <v-btn color="pink" @click="$refs.avatar.click()">Update Avatar</v-btn>
          </v-overlay>
        </v-img>
        <v-divider></v-divider>
        <v-list dense class="px-10">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="pink">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <br />
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
              <v-text-field
                dense
                label="new password"
                outlined
                class="px-2"
                v-model="admin.account.new_password"
              ></v-text-field>
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
              <v-row v-if="!editmode" justify="center" align="center">
                <v-col justify-self="center" align-self="center">
                  <v-btn outlined text color="pink" @click="editmode = !editmode" width="50%">
                    <v-icon>mdi-pencil</v-icon>Update
                  </v-btn>
                  <v-btn text outlined @click="dialog=true" color="pink" width="50%">
                    <v-icon>mdi-delete-empty</v-icon>delete
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="editmode">
                <v-col justify-self="center" align-self="center">
                  <v-btn text color="pink" width="50%" @click="update" outlined>
                    <v-icon>mdi-check</v-icon>save
                  </v-btn>
                  <v-btn text color="pink" width="50%" @click="editmode = false  " outlined>
                    <v-icon>mdi-wrong</v-icon>cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card-text>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Delete Account?</v-card-title>

          <v-card-text>Your account will be permanently deleted! Do you want to proceed ?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" text @click="deleteProfile()">yes</v-btn>

            <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="notif" :timeout="2000">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>
<style scoped>
</style>

<script>
export default {
  name: "container",
  data() {
    return {
      editmode: false,
      dialog: false,
      text: "",
      notif: false,
      admin: this.$jwt_decode(localStorage.getItem("token")).admin,
      avatar: null
    };
  },
  methods: {
    handlePreview() {
      this.admin.account.avatar = this.$refs.avatar.files[0];
      this.encode(this.admin.account.avatar).then(res => {
        this.avatar = res;
      });
    },

    encode: async file => {
      let result_base64 = await new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.onload = e => {
          console.log(e);
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      });
      return result_base64;
    },
    logout() {
      this.$router.push("/user/account/login");
      localStorage.removeItem("token");
    },
    update() {
      var url = this.$_CONFIG.adminRequestURL;
      if (this.admin.account.role == "user") {
        url = this.$_CONFIG.userRequestURL;
      }
      this.editmode = false;
      var data = new FormData();
      data.append("avatar", this.admin.account.avatar);
      data.append("credentials", JSON.stringify(this.admin));
      this.$axios
        .post(url + "update", data)
        .then(res => {
          this.editmode = false;
          this.admin = this.$jwt_decode(res.data.token).admin;
          localStorage.setItem("token", res.data.token);
          this.text = "Update successful!";
          this.notif = true;
        })
        .catch(err => {
          console.log(err);
          this.text = "Update failed!";
          this.notif = true;
        });
    },
    deleteProfile() {
      var url = this.$_CONFIG.adminRequestURL;
      if (this.admin.account.role == "user") {
        url = this.$_CONFIG.userRequestURL;
      }
      console.log(this.admin._id);
      this.$axios
        .post(url + "deleteProfile", this.admin._id)
        .then(() => {
          this.logout();
          this.text = "Your account has been deleted successfully!";
          this.notif = true;
        })
        .catch(err => {
          console.log(err.response);
          this.text = "Failed to delete your account!";
          this.notif = true;
        });
    }
  },
  mounted() {
    this.admin = this.$jwt_decode(localStorage.getItem("token")).admin;
    this.avatar = this.admin.account.avatar;
  }
};
</script>
