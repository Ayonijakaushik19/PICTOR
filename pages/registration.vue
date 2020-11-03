<template>
  <v-app>
    <v-form ref="form" @submit.prevent="registerUser">
      <v-container>
        <v-row>
          <v-col>
            <h1>USER VALIDATION</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="cols_val" :sm="sm_val" :md="md_val" :lg="lg_val">
            <v-text-field
              v-model="username"
              label="Username"
              rounded
              outlined
              :rules="[rules.required, rules.length, rules.username]"
            ></v-text-field>
          </v-col>
          <v-col :cols="cols_val" :sm="sm_val" :md="md_val" :lg="lg_val">
            <v-text-field
              v-model="email"
              :rules="[rules.email, rules.required]"
              label="Email"
              rounded
              outlined
            ></v-text-field>
          </v-col>
          <v-col :cols="cols_val" :sm="sm_val" :md="md_val" :lg="lg_val">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required, rules.length]"
              rounded
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit"> LOGIN </v-btn>
      </v-container>
      <v-btn block :disabled="alreadyLoggedIn" class="mt-6" @click="logoutUser">
        LOGOUT
      </v-btn>
    </v-form>
    <v-footer app>
      <h3 class="red--text">P.S. - Actual API auth will be added later.</h3>
    </v-footer>
    <v-snackbar
      v-model="registrationSuccess"
      top
      transition="slide-y-transition"
      timeout="1000"
      color="green"
    >
      Success!
    </v-snackbar>
    <v-snackbar
      v-model="registrationFailure"
      top
      transition="slide-y-transition"
      timeout="1000"
      color="red"
    >
      Some error occured...
    </v-snackbar>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      cols_val: 12,
      sm_val: 6,
      md_val: 4,
      lg_val: 3,
      username: '',
      email: '',
      password: '',
      registrationSuccess: false,
      registrationFailure: false,
      rules: {
        required: (value) => !!value || 'Required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        },
        length: (value) => {
          if (value !== undefined && value.length >= 6 && value.length <= 20)
            return true
          else return 'Enter between 6 to 20 characters'
        },
        username: (value) => {
          const pattern = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
          return pattern.test(value) || 'Invalid Username'
        },
      },
    }
  },
  computed: {
    vuexUsername() {
      return this.$store.state.username
    },
    alreadyLoggedIn() {
      return !this.$store.state.logged
    },
  },
  methods: {
    logoutUser() {
      try {
        this.$store.commit('logout')
        this.registrationSuccess = true
      } catch (err) {
        console.log(err)
        this.registrationFailure = true
      }
    },
    registerUser() {
      if (this.$refs.form.validate()) {
        // form accepted
        try {
          this.$store.commit(
            'register',
            this.username,
            this.email,
            this.password
          )
          this.$refs.form.reset()
          this.registrationSuccess = true
        } catch (err) {
          console.log(err)
          this.registrationFailure = true
        }
      } else {
        // form denied
        this.registrationFailure = true
      }
    },
  },
}
</script>

<style></style>
