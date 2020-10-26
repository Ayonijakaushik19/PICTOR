<template>
  <v-app>
    <v-system-bar app status color="indigo lighten-1" height="20">
      <strong> Status Bar </strong>
      <v-spacer />
      <v-icon>mdi-account</v-icon>
      <v-icon>mdi-cloud-check</v-icon>
      <v-icon>mdi-wifi-strength-4</v-icon>
    </v-system-bar>

    <v-app-bar app color="black">
      <v-btn icon @click="drawer = !drawer">
        <v-icon large>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon large color="primary">Pictor</v-icon>
      <v-spacer></v-spacer>
      <v-avatar size="46" color="grey">
        <img src="../static/v.png" alt="alt" />
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Hi {{ username }}</v-list-item-title>
          <v-list-item-subtitle> Where to go? </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>New Canvas</v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Saved Drawings</v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-container>
        <v-btn v-for="ic in f_ics" :key="ic" icon>
          <v-icon>{{ ic }}</v-icon>
        </v-btn>
      </v-container>

      <v-divider />

      <v-btn
        v-if="!alert_welcome"
        color="black"
        transition="slide-y-reverse-transition"
        @click="alert_welcome = true"
        >Welcome</v-btn
      >
      <v-alert
        v-model="alert_welcome"
        color="primary"
        dismissible
        max-width="600"
        icon="mdi-emoticon-happy"
        transition="slide-y-transition"
      >
        You are welcome!
      </v-alert>

      <v-divider />

      <v-chip class="ma-4"> PICTOR - {{ new Date().getFullYear() }} </v-chip>
    </v-navigation-drawer>

    <v-main class="blue-grey">
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <h1>REGISTRATION</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="cols_val" :sm="sm_val" :md="md_val" :lg="lg_val">
              <v-text-field
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
                label="Password"
                type="password"
                :rules="[rules.required, rules.length]"
                rounded
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <!--
      <v-container>
        <canvas id="canvas" width="200" height="200"></canvas>
      </v-container>
      -->
    </v-main>

    <v-bottom-navigation class="black" app>
      <v-btn color="blue-grey">Control button</v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      alert_welcome: false,
      drawer: false,
      username: 'Nandeesh',
      f_ics: ['mdi-twitter', 'mdi-instagram', 'mdi-facebook', 'mdi-youtube'],
      cols_val: 12,
      sm_val: 6,
      md_val: 4,
      lg_val: 3,
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
