<template>
  <v-container id="body" fluid>
    <v-row id="content" align="center" justify="center">
      <v-col>
        <center>
          <v-card class="mycard mx-10" :disabled="loading" max-width="450">
            <v-toolbar color="pink lighten-1" height="100" class="justify-center" dark flat>
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

            <v-card-text id="card-body" class="px-10">
              <v-stepper v-model="step" vertical>
                <v-stepper-header>
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
                    v-if="signup"
                    complete-icon="mdi-check"
                    edit-icon="mdi-pencil"
                    color="pink"
                    :complete="step > 2"
                  >About</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    color="pink"
                    v-if="signup"
                    complete-icon="mdi-check"
                    edit-icon="mdi-pencil"
                    step="3"
                  >Add Avatar</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <br />
                  <br />
                  <v-stepper-content step="1">
                    <v-form ref="form1" lazy-validation>
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
                          ></v-text-field>
                        </div>
                      </v-expand-transition>
                    </v-form>
                    <!-- btn -->
                    <br />
                    <v-btn
                      :disabled="!step1_completed"
                      color="pink"
                      outlined
                      v-if="signup"
                      width="200"
                      @click="next"
                    >next</v-btn>
                    <v-btn
                      :disabled="!step1_completed"
                      color="pink"
                      outlined
                      v-else
                      width="200"
                      @click="validate"
                    >login</v-btn>
                  </v-stepper-content>
                  <v-stepper-content v-if="signup" step="2">
                    <v-form ref="form2" lazy-validation>
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
                    </v-form>
                    <br />
                    <v-btn @click.native="prev" width="200" color="pink" outlined>Previous</v-btn>
                    <br />
                    <br />
                    <v-btn
                      :disabled="!step2_completed"
                      color="pink"
                      outlined
                      width="200"
                      @click.native="next"
                    >next</v-btn>
                  </v-stepper-content>
                  <v-stepper-content v-if="signup" step="3">
                    <v-form ref="form3">
                      <input
                        accept="image/*"
                        type="file"
                        @change="handlePreview"
                        ref="myFiles"
                        hidden
                      />
                      <v-avatar v-if="avatar" size="100" @click="$refs.myFiles.click()">
                        <img :src="preview" alt="dp" />
                      </v-avatar>
                      <v-btn
                        id="cam"
                        class="ma-2"
                        outlined
                        large
                        size="80"
                        v-else
                        @click="$refs.myFiles.click()"
                        fab
                        color="pink"
                      >
                        <v-icon x-large>mdi-image</v-icon>
                      </v-btn>
                    </v-form>
                    <br />
                    <v-btn @click="prev" width="200" color="pink" outlined>Previous</v-btn>
                    <br />
                    <br />
                    <v-btn
                      :disabled="!step3_completed"
                      color="pink"
                      outlined
                      width="200"
                      @click="validate"
                    >submit</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <span class="caption" v-if="!signup">
                New user ?
                <v-btn color="pink" @click="(signup = true), toggleForm()" small text>register here</v-btn>
              </span>
              <span class="caption" v-else>
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
.v-stepper--vertical {
  padding: 0;
}
.v-stepper__content {
  padding-right: 23px !important;
  padding-left: 23px !important;
}
#content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.v-stepper__content {
  margin-right: 0 !important;
  margin-left: 0 !important;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  margin-bottom: 10px !important;
}
.v-stepper {
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
      avatar: null,
      preview: "",
      loading: false,
      confirm_password: "",
      show: false,
      show1: false,
      title: this.$route.params.page,
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
    handlePreview() {
      this.avatar = this.$refs.myFiles.files[0];
      this.encode(this.avatar).then(res => {
        this.preview = res;
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
    toggleForm() {
      switch (this.signup) {
        case true:
          this.title = "Sign up";
          this.$router.push(`/user/account/${this.title.replace(" ", "")}`);
          this.step = 1;
          break;
        case false:
          this.title = "Login";
          this.$router.push(`/user/account/${this.title.replace(" ", "")}`);
          this.step = 1;
          break;
      }
      this.$refs.snackbar.message(this.title);
      this.reset();
    },
    next() {
      this.step += 1;
      eval(`this.$refs.form${this.step}.reset()`);
      if (this.step == 2) {
        this.credentials.contact = "+639";
      }
    },
    prev() {
      this.step -= 1;
    },
    reset() {
      setTimeout(() => {
        this.$refs.form1.reset();
        this.signup ? this.$refs.form2.reset() : "";
        this.avatar = null;
        this.preview = null;
      }, 500);
    },
    validate() {
      if (this.signup) {
        this.sendRequest(this.$_CONFIG.userRequestURL + "register");
      } else {
        this.sendRequest(this.$_CONFIG.userRequestURL + "login");
      }
    },
    sendRequest(url) {
      let reqBody = null;
      this.loading = true;
      if (this.signup) {
        let formData = new FormData();
        formData.append("avatar", this.avatar);
        formData.append("credentials", JSON.stringify(this.credentials));
        reqBody = formData;
      } else {
        reqBody = {
          username: this.credentials.username,
          password: this.credentials.password
        };
      }
      this.$axios
        .post(url, reqBody)
        .then(res => {
          this.loading = false;
          if (res.data.auth) {
            this.$refs.snackbar.message("Welcome " + this.credentials.username);
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          } else {
            if (this.signup) {
              if (res.data.exist) {
                this.$refs.snackbar.message("Username already Taken!!");
              }
            } else {
              this.$refs.snackbar.message("Account not found!");
            }
          }
        })
        .catch(err => {
          console.log(err.response);
          this.loading = false;
          this.$refs.snackbar.message("Something went wrong!");
        });
    }
  },
  updated() {
    this.step1_completed = this.$refs.form1.validate();
    this.step2_completed = this.signup ? this.$refs.form2.validate() : false;
    this.step3_completed = this.avatar;
  },
  mounted() {
    this.signup = this.$route.params.page !== "Login";
    this.reset();
  }
};
</script>