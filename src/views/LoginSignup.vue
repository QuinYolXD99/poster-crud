<template>
  <v-container
    id="body"
    fluid
  >
    <v-row
      id="content"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="5"
      >
        <center>
          <v-card
            class="mycard mx-10 "
            :disabled="loading"
          >
            <v-toolbar
              color="pink lighten-1"
              height="70"
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

            <v-card-text
              id="card-body"
              class="px-10"
            >
              <v-stepper
                v-model="step"
                vertical
              >
                <v-stepper-header v-if="signup">
                  <v-stepper-step
                    step="1"
                    complete-icon="mdi-check"
                    edit-icon="mdi-pencil"
                    color="pink"
                    :complete="step > 1"
                  >Account</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    step="2"
                    complete-icon="mdi-check"
                    edit-icon="mdi-pencil"
                    color="pink"
                    :complete="step > 2"
                  >About</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    color="pink"
                    complete-icon="mdi-check"
                    edit-icon="mdi-pencil"
                    step="3"
                  >More</v-stepper-step>

                </v-stepper-header>
                <v-stepper-items><br><br>
                  <v-stepper-content step="1">
                    <v-form
                      ref="form1"
                      lazy-validation
                    >
                      <!-- for username and password only -->
                      <v-text-field
                        color="pink"
                        label="Username"
                        :rules="[rules.required]"
                        v-model="credentials.username"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>
                      <!-- password -->
                      <v-text-field
                        id="password"
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
                      <!-- confirm password -->
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
                    </v-form>
                    <!-- btn -->
                    <br>
                    <v-btn
                      :disabled="!step1_completed"
                      color="pink"
                      outlined
                      width="200"
                      @click.native="signup?step = 2:validate"
                    >{{signup?'next':'login'}}</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-form
                      ref="form2"
                      lazy-validation
                    >
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
                        value="+639"
                        :rules="[rules.cont, rules.required]"
                        v-model="credentials.contact"
                        name="contact"
                        v-mask="mask"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>
                    </v-form>
                    <v-btn
                      @click.native="step = 1"
                      color="pink"
                      outlined
                    >Previous</v-btn>
                    <v-btn
                      :disabled="!step2_completed"
                      color="pink"
                      outlined
                      @click.native="step = 3"
                    >next</v-btn>

                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <v-form ref="form3">
                      test
                    </v-form>
                    <v-btn
                      @click.native="step = 2"
                      color="pink"
                      outlined
                    >Previous</v-btn>
                    <v-btn
                      :disabled="!step3_completed"
                      color="pink"
                      outlined
                      @click.native="login"
                    >submit</v-btn>

                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <span
                class="caption"
                v-if="!signup"
              >
                New user ?
                <v-btn
                  color="pink"
                  @click="(signup = true), toggleForm()"
                  small
                  text
                >register here</v-btn>
              </span>
              <span
                class="caption"
                v-else
              >
                Already have an account ?
                <v-btn
                  color="pink"
                  small
                  text
                  @click="(signup = false), toggleForm()"
                  signup="true"
                >Login here</v-btn>
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
.v-stepper__content{
  margin-right: 0!important;
  margin-left: 0!important;
  border: 0;
}
.v-stepper{
  box-shadow: none;
}
</style>
<script>
import Snackbar from "@/components/Snackbar.vue";
import { mask } from "vue-the-mask";
export default {
  data() {
    return {
      step: 1,
      mask: "+639##-###-####",
      signup: false,
      disable: false,
      loading: false,
      confirm_password: "",
      show: false,
      show1: false,
      title: "Login",
      step1_completed: false,
      step2_completed: false,
      step3_completed: false,
      credentials: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        contact: "+639"
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
          this.step = 1
          break;
      }
      this.$refs.snackbar.message(this.title);
    },
    validate() {
      var url = "http://localhost:4000/user/";
      if (this.signup) {
        this.sendRequest(url + "register");
      } else {
        this.sendRequest(url + "login");
      }
    },
    sendRequest(url) {
      this.loading = true;
      if (!this.signup) {
        this.credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }

      }
      this.$axios
        .post(url, this.credentials)
        .then(res => {
          this.loading = false;
          if (res.data.auth) {
            this.$refs.snackbar.message("Welcome " + this.credentials.username);
            localStorage.setItem("token", res.data.token);
            this.$router.push(`/home/${localStorage.getItem("token")}`);
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
  },
  updated() {
    this.step1_completed = this.$refs.form1.validate();
    this.step2_completed = this.$refs.form2.validate();
    this.step3_completed = this.$refs.form3.validate();
  },
};
</script>