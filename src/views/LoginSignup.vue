<template>
  <v-container id="body" fluid>
    <v-row id="content" align="center" justify="center">
      <v-col cols="11" sm="8" md="4">
        <center>
          <v-card class="mycard mx-10" :disabled="loading">
            <v-toolbar
              color="pink lighten-1"
              height="100"
              class="justify-center"
              dark
              flat
            >
              <v-icon x-large>mdi-camera</v-icon>
              <v-toolbar-title>
                <span class="display-1">PicTalk</span>
                <small>{{ "\t\t\t" + title }}</small>
              </v-toolbar-title>
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="white"
              ></v-progress-linear>
            </v-toolbar>

            <v-card-text id="card-body">
              <v-form ref="form" lazy-validation>
                <!-- usernmae input -->
                <v-text-field
                  color="pink"
                  label="Username"
                  :rules="[rules.required]"
                  v-model="credentials.username"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <!-- firstname input -->
                <v-expand-transition>
                  <div v-if="signup">
                    <v-text-field
                      color="pink"
                      label="Firstname"
                      :rules="[rules.required]"
                      v-model="credentials.firstname"
                      name="firstname"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <!-- lastname input -->
                    <v-text-field
                      color="pink"
                      label="Lastname"
                      :rules="[rules.required]"
                      v-model="credentials.lastname"
                      name="lastname"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <!-- contact input -->
                    <v-text-field
                      color="pink"
                      label="Contact Number"
                      :rules="[rules.cont, rules.required]"
                      v-model="credentials.contact"
                      name="contact"
                      v-mask="mask"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                  </div>
                </v-expand-transition>

                <!-- password field -->
                <v-text-field
                  id="confirm password"
                  color="pink"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="credentials.password"
                  @click:append="show = !show"
                  hint="At least 8 characters"
                  label="Password"
                  name="password"
                  value
                  prepend-icon="mdi-lock"
                  @keyup.enter="validate"
                ></v-text-field>

                <v-expand-transition>
                  <div v-if="signup">
                    <v-text-field
                      id="confirm password"
                      color="pink"
                      :rules="[rules.matchPassword, rules.required]"
                      @click:append="show1 = !show1"
                      :type="show1 ? 'text' : 'password'"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="confirm_password"
                      label="Confirm Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      @keyup.enter="validate"
                    ></v-text-field>
                  </div>
                </v-expand-transition>

                <br />
                <center>
                  <v-btn
                    color="pink"
                    v-if="!signup"
                    outlined
                    width="200"
                    :disabled="disable"
                    rounded
                    @click="validate"
                    >Login</v-btn
                  >
                  <v-btn
                    color="pink"
                    v-else
                    outlined
                    width="200"
                    :disabled="disable"
                    rounded
                    @click="validate"
                    >Sign up</v-btn
                  >
                </center>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <span class="caption" v-if="!signup">
                New user ?
                <v-btn
                  color="pink"
                  @click="(signup = true), toggleForm()"
                  small
                  text
                  >register here</v-btn
                >
              </span>
              <span class="caption" v-else>
                Already have an account ?
                <v-btn
                  color="pink"
                  small
                  text
                  @click="(signup = false), toggleForm()"
                  signup="true"
                  >Login here</v-btn
                >
              </span>
            </v-card-actions>
          </v-card>
        </center>
      </v-col>
      <Snackbar ref="snackbar" />
    </v-row>
  </v-container>
</template>

<style scoped>
#body {
  position: relative;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://source.unsplash.com/user/andyjh07");
  background-size: cover !important  ;
  background-position: top center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  overflow: auto;
}
.mycard {
  opacity: 0.8 !important;
}
#content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
<script>
import Snackbar from "@/components/Snackbar.vue";
import { mask } from "vue-the-mask";

import axios from "axios";
export default {
  data() {
    return {
      mask: "####-###-####",
      signup: false,
      disable: false,
      loading: false,
      confirm_password: "",
      show: false,
      show1: false,
      title: "Login",
      credentials: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        contact: ""
      },
      rules: {
        required: value => !!value || "Required.",
        nameRules: v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        min: v => (!!v && v.length >= 8) || "Min 8 characters",
        cont: () =>
          this.credentials.contact ===
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        matchPassword: () =>
          this.credentials.password === this.confirm_password ||
          "Passwords don't match !"
      }
    };
  },
  directives: {
    mask
  },
  components: {
    Snackbar
  },
  methods: {
    toggleForm() {
      this.$refs.form.reset();
      switch (this.signup) {
        case true:
          this.title = "Sign up";
          break;
        case false:
          this.title = "Login";
          break;
      }
      this.$refs.snackbar.message(this.title);
    },

    validate() {
      if (this.$refs.form.validate()) {
        var url = "http://localhost:4000/crud/";
        if (this.signup) {
          this.sendRequest(url + "register");
        } else {
          this.sendRequest(url + "login");
        }
      }
    },
    sendRequest(url) {
      this.loading = true;
      axios
        .post(url, this.credentials)
        .then(res => {
          this.loading = false;
          if (res.data.auth) {
            this.$refs.snackbar.message("Welcome " + this.credentials.username);
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          } else {
            if (this.signup) {
              this.$refs.snackbar.message("Failed!!");
            } else {
              this.$refs.snackbar.message("Account not found!");
            }
            this.$refs.form.reset();
          }
        })
        .catch(err => {
          console.log(err);
          this.$refs.form.reset();
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.snackbar.message("Something went wrong!");
        });
    }
  }
};
</script>
