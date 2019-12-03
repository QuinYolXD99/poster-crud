<template>
  <v-stepper
    v-model="step"
    vertical
  >
    <v-stepper-header v-if="!signup">
      <v-stepper-step
        step="1"
        :complete="step > 1"
      >Account</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        step="2"
        :complete="step > 2"
      >About</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">More</v-stepper-step>

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
          <v-expand-transition>
            <div v-if="$route.params.page!='logind'">
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
        <v-btn
          :disabled="!step1_completed"
          color="pink"
          outlined
          rounded
          @click.native="step = 2"
        >next</v-btn>
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
          rounded
        >Previous</v-btn>
        <v-btn
          :disabled="!step2_completed"
          color="pink"
          outlined
          rounded
          @click.native="step = 3"
        >next</v-btn>

      </v-stepper-content>
      <v-stepper-content step="3">
        <v-form ref="form3"></v-form>
        <v-btn
          @click.native="step = 2"
          color="pink"
          outlined
          rounded
        >Previous</v-btn>
        <v-btn
          :disabled="!step3_completed"
          color="pink"
          outlined
          rounded
          @click.native="login"
        >submit</v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  data() {
    return {
      e1: 0,
      step: 1,
      signup: true,
      registration: {
        name: null,
        email: null,
        street: null,
        city: null,
        state: null,
        numtickets: 0,
        shirtsize: 'XL'
      },
      sizes: ['S', 'M', 'L', 'XL'],
      rules: {
        required: v => !!v || 'required!'
      },
      step1_completed: false,
      step2_completed: false,
      step3_completed: false
    }
  },
  updated() {
    this.step1_completed = this.$refs.form1.validate();
    this.step2_completed = this.$refs.form2.validate();
    this.step3_completed = this.$refs.form3.validate();
  },

}
</script>