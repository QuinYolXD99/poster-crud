<template >
  <v-container id="body" fluid>
    <v-row id="content" align="center" justify="center">
      <v-col cols="11" sm="8" md="4">
        <center>
          <v-card class="mycard mx-10" :disabled="loading">
            <v-toolbar color="pink lighten-1" height="100" class="justify-center" dark flat>
              <v-icon x-large>mdi-camera</v-icon>
              <v-toolbar-title>
                <span class="display-1">PicTalk</span>
                <small>{{"\t\t\t"+title}}</small>
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
                  :rules="[v => !!v || 'username is required!']"
                  v-model="credentials.username"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <!-- password field -->
                <v-text-field
                  id="confirm password"
                  color="pink"
                  :rules="[v => !!v || 'password is required!']"
                  v-model="credentials.password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  @keyup.enter="login"
                ></v-text-field>

                <v-expand-transition>
                  <div v-if="signup">
                    <v-text-field
                      id="confirm password"
                      color="pink"
                      :rules="matchPassword"
                      v-model="confirm_password"
                      label="Confirm Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      @keyup.enter="login"
                    ></v-text-field>
                  </div>
                </v-expand-transition>

                <br>
                <center>
                  <v-btn
                    color="pink"
                    v-if="!signup"
                    outlined
                    width="200"
                    :disabled="disable"
                    rounded
                    @click="validate"
                  >Login</v-btn>
                  <v-btn
                    color="pink"
                    v-else
                    outlined
                    width="200"
                    :disabled="disable"
                    rounded
                    @click="validate"
                  >Sign up</v-btn>
                </center>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <span class="caption" v-if="!signup">
                New user ?
                <v-btn color="pink" @click="(signup= true , toggleForm())" small text>register here</v-btn>
              </span>
              <span class="caption" v-else>
                Already have an account ?
                <v-btn
                  color="pink"
                  small
                  text
                  @click="(signup= false , toggleForm())"
                  signup="true"
                >Login here</v-btn>
              </span>
            </v-card-actions>
          </v-card>
        </center>
      </v-col>
      <Snackbar ref="snackbar"/>
    </v-row>
  </v-container>
</template>

<style scoped>
#body {
  position: relative;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://source.unsplash.com/user/the_roaming_platypus");
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
export default {
  data() {
    return {
      signup: false,
      disable: false,
      loading: false,
      confirm_password: "",
      title: "Login",
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    Snackbar
  },
  computed: {
    matchPassword() {
      return [
        () =>
          this.credentials.password === this.confirm_password ||
          "Passwords don't match !",
        v => !!v || "Please re-enter your password!"
      ];
    }
  },
  methods: {
    toggleForm() {
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
      if (!this.$refs.form.validate()) {
        console.log(this.$refs.form);

        // this.$refs.snackbar.message(this.title);
      } else {
        console.log(this.signup);
      }
    },
    register() {},
    login() {}
  }
};
</script>

<!--<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      disable: false,
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      var credentials = {
        account: {
          username: this.username,
          password: this.password
        }
      };
      this.loader(true);
      const url = "http://localhost:4000/admin/login";
      axios
        .post(url, credentials)
        .then(res => {
          setTimeout(() => {
            this.loader(false);
          }, 1000);
          if (this.username != "" && this.password != "") {
            if (res.data.auth) {
              this.$emit("notify", "Welcome " + this.username + " !");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("default", res.data.default_pass);
              this.$emit("loggedIn",localStorage.getItem("token"))
              
              this.$router.push("/")
            } else {
              this.password = "";
              this.username = "";
              this.$emit("notify", "Invalid Credentials");
            }
          } else {
            this.$emit("notify", "Fields cannot be empty");
          }
        })
        .catch(err => {
          this.$emit("notify", "Cannot connect to the server!");

          setTimeout(() => {
            this.loader(false);
          }, 1000);
        });
    },
    loader(status) {
      this.loading = status;
      this.disable = status;
    }
  }
};
</script>-->
