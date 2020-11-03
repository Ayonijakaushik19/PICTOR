<template>
  <v-app>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <h1>Saved Drawings</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
}
</script>

<style></style>
