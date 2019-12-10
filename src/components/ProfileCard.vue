<template>

  <v-card
    max-width="400"
    raised
    class="mx-auto"
    :elevation="elevation"
  >
    <input
      type="file"
      ref="avatar"
      @change="handlePreview"
      hidden
    />
    <v-img
      :src="`https://source.unsplash.com/user/davidkovalenkoo`"
      :lazy-src="require('@/assets/bg.jpg')"
      cover
      height="300px"
      dark
      gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
    >
      <v-row
        align="center"
        justify="center"
      >

        <v-avatar
          size="150"
          style="margin-top : 20%"
        >
          <img
            :src="`${avatar}`"
            alt="dp"
          />
        </v-avatar>
      </v-row>

      <v-overlay
        :absolute="true"
        :value="editmode"
      >
        <v-btn
          color="pink"
          v-if="editmode"
          @click="$refs.avatar.click()"
        >Update Avatar</v-btn>
      </v-overlay>
    </v-img>
    <v-divider></v-divider>
    <v-list
      dense
      class="px-8"
    >
      <v-list-item>
        <v-list-item-icon v-if="!editmode">
          <v-icon color="pink">mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <br />
          <v-row v-if="editmode">
            <v-col>
              <v-text-field
                dense
                label="firstname"
                color="pink"
                prepend-icon="mdi-account"
                v-model="user.account.firstname"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="lastname"
                dense
                color="pink"
                v-model="user.account.lastname"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-list-item-title
            v-if="!editmode"
            class="text-capitalize"
          >{{`${user.account.firstname} ${user.account.lastname}`}}</v-list-item-title>
          <v-list-item-subtitle v-if="!editmode">Name</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon v-if="!editmode">
          <v-icon color="pink">mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-text-field
            dense
            label="username"
            v-if="editmode"
            prepend-icon="mdi-account-circle"
            class="px-2"
            v-model="user.account.username"
          ></v-text-field>
          <v-list-item-title v-if="!editmode">{{user.account.username}}</v-list-item-title>
          <v-list-item-subtitle v-if="!editmode">Username</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon v-if="!editmode">
          <v-icon color="pink">mdi-phone</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-text-field
            dense
            label="contact"
            v-if="editmode"
            prepend-icon="mdi-phone"
            v-mask="mask"
            class="px-2"
            v-model="user.account.contact"
          ></v-text-field>
          <v-list-item-title v-if="!editmode">{{user.account.contact}}</v-list-item-title>
          <v-list-item-subtitle v-if="!editmode">Contact</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="editmode">
        <v-list-item-icon v-if="!editmode">
          <v-icon color="pink">mdi-key-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-text-field
            dense
            prepend-icon="mdi-key-variant"
            label="new password"
            type="password"
            class="px-2"
            v-model="user.account.new_password"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon v-if="!editmode">
          <v-icon color="pink">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{user.account.joined}}</v-list-item-title>
          <v-list-item-subtitle>joined</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="$route.path!=='/feeds'"></v-divider>
      <Delete
        v-if="$route.path!=='/feeds'"
        ref="prompt"
        :id="user._id"
      />
      <v-list-item dense>
        <v-list-item-content draggable>
          <v-row
            v-if="!editmode"
            justify="center"
            align="center"
          >
            <v-col
              justify-self="center"
              align-self="center"
            >
              <v-btn
                text
                color="pink"
                outlined
                @click="editmode = !editmode"
                width="49%"
              >
                <v-icon>mdi-pencil</v-icon>Update
              </v-btn>&nbsp;
              <v-btn
                text
                v-if="user.account.role=='user'"
                outlined
                @click="$refs.prompt.dialog = true"
                color="pink"
                width="49%"
              >
                <v-icon>mdi-delete-empty</v-icon>Delete
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="editmode">
            <v-col
              justify-self="center"
              align-self="center"
            >
              <v-btn
                color="pink"
                width="48%"
                outlined
                @click="update"
              >
                <v-icon>mdi-check</v-icon>save
              </v-btn>
              <v-btn
                color="pink"
                width="48%"
                outlined
                class="ma-1"
                @click="editmode = false  "
              >
                <v-icon>mdi-wrong</v-icon>cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>
<script>
import { mask } from "vue-the-mask";
export default {
  props: {
    admin: Object,
    elevation: Number
  },
  data() {
    return {
      editmode: false,
      mask: "+639##-###-####",
      avatar: null,
      user: this.admin
    }
  },
  components: {
    Delete: () => import("./DeleteAccount"),
  },
  directives: {
    mask
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
      if (this.user.account.new_password) {
        if (this.user.account.new_password.length < 8) {
          this.$emit('notify', "Password too weak")
        } else {
          this.sendRequest();
        }
      } else {
        this.sendRequest();
      }

    },
    sendRequest() {
      var url = this.$_CONFIG.adminRequestURL;
      this.editmode = false;
      var data = new FormData();
      data.append("avatar", this.admin.account.avatar);
      data.append("credentials", JSON.stringify(this.admin));
      this.$axios
        .post(url + "update", data)
        .then(res => {
          this.editmode = false;
          this.user = res.data.token;
          localStorage.setItem("token", JSON.stringify(res.data.token));
          this.$emit('notify', "Update successful!")
        })
        .catch(err => {
          console.log(err);
          this.$emit('notify', "Update Failed!")
        });
    }
  },
  mounted() {
    this.avatar = this.admin.account.avatar;
  }
}
</script>
